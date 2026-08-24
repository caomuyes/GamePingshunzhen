# 《平顺镇》

以现代中国互联网为叙事载体的中式民俗恐怖 ARG 网页解谜游戏。

玩家是一名普通互联网用户，因为一则校园死亡信息开始在网上考古，逐渐还原阿月与熊娘嘎婆的故事，最终经由「源秘社」进入「阴间内部网站」。

## 运行

```bash
pnpm install
pnpm dev
```

浏览器打开 <http://localhost:5173/>。

游戏流程：起始页搜索 → 校园论坛 → 学校官网 → 个人空间（时间线）→ 源秘社（通行码与小游戏）→ 阴间内部网站（编码谜题与终局）→ 普通结局 → 隐藏结局。

## 测试

```bash
pnpm test
```

单元测试覆盖 GameState、存档、PuzzleEngine、跨网站谜题、编码、小游戏事件与结局。

端到端冒烟测试（需要本机 Chrome，可先启动 `pnpm dev`）：

```bash
node scripts/e2e-smoke.cjs
node scripts/layout-check.cjs
```

可通过环境变量覆盖路径：`CHROME_PATH`、`PLAYWRIGHT_CORE_DIR`、`GAME_URL`。截图输出到 `.smoke-shots/`。

开发环境在 `/dev/debug` 提供调试工具（解锁全部、清空存档、模拟结局），生产构建不包含。

## 生产构建

```bash
pnpm build
pnpm preview
```

## 结构

- `apps/portal`：入口应用，聚合五个网站的路由、浏览器外壳与调试工具
- `apps/forum`：校园论坛
- `apps/school`：平顺镇高中官方网站
- `apps/social`：阿月 / 小于个人空间
- `apps/yuanmishe`：源秘社
- `apps/underworld`：阴间内部网站
- `packages/game-state`：统一游戏状态与存档
- `packages/puzzle-engine`：统一谜题引擎
- `packages/shared-data`：全部剧情与数据（帖子、动态、公告、时间线、谜题）
- `packages/shared-ui`：通用 UI（头像、时间戳、分页、访问变化等）
- `packages/effects`：故障 / CRT / 噪点 / 鼠标跟随等效果
- `packages/audio`：统一音效管理

## 文档

世界观、游戏设计与工程规格见 `游戏设定与实现/`（副本位于 `docs/`）。
