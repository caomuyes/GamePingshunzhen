const path = require("path");
const fs = require("fs");
const { chromium } = require(
  process.env.PLAYWRIGHT_CORE_DIR ||
    "C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core"
);

const OUT = path.join(__dirname, "..", ".smoke-shots");
fs.mkdirSync(OUT, { recursive: true });
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE = process.env.GAME_URL || "http://localhost:5173";
const results = [];
function check(name, cond, extra) {
  results.push({ name, pass: !!cond });
  console.log((cond ? "PASS" : "FAIL") + " | " + name + (extra ? " | " + extra : ""));
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push("console: " + m.text());
  });

  const goto = async (url) => {
    await page.goto(BASE + "#" + url, { waitUntil: "networkidle" });
  };
  const shot = async (name) => {
    await page.screenshot({ path: path.join(OUT, name + ".png") });
  };
  const textCount = async (t) => await page.getByText(t, { exact: false }).count();

  await goto("/");
  check("起始页", (await textCount("平顺镇生活网")) > 0);
  await page.getByPlaceholder("访客").fill("冒烟测试");
  await shot("01-start");
  await page.getByRole("button", { name: "搜索" }).click();
  await page.waitForURL(/\/forum\/search/, { timeout: 5000 });
  check("起始页搜索进入论坛", true);
  await page.getByText("关于我校一名学生死亡情况的说明").first().waitFor({ timeout: 5000 });
  check("默认检索词命中死亡说明", (await textCount("关于我校一名学生死亡情况的说明")) > 0);
  await shot("02-forum-search");

  await page.getByText("关于我校一名学生死亡情况的说明").first().click();
  await page.waitForURL(/\/forum\/thread\/post_forum_001/);
  await page.getByText("2023年10月31日，我校一名学生不幸离世", { exact: false }).first().waitFor({ timeout: 5000 });
  check("死亡说明帖子打开", (await textCount("2023年10月31日，我校一名学生不幸离世")) > 0);
  await shot("03-forum-thread");

  await goto("/forum/search?q=" + encodeURIComponent("阿月"));
  check("搜索阿月有结果", (await textCount("有人知道阿月是谁吗？")) > 0);
  await goto("/forum/thread/post_forum_003");
  check("初中异常帖", (await textCount("初中部是不是有个特别奇怪的女生？")) > 0);
  await goto("/forum/thread/post_forum_004");
  check("小于帖", (await textCount("她以前是不是和小于一起？")) > 0);
  await shot("04-forum-thread-xiaoyu");
  await goto("/forum/user/user_xiaoyu");
  check("小于主页（通行码线索）", (await textCount("@yuxiaoyu")) > 0);

  await goto("/school/notice/school_notice_001");
  await page.getByText("关于我校一名学生不幸离世的说明", { exact: false }).first().waitFor({ timeout: 5000 });
  check("官网死亡说明", (await textCount("关于我校一名学生不幸离世的说明")) > 0);
  await shot("05-school-notice");
  await goto("/school/file/school_file_001");
  await page.getByText("重点关注学生名单", { exact: false }).first().waitFor({ timeout: 5000 });
  check("重点关注名单", (await textCount("重点关注学生名单")) > 0);
  await shot("06-school-file");
  await goto("/school/news/school_news_001");
  check("校庆27周年（通行码线索）", (await textCount("建校27周年")) > 0);

  await goto("/social/user/ayue");
  check("阿月空间", (await textCount("月亮不营业")) > 0);
  await shot("07-social-ayue");
  await goto("/social/user/ayue/notes");
  check("笔记含熊娘嘎婆", (await textCount("熊娘嘎婆")) > 0);
  await shot("08-social-notes");
  await goto("/social/user/ayue/timeline");
  check("时间线谜题", (await textCount("阿月的时间线")) > 0);
  await shot("09-social-timeline");

  await goto("/yuanmishe/enter");
  await page.getByPlaceholder("通行码").fill("wrongpass");
  await page.getByRole("button", { name: "验证" }).click();
  await page.getByText("通行码错误", { exact: false }).first().waitFor({ timeout: 5000 });
  check("错误通行码被拒绝", (await textCount("通行码错误")) > 0);
  await page.getByPlaceholder("通行码").fill("yuxiaoyu101727");
  await page.getByRole("button", { name: "验证" }).click();
  await page.getByText("你已持有通行证", { exact: false }).first().waitFor({ timeout: 5000 });
  check("正确通行码通过", (await textCount("你已持有通行证")) > 0);
  await shot("10-yuanmishe-enter");

  await goto("/yuanmishe/board/board_possession");
  check("附身记录可访问", (await textCount("熊娘嘎婆的规矩（整理）")) > 0);
  await shot("11-yuanmishe-possession");
  await goto("/yuanmishe/board/board_death");
  check("死亡记录含阿月", (await textCount("死亡记录：阿月")) > 0);

  await goto("/yuanmishe/game");
  check("小游戏开始面板", (await textCount("骷髅跳跳")) > 0);
  await page.getByRole("button", { name: "开始游戏" }).click();
  await page.waitForTimeout(1200);
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press("Space");
    await page.waitForTimeout(160);
  }
  await shot("12-yuanmishe-game");

  await goto("/dev/debug");
  await page.getByRole("button", { name: "解锁全部" }).click();
  check("调试解锁", (await textCount("已解锁全部线索与谜题")) > 0);
  await shot("13-debug");

  await goto("/underworld");
  check("阴间总览", (await textCount("阴间内部网站")) > 0);
  await shot("14-underworld-home");
  await goto("/underworld/decode");
  check("乱码显示", (await page.locator(".uw-moji").count()) > 0);
  await page.getByRole("button", { name: "自动填入" }).click();
  await page.locator("select").selectOption("utf-8");
  await page.getByRole("button", { name: "解码" }).click();
  check("解码得到诗句", (await textCount("漆炬迎新人，幽圹萤扰扰")) > 0);
  check("身份确认", (await textCount("身份确认")) > 0);
  await shot("15-underworld-decode");

  await goto("/underworld/final");
  await page.locator('input[value="design"]').check();
  await page.locator('input[value="bear_grandma"]').check();
  await page.locator('input[value="leave_route"]').check();
  await page.getByRole("button", { name: "提交答案" }).click();
  await page.waitForURL(/\/underworld\/ending/, { timeout: 5000 });
  await page.getByText("她留下的路线", { exact: false }).first().waitFor({ timeout: 5000 });
  check("普通结局", (await textCount("她留下的路线")) > 0);
  await shot("16-ending");

  await goto("/forum/thread/post_forum_005");
  await page.getByText("如果你看到这里", { exact: false }).first().waitFor({ timeout: 8000 });
  check("隐藏信息出现", true);
  await shot("17-hidden-reveal");
  await page.waitForURL(/\/underworld\/register/, { timeout: 15000 });
  check("进入新人登记", true);
  await page.getByRole("button", { name: "登记" }).click();
  await page.getByText("登记完成", { exact: false }).first().waitFor({ timeout: 5000 });
  check("隐藏结局完成", (await textCount("登记完成")) > 0 && (await textCount("隐藏结局")) > 0);
  await shot("18-hidden-ending");

  const fails = results.filter((r) => !r.pass);
  console.log("\n==== RESULT ====");
  console.log("passed:", results.length - fails.length, "/", results.length);
  if (errors.length) {
    console.log("---- browser errors ----");
    errors.slice(0, 20).forEach((e) => console.log(e));
  }
  if (fails.length) {
    console.log("---- failed ----");
    fails.forEach((f) => console.log(f.name));
  }
  await browser.close();
  process.exit(fails.length ? 1 : 0);
})().catch((e) => {
  console.error("SMOKE ERROR:", e);
  process.exit(2);
});
