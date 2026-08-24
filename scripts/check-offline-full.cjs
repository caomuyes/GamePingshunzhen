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
  const ok = (name, cond) => console.log((cond ? "PASS" : "FAIL") + " | " + name);

  await p.goto(base, { waitUntil: "load" });
  await p.getByRole("button", { name: "搜索" }).click();
  await p.getByText("关于我校一名学生死亡情况的说明", { exact: false }).first().waitFor({ timeout: 8000 });
  await p.getByText("关于我校一名学生死亡情况的说明", { exact: false }).first().click();
  await p.getByText("2023年10月31日，我校一名学生不幸离世", { exact: false }).first().waitFor({ timeout: 8000 });
  await p.goto(base + "#/forum/thread/post_forum_003", { waitUntil: "load" });
  await p.getByText("初中部是不是有个特别奇怪的女生", { exact: false }).first().waitFor({ timeout: 8000 });
  await p.goto(base + "#/forum/thread/post_forum_004", { waitUntil: "load" });
  await p.getByText("她以前是不是和小于一起", { exact: false }).first().waitFor({ timeout: 8000 });
  await p.goto(base + "#/forum/user/user_xiaoyu", { waitUntil: "load" });
  await p.getByText("yuxiaoyu", { exact: false }).first().waitFor({ timeout: 8000 });
  await p.goto(base + "#/school/news/school_news_001", { waitUntil: "load" });
  await p.getByText("建校27周年", { exact: false }).first().waitFor({ timeout: 8000 });
  await p.goto(base + "#/social/user/ayue", { waitUntil: "load" });
  await p.getByText("月亮不营业", { exact: false }).first().waitFor({ timeout: 8000 });
  const clues = await p.evaluate(() => {
    const raw = localStorage.getItem("pingshun-save-v1");
    return raw ? JSON.parse(raw).state.discoveredClues : [];
  });
  ok("三条线索已收集", ["clue_username", "clue_birthday", "clue_school_27"].every((c) => clues.includes(c)));

  // 通行证
  await p.goto(base + "#/yuanmishe/enter", { waitUntil: "load" });
  await p.getByPlaceholder("通行码").waitFor({ timeout: 8000 });
  await p.getByPlaceholder("通行码").fill("wrongpass");
  await p.getByRole("button", { name: "验证" }).click();
  await p.getByText("通行码错误", { exact: false }).first().waitFor({ timeout: 5000 });
  ok("错误通行码被拒绝", true);
  await p.getByPlaceholder("通行码").fill("yuxiaoyu101727");
  await p.getByRole("button", { name: "验证" }).click();
  await p.getByText("你已持有通行证", { exact: false }).first().waitFor({ timeout: 5000 });
  ok("正确通行码通过", true);

  // 小游戏：确认能开始、能跳跃、游戏循环在跑
  await p.goto(base + "#/yuanmishe/game", { waitUntil: "load" });
  await p.getByRole("button", { name: "开始游戏" }).click();
  const hash = () =>
    p.evaluate(() => {
      const c = document.querySelector("canvas.yms-game");
      const ctx = c.getContext("2d");
      const d = ctx.getImageData(0, 0, c.width, c.height).data;
      let h = 0;
      for (let i = 0; i < d.length; i += 4000) h = (h * 31 + d[i] + d[i + 1] + d[i + 2]) | 0;
      return h;
    });
  const h0 = await hash();
  await p.waitForTimeout(1200);
  const h1 = await hash();
  ok("游戏循环在运行（画面随时间变化）", h0 !== h1);
  await p.keyboard.press("Space");
  await p.keyboard.press("Space");
  await p.waitForTimeout(700);
  const h2 = await hash();
  ok("跳跃后画面继续变化", h1 !== h2);
  const scoreText = await p.evaluate(() => {
    const c = document.querySelector("canvas.yms-game");
    return c ? c.toDataURL().length : 0;
  });
  ok("画布持续渲染", scoreText > 1000);

  console.log("errors:", errs.length ? errs.slice(0, 10) : "none");
  await b.close();
})().catch((e) => {
  console.error("OFFLINE FULL ERR", e);
  process.exit(1);
});
