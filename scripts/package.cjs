const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const PORTAL = path.join(ROOT, "apps", "portal");
const DIST = path.join(PORTAL, "dist");
const OUT = path.join(ROOT, "发布", "平顺镇-免安装版");

function runBuild() {
  const viteBin = path.join(PORTAL, "node_modules", "vite", "bin", "vite.js");
  if (!fs.existsSync(viteBin)) {
    console.error("vite not found, run pnpm install first:", viteBin);
    process.exit(1);
  }
  const res = spawnSync(process.execPath, [viteBin, "build"], { cwd: PORTAL, stdio: "inherit" });
  if (res.status !== 0) {
    console.error("build failed with code", res.status);
    process.exit(res.status ?? 1);
  }
}

function rewriteHtml(html) {
  return html
    .replace(/<link rel="modulepreload"[^>]*>/g, "")
    .replace(/<link rel="stylesheet"[^>]*>/g, (m) => m.replace(/\scrossorigin(?:\s*=\s*("[^"]*"|'[^']*'))?/g, ""))
    .replace(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/g, '<script defer src="$1"></script>');
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(from, to);
    } else {
      if (!entry.name.endsWith(".map")) {
        fs.copyFileSync(from, to);
      }
    }
  }
}

runBuild();

const indexHtml = path.join(DIST, "index.html");
const html = fs.readFileSync(indexHtml, "utf8");
const rewritten = rewriteHtml(html);
if (!rewritten.includes("defer src=")) {
  console.error("index.html rewrite did not find the entry script:", html);
  process.exit(1);
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyDir(DIST, OUT);
fs.writeFileSync(path.join(OUT, "index.html"), rewritten, "utf8");

fs.writeFileSync(
  path.join(OUT, "启动游戏.bat"),
  [
    "@echo off",
    'start "" "%~dp0index.html"',
    "exit",
    ""
  ].join("\r\n"),
  "utf8"
);

fs.writeFileSync(
  path.join(OUT, "使用说明.txt"),
  [
    "《平顺镇》免安装版",
    "",
    "玩法：",
    "  1. 双击「启动游戏.bat」，或用浏览器打开「index.html」。",
    "  2. 建议使用 Chrome / Edge 浏览器，体验最佳。",
    "",
    "存档：",
    "  游戏进度保存在浏览器的本地存储中，关闭后重开仍会保留。",
    "  想重新开始：在地址栏输入 #/dev/reset 并回车（见下），或清除该网页的浏览器数据。",
    "",
    "提示：",
    "  本游戏全部内容均为离线运行，不联网、不安装任何软件。",
    "  如页面显示异常，请确认是用浏览器直接打开 index.html，而不是在编辑器中预览。",
    "",
    "祝你好运。不要相信第一条解释。",
    ""
  ].join("\r\n"),
  "utf8"
);

console.log("打包完成：", OUT);
