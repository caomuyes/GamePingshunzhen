const { chromium } = require(
  process.env.PLAYWRIGHT_CORE_DIR ||
    "C:/Users/Administrator/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright-core"
);

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe"
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const BASE = process.env.GAME_URL || "http://localhost:5173";
  const pages = [
    ["/forum", "forum-header"],
    ["/school", "school-nav"],
    ["/social/user/ayue", "social-window"],
    ["/yuanmishe", "yms-window"],
    ["/underworld", "uw-gate"]
  ];
  for (const [url, cls] of pages) {
    await page.goto(BASE + "#" + url, { waitUntil: "networkidle" });
    const metrics = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const cs = el ? getComputedStyle(el) : null;
      return {
        overflowX: document.documentElement.scrollWidth > window.innerWidth + 1,
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        bg: cs ? cs.backgroundColor : null,
        border: cs ? cs.borderTopWidth + " " + cs.borderTopStyle : null,
        visible: el ? el.getBoundingClientRect().height > 0 : false
      };
    }, "." + cls);
    console.log(url, JSON.stringify(metrics));
  }

  await page.goto(BASE + "#/yuanmishe/game", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "开始游戏" }).click();
  await page.waitForTimeout(2000);
  const canvas = await page.evaluate(() => {
    const c = document.querySelector("canvas.yms-game");
    if (!c) return { ok: false };
    const ctx = c.getContext("2d");
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    let nonBlack = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 10 || data[i + 1] > 10 || data[i + 2] > 10) nonBlack++;
    }
    return { ok: true, nonBlackPixels: nonBlack, total: data.length / 4 };
  });
  console.log("minigame canvas:", JSON.stringify(canvas));

  await page.goto(BASE + "#/forum", { waitUntil: "networkidle" });
  const bar = await page.evaluate(() => {
    const el = document.querySelector(".browser-bar");
    return { hasBar: !!el, barHeight: el ? el.getBoundingClientRect().height : 0 };
  });
  console.log("browser bar:", JSON.stringify(bar));
  await page.getByRole("button", { name: "/> 源码" }).click();
  console.log("source modal visible:", await page.locator(".source-modal pre").isVisible());

  await browser.close();
})().catch((e) => {
  console.error("ERR", e);
  process.exit(1);
});
