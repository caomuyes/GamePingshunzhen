const { chromium } = require(
  process.env.PLAYWRIGHT_CORE_DIR ||
    "C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core"
);

(async () => {
  const b = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe"
  });
  const p = await b.newPage({ viewport: { width: 1360, height: 900 } });
  const errs = [];
  p.on("pageerror", (e) => errs.push("pageerror: " + e.message));
  p.on("console", (m) => {
    if (m.type() === "error") errs.push("console: " + m.text());
  });

  const base = "file:///E:/workspaceE/GamePinghunzhen/发布/%E5%B9%B3%E9%A1%BA%E9%95%87-%E5%85%8D%E5%AE%89%E8%A3%85%E7%89%88/index.html";

  await p.goto(base, { waitUntil: "load" });
  await p.getByText("平顺镇生活网", { exact: false }).first().waitFor({ timeout: 8000 });
  console.log("offline start page: OK");

  await p.getByPlaceholder("访客").fill("离线测试");
  await p.getByRole("button", { name: "搜索" }).click();
  await p.getByText("关于我校一名学生死亡情况的说明", { exact: false }).first().waitFor({ timeout: 8000 });
  console.log("offline search: OK, url =", p.url().slice(0, 80));

  await p.getByText("关于我校一名学生死亡情况的说明", { exact: false }).first().click();
  await p.getByText("2023年10月31日，我校一名学生不幸离世", { exact: false }).first().waitFor({ timeout: 8000 });
  console.log("offline thread: OK");

  await p.goto(base + "#/social/user/ayue", { waitUntil: "load" });
  await p.getByText("月亮不营业", { exact: false }).first().waitFor({ timeout: 8000 });
  console.log("offline social: OK");

  await p.goto(base + "#/yuanmishe/game", { waitUntil: "load" });
  await p.getByText("骷髅跳跳", { exact: false }).first().waitFor({ timeout: 8000 });
  console.log("offline minigame: OK");

  const storage = await p.evaluate(() => {
    try {
      localStorage.setItem("offline-test", "1");
      return localStorage.getItem("offline-test") === "1";
    } catch (e) {
      return "ERR " + e.message;
    }
  });
  console.log("offline localStorage:", storage);

  console.log("errors:", errs.length ? errs.slice(0, 10) : "none");
  await b.close();
})().catch((e) => {
  console.error("OFFLINE ERR", e);
  process.exit(1);
});
