# 《平顺镇》网页ARG游戏
# ENGINEERING_SPEC
# Codex工程实现规格书

版本：v1.0

---

# 1. 工程目标

目标：

实现一个由五个高度拟真的互联网网站组成的网页ARG恐怖解谜游戏。

核心要求：

1. 五个网站具有独立视觉身份。
2. 五个网站共享统一游戏状态。
3. 玩家可以自由浏览。
4. 主线不会因为自由探索而断裂。
5. 谜题可以跨网站。
6. 游戏进度可以保存。
7. 所有剧情内容尽量数据驱动。
8. 后续可以增加网页、帖子、谜题和结局，而不需要重写核心代码。

---

# 2. 技术栈

推荐：

React

TypeScript

Vite

React Router

Zustand

Tailwind CSS

Framer Motion

Howler.js

必要时使用 Canvas。

如果某个视觉效果必须使用WebGL，再单独引入对应方案。

不要为了视觉效果引入大型3D引擎。

---

# 3. Monorepo

推荐目录：

```text
horror-arg/
│
├── apps/
│   ├── forum/
│   ├── school/
│   ├── social/
│   ├── yuanmishe/
│   └── underworld/
│
├── packages/
│   ├── game-state/
│   ├── puzzle-engine/
│   ├── shared-data/
│   ├── shared-ui/
│   ├── audio/
│   └── effects/
│
├── public/
│   ├── images/
│   ├── audio/
│   ├── fonts/
│   └── textures/
│
├── docs/
│   ├── WORLD_SETTING.md
│   ├── GAME_DESIGN.md
│   └── ENGINEERING_SPEC.md
│
└── package.json
```

---

# 4. 不建议五个完全独立仓库

五个网站虽然视觉完全不同，但必须共享：

GameState

PuzzleEngine

剧情数据

玩家存档

用户身份

解锁状态

否则后期维护会非常困难。

---

# 5. GameState

建立统一状态：

```ts
interface GameState {
  discoveredAyue: boolean;
  discoveredXiaoyu: boolean;

  foundDeathNotice: boolean;
  foundForumEvidence: boolean;
  foundSchoolEvidence: boolean;

  reconstructedTimeline: boolean;

  discoveredBearGrandma: boolean;

  enteredYuanmiShe: boolean;

  skeletonGameStarted: boolean;
  skeletonGameWon: boolean;

  ladderObtained: boolean;

  enteredUnderworld: boolean;
  decodedUnderworld: boolean;

  discoveredAyuePlan: boolean;

  finalPuzzleSolved: boolean;

  endingUnlocked: "none" | "normal" | "hidden";
}
```

---

# 6. 不要直接把所有逻辑写在组件里

错误：

```tsx
if (localStorage.getItem("xxx")) {
  ...
}
```

正确：

```text
UI
↓
GameState
↓
PuzzleEngine
↓
StoryData
```

页面组件只负责显示。

剧情状态由GameState负责。

谜题由PuzzleEngine负责。

内容由StoryData负责。

---

# 7. StoryData

所有帖子、动态、公告、聊天记录都应该数据化。

例如：

```ts
interface ForumPost {
  id: string;
  board: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;

  deleted?: boolean;
  pinned?: boolean;

  clues?: string[];
  unlocks?: string[];
}
```

这样Codex以后可以直接增加：

```text
post_001
post_002
post_003
```

而不需要修改页面代码。

---

# 8. SocialData

```ts
interface SocialPost {
  id: string;
  author: "ayue" | "xiaoyu";
  timestamp: string;
  content: string;

  images?: string[];
  comments?: Comment[];

  clues?: string[];
  unlocks?: string[];
}
```

---

# 9. WebsiteData

每个网站都应该拥有：

```text
网站名称

域名

主题

页面

用户

文章

帖子

搜索结果

隐藏页面

404页面

```

---

# 10. PuzzleEngine

建立统一谜题接口：

```ts
interface Puzzle {
  id: string;

  type:
    | "password"
    | "encoding"
    | "timeline"
    | "source"
    | "url"
    | "cross-site"
    | "minigame"
    | "logic";

  requirements: string[];

  solution: string | string[];

  rewards: string[];

  hints?: string[];
}
```

---

# 11. PuzzleEngine职责

负责：

检查前置条件。

验证玩家答案。

修改GameState。

解锁内容。

记录完成状态。

提供提示。

---

# 12. 存档系统

第一版本使用：

localStorage。

保存：

GameState。

已完成谜题。

玩家访问记录。

发现的线索。

最终结局。

以后如果需要服务器，可以把：

```text
GameState
```

替换为后端数据库。

前端逻辑不要因此重写。

---

# 13. 访问历史

为了增强真实网站感，可以记录：

```ts
interface VisitRecord {
  url: string;
  timestamp: number;
}
```

这样可以实现：

玩家第一次访问页面：

正常。

第二次访问：

出现细微变化。

第三次访问：

出现异常。

---

# 14. 五个App

## forum

负责：

校园论坛。

## school

负责：

学校官方网站。

## social

负责：

阿月、小于个人空间。

## yuanmishe

负责：

源秘社。

## underworld

负责：

阴间内部网站。

---

# 15. Forum App

组件：

```text
ForumLayout
ForumHeader
ForumSidebar
BoardList
PostList
PostCard
PostDetail
CommentList
UserProfile
SearchPage
DeletedPost
Pagination
```

---

# 16. School App

组件：

```text
SchoolHeader
SchoolNav
NewsList
NewsDetail
Announcement
TeacherList
SchoolProfile
DownloadList
ArchivePage
```

必须做得非常正常。

不要使用恐怖UI。

---

# 17. Social App

组件：

```text
ProfileHeader
PostCard
Timeline
Comment
ImageViewer
ChatScreenshot
Search
Archive
```

整体：

Y2K + 中国早期社交网站。

---

# 18. Yuanmishe App

组件：

```text
RetroWindow
ForumBoard
Terminal
UserProfile
PostDetail
GlitchText
SkeletonGame
BettingDialog
AccessKeyPanel
```

这里开始出现明显异常。

---

# 19. Underworld App

组件：

```text
UnderworldShell
Terminal
CorruptedText
GhostPost
DeathRecord
SoulProfile
SystemLog
GlitchLayer
CursorFollower
NoiseOverlay
CRTOverlay
```

视觉效果集中在这里。

---

# 20. 跨网站路由

每个网站可以拥有自己的URL。

例如：

```text
forum.xxx/
school.xxx/
social.xxx/
yuanmishe.xxx/
underworld.xxx/
```

如果部署环境不支持多个真实域名，则使用：

```text
/game/forum
/game/school
/game/social
/game/yuanmishe
/game/underworld
```

但从玩家体验来看，最好最终使用不同子域名。

---

# 21. 跨网站谜题

例如：

论坛得到：

```text
用户名：xxx
```

个人空间得到：

```text
日期：10月17日
```

官网得到：

```text
校庆编号：27
```

组合：

```text
xxx101727
```

获得源秘社账号。

代码层面：

```ts
requiredClues: [
  "forum_user_xxx",
  "ayue_birthday",
  "school_event_27"
]
```

---

# 22. 不要把密码直接写在页面代码里

错误：

```ts
if (answer === "101727") {
 ...
}
```

应该：

```ts
puzzles["puzzle_017"].solution
```

这样方便以后修改谜题。

---

# 23. 编码谜题

建立：

```text
encoding/
├── gbk.ts
├── utf8.ts
├── base64.ts
├── hex.ts
├── url.ts
└── binary.ts
```

注意：

GBK解码应该由程序生成和验证。

不要依赖玩家浏览器碰巧使用某种编码。

---

# 24. 阴间网站乱码实现

原始内容保存为正常Unicode文本。

前端显示层进行：

```text
真实文本
↓
指定编码
↓
错误解码
↓
乱码
```

玩家破解后：

```text
乱码
↓
GBK/GB2312尝试
↓
原始中文
```

这样谜题才是真实的。

---

# 25. 小游戏

不要复制Chrome Dino源代码。

自己实现类似玩法。

组件：

```text
SkeletonPlayer
Obstacle
Ground
GameLoop
Score
CollisionSystem
Background
GameState
```

核心机制：

```text
jump
collision
score
speed
difficulty
```

达到特定分数触发剧情事件。

---

# 26. 小游戏事件

例如：

```ts
if (score >= 666) {
  triggerEvent("ghost_appears");
}

if (score >= 1314) {
  triggerEvent("ayue_shadow");
}

if (score >= 2000) {
  triggerEvent("betting_available");
}
```

具体数字以后由剧情测试确定。

不要在第一版写死。

---

# 27. 音频系统

建立：

```text
audio/
├── ambient
├── ui
├── glitch
├── footsteps
├── whispers
└── minigame
```

统一管理。

例如：

```ts
playSound("ui.click");
playSound("glitch.decode");
playSound("underworld.enter");
```

不要在组件里直接操作Audio对象。

---

# 28. 恐怖效果系统

建立：

```text
effects/
├── Glitch
├── CRT
├── Noise
├── Scanline
├── Distortion
├── CursorTrail
├── Flicker
└── TextCorruption
```

这些效果应该可独立启用。

例如：

```tsx
<Glitch intensity={0.5}>
  <Page />
</Glitch>
```

---

# 29. 鼠标跟随

只在源秘社和阴间网站使用。

不要在普通校园网站使用。

原因：

如果五个网站都疯狂特效，就失去“正常互联网 → 异常互联网”的递进关系。

---

# 30. 视觉递进

网站1：

正常。

网站2：

正常。

网站3：

轻微复古。

网站4：

明显异常。

网站5：

完全非现实。

这是整个视觉设计的核心。

---

# 31. 响应式

优先：

桌面端。

最低支持：

1280×720。

同时兼容：

1920×1080。

移动端不是第一阶段重点。

因为ARG大量信息依赖：

- 多窗口；
- 论坛；
- 图片；
- 时间线；
- 网页源码；
- 多页面切换。

---

# 32. 页面性能

特别注意：

阴间网站效果不能影响普通页面性能。

所有：

Canvas。

粒子。

鼠标跟随。

故障效果。

都应该：

```text
requestAnimationFrame
```

并在页面离开时销毁。

---

# 33. 页面生命周期

所有动画组件必须：

mount：

创建监听器。

update：

更新。

unmount：

清理。

禁止留下：

mousemove。

scroll。

resize。

requestAnimationFrame。

setInterval。

setTimeout。

等泄漏。

---

# 34. 内容和代码完全分离

推荐：

```text
data/
├── forum/
├── school/
├── social/
├── yuanmishe/
├── underworld/
├── characters/
├── timeline/
└── puzzles/
```

剧情作者修改：

data。

程序员修改：

components。

这样后续可以让AI批量生成网页内容，而不会破坏代码。

---

# 35. 时间线数据

建立：

```ts
interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;

  evidence: string[];
}
```

例如：

```text
timeline_001
初中第一次异常

timeline_002
认识小于

timeline_003
熊娘嘎婆影响加深

timeline_004
开始调查

timeline_005
关系逐渐疏远

timeline_006
死亡计划

timeline_007
死亡
```

---

# 36. Evidence系统

玩家看到任何线索都应该进入：

```ts
discoveredClues: string[]
```

例如：

```text
clue_001 = 阿月死亡
clue_002 = 小于是朋友
clue_003 = 初中异常
clue_004 = 熊娘嘎婆
clue_005 = 阿月主动调查
clue_006 = 阿月留下方法
```

---

# 37. Evidence不是简单的“收集卡片”

不要在UI中强迫玩家看到：

> 获得线索：熊娘嘎婆。

玩家应该自己发现。

后台只记录：

> 玩家已经看过相关证据。

---

# 38. Hint系统

第一版本必须有。

但提示分三级：

Level 1：

轻微提示。

Level 2：

明确提示。

Level 3：

接近答案。

不能直接弹答案。

---

# 39. 防止玩家卡死

所有主线谜题必须：

有至少两个独立线索。

如果玩家漏掉一个线索：

仍然可以通过另一个线索继续。

禁止：

“只有一个帖子里有密码，帖子没看到就永远卡住。”

---

# 40. 404系统

404不是普通的：

> Page Not Found

可以根据网站不同设计。

论坛：

> “该帖子不存在。”

学校：

> “您访问的页面不存在。”

源秘社：

> “该地址不属于阳间。”

阴间：

> “此亡者不存在。”

最后一个可以作为隐藏线索。

---

# 41. URL设计

页面URL应该尽可能真实。

例如：

```text
/forum/thread/18392

/school/news/20210817/2391

/social/user/ayue/post/184

/yuanmishe/thread/666

/underworld/soul/xxxxx
```

不要全部：

```text
/page1
/page2
/page3
```

---

# 42. 搜索系统

每个网站尽可能实现自己的搜索。

论坛搜索：

帖子。

用户。

关键词。

学校：

新闻。

公告。

文件。

个人空间：

用户名。

动态。

源秘社：

帖子。

用户。

标签。

阴间：

灵魂记录。

---

# 43. 搜索不是万能的

搜索结果应该有：

关键词命中。

时间限制。

删除页面。

权限限制。

甚至错误结果。

这样才能模拟真实网站。

---

# 44. 伪数据库

第一阶段可以全部使用静态JSON。

不需要后端。

例如：

```text
posts.json
users.json
timeline.json
puzzles.json
```

以后如果需要真实玩家互动，再升级后端。

---

# 45. 第一阶段工程目标

Codex第一阶段只完成：

项目初始化。

Monorepo。

五个App。

共享GameState。

共享路由。

数据结构。

基础布局。

localStorage存档。

---

# 46. 第二阶段

完成校园论坛。

要求：

可以搜索。

可以浏览帖子。

可以进入用户主页。

可以查看评论。

可以模拟删除内容。

可以触发第一个主线线索。

---

# 47. 第三阶段

完成学校官网。

要求：

新闻。

公告。

档案。

搜索。

旧页面。

与论坛交叉线索。

---

# 48. 第四阶段

完成个人空间。

要求：

时间线。

阿月。

小于。

聊天截图。

图片。

动态。

时间排序。

主线线索。

---

# 49. 第五阶段

完成源秘社。

要求：

古早网页。

论坛。

用户。

帖子。

异常内容。

小鬼NPC。

小游戏入口。

---

# 50. 第六阶段

完成小游戏。

要求：

可玩。

碰撞。

计分。

难度变化。

事件触发。

赢得梯子。

---

# 51. 第七阶段

完成阴间网站。

要求：

乱码。

GBK解码。

终端。

动态背景。

故障效果。

鼠标效果。

鬼怪帖子。

阿月相关内容。

---

# 52. 第八阶段

完成跨网站谜题。

必须测试：

玩家按照主线是否可以顺利完成。

玩家随机浏览是否会提前看到结局。

玩家漏掉一个线索是否还能继续。

刷新页面是否保持状态。

关闭浏览器重新打开是否保持状态。

---

# 53. 第九阶段

加入：

音效。

视觉故障。

CRT。

鼠标跟随。

环境音。

异常页面。

隐藏彩蛋。

---

# 54. 第十阶段

加入：

普通结局。

隐藏结局。

结局条件。

重新游戏。

存档清除。

隐藏信息。

---

# 55. Codex开发原则

Codex必须遵守：

第一：

不要自行修改世界观。

第二：

不要自行增加湘西民俗。

第三：

不要擅自修改阿月死亡方式。

第四：

不要把熊娘嘎婆改成普通Boss。

第五：

不要让小于死亡。

第六：

不要明确解释阴间到底是否真实。

第七：

不要把剧情写成传统视觉小说。

第八：

不要让五个网站变成五个游戏UI。

第九：

优先保证网站真实感。

第十：

先完成功能，再增加视觉特效。

---

# 56. Codex执行方式

以后真正开始开发时，不要给Codex一句：

> “帮我把这个游戏做出来。”

应该按阶段给任务。

例如：

第一阶段：

> 阅读WORLD_SETTING.md、GAME_DESIGN.md和ENGINEERING_SPEC.md，只实现Monorepo和GameState，不制作具体剧情页面。

第二阶段：

> 只实现forum App，不修改其他App。

第三阶段：

> 实现school App并加入forum → school的线索关系。

以此类推。

---

# 57. Codex每次修改前必须检查

```text
当前GameState是否兼容？

是否破坏已有谜题？

是否改变URL？

是否改变已有数据ID？

是否破坏存档？

是否增加未经设计的新剧情？

是否加入新的民俗？

是否改变角色关系？
```

---

# 58. ID规则

所有内容必须有稳定ID。

例如：

```text
char_ayue

char_xiaoyu

entity_bear_grandma

post_forum_001

post_social_ayue_001

post_social_xiaoyu_001

school_news_001

yuanmishe_post_001

underworld_record_001

puzzle_001
```

不要使用数组index作为剧情ID。

---

# 59. 调试工具

开发环境增加：

```text
/dev/debug
```

可以查看：

GameState。

已解锁线索。

已完成谜题。

当前结局。

访问记录。

可以：

解锁全部。

清空存档。

跳转网站。

完成谜题。

模拟结局。

正式生产环境必须关闭。

---

# 60. 测试要求

至少建立：

GameState测试。

PuzzleEngine测试。

路由测试。

存档测试。

跨网站谜题测试。

小游戏测试。

最终结局测试。

---

# 61. 最重要的测试场景

场景一：

新玩家正常通关。

场景二：

玩家跳过大量内容。

场景三：

玩家刷新页面。

场景四：

玩家关闭浏览器重新打开。

场景五：

玩家直接访问第五网站。

场景六：

玩家输入错误密码。

场景七：

玩家重复访问已经完成的谜题。

场景八：

玩家清除部分浏览器数据。

---

# 62. 直接访问深层网站

如果玩家直接访问：

```text
/underworld
```

不能简单显示：

> Access Denied

可以显示一个有限版本。

例如：

乱码页面。

错误页面。

无权限终端。

但不能看到核心剧情。

当：

```ts
ladderObtained === true
```

才解锁完整内容。

---

# 63. 视觉性能原则

普通网站：

不使用WebGL。

源秘社：

少量Canvas。

阴间网站：

允许Canvas/WebGL。

动画必须有：

低性能模式。

关闭动态效果。

---

# 64. 无障碍和可读性

即使是恐怖网站：

正文必须可读。

乱码只是剧情机制。

不能让所有内容永久模糊。

故障效果不能遮住核心谜题。

---

# 65. 安全原则

所有所谓：

“黑客”。

“VPN”。

“进入阴间”。

都只是游戏内模拟。

不得要求玩家：

执行真实危险命令。

安装未知软件。

运行系统脚本。

下载可执行文件。

修改系统文件。

关闭杀毒软件。

---

# 66. 最终工程关系

```text
                   ┌──────────────┐
                   │  Game State  │
                   └──────┬───────┘
                          │
             ┌────────────┼────────────┐
             │            │            │
       Story Data    Puzzle Engine   Save System
             │            │            │
       ┌─────┴─────┐      │      ┌─────┴─────┐
       │           │      │      │           │
     Forum       School  Social  Yuanmishe  Underworld
       │           │      │        │           │
       └───────────┴──────┴────────┴───────────┘
                          │
                     Final Ending
```

---

# 67. 最终开发目标

最终玩家应该感觉：

> 自己不是在玩五个网页。

而是：

> 自己真的在互联网里发现了一个故事。

玩家打开论坛时：

相信它是真的。

打开学校官网时：

觉得它就是普通学校官网。

打开个人空间时：

觉得自己正在翻一个陌生人的旧账号。

进入源秘社时：

开始怀疑互联网之外是不是还有东西。

进入阴间网站时：

开始怀疑自己究竟还在不在原来的世界。

直到最后：

玩家无法确定：

> 是自己发现了阿月，

还是：

> 阿月早就知道玩家会找到她。