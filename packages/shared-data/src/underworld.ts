import type { UnderworldRecord } from "./types";

export const underworldRecords: UnderworldRecord[] = [
  {
    id: "underworld_sys_001",
    kind: "system_log",
    section: "系统日志",
    title: "启动日志",
    timestamp: "2023-11-03 00:00:01",
    content:
      "> 幽冥通讯系统 v9.31 启动\n> 校验访问者身份……\n> 身份：持梯者\n> 欢迎回来。这里与现实无关。\n> 如果你觉得有关，请关闭浏览器。",
    terminal: true
  },
  {
    id: "underworld_notice_001",
    kind: "notice",
    section: "管理公告",
    title: "新人接待须知",
    timestamp: "2023-01-01 00:00",
    content: "来了就别回头。\n登记姓名后，不得随意变更。\n未登记访客，请在三日之内离开。",
    author: "管理员"
  },
  {
    id: "underworld_notice_002",
    kind: "notice",
    section: "管理公告",
    title: "禁止讨论熊娘嘎婆",
    timestamp: "2023-11-01 03:03",
    content: "涉及“熊娘嘎婆”的帖子已全部清理。\n违者注销。\n没有为什么。",
    author: "管理员",
    clues: ["clue_censorship"],
    extras: ["clue_004"]
  },
  {
    id: "underworld_ghost_001",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "那个女孩又来了",
    author: "无名",
    timestamp: "2023-11-02 02:11",
    content: "她每周都来，站在门口，不进来。\n我问她找谁。她说找路。",
    clues: ["clue_ayue_afterlife"]
  },
  {
    id: "underworld_ghost_002",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "她今天问我借名字",
    author: "无名",
    timestamp: "2023-11-02 02:31",
    content: "我说不借。她说好，那我自己留了一个。\n她走了。门口多了一张纸。",
    clues: ["clue_ayue_afterlife"]
  },
  {
    id: "underworld_ghost_003",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "那个女孩把自己的名字留在门外了",
    author: "离魂",
    timestamp: "2023-10-31 05:00",
    content: "她把名字写在纸上，压在门槛下面。\n我捡起来看了一眼，又放回去了。\n那是她的。我不能拿。",
    clues: ["clue_self_registered"]
  },
  {
    id: "underworld_death_001",
    kind: "death_record",
    section: "死亡记录",
    title: "死亡记录：阿月",
    author: "归人",
    timestamp: "2023-10-31 04:17",
    content:
      "姓名：阿月\n登记日期：2023-10-31\n死因登记：自缚。自愿。\n\n备注：反制中。她把自己和熊娘嘎婆绑在一起，暂时拖住了它。\n\n补充：她的资料已经有人接手。路线正在被走完。",
    clues: ["clue_plan", "clue_plan_leave"],
    flags: ["discoveredAyuePlan"]
  },
  {
    id: "underworld_death_002",
    kind: "death_record",
    section: "死亡记录",
    title: "死亡记录格式说明",
    author: "归人",
    timestamp: "2012-08-08 00:00",
    content:
      "登记时请写明：姓名、日期、死因。\n死因一栏只有两种写法：善亡、凶亡。\n阿月那种写法，是第三种。\n第三种不常见。",
    clues: ["clue_shanxiong"]
  },
  {
    id: "underworld_sys_002",
    kind: "system_log",
    section: "系统日志",
    title: "访客轨迹",
    timestamp: "2023-11-03 00:07:33",
    content:
      "> 检测到未登记访客\n> 访客轨迹：论坛 → 官网 → 个人空间 → 源秘社 → 此处\n> 与目标档案的历史轨迹高度相似\n> 建议：继续。\n> 她留下的资料在引导你。",
    terminal: true,
    clues: ["clue_guided"]
  },
  {
    id: "underworld_sys_003",
    kind: "system_log",
    section: "系统日志",
    title: "档案访问记录",
    timestamp: "2023-10-31 04:18:02",
    content:
      "> 档案：AYUE-2023-1031 已被读取\n> 读取者：本人\n> 操作：上传全部记录\n> 操作：生成密钥 ×1\n> 操作：密钥去向——留给了下一个来访者",
    terminal: true,
    clues: ["clue_plan"]
  },
  {
    id: "underworld_ghost_004",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "熊娘嘎婆最近很安静。它在等什么？",
    author: "无名",
    timestamp: "2023-11-01 04:44",
    content: "安静的熊娘嘎婆最危险。\n它在等那个女孩的路线被走完。\n等路线断掉，它就能动了。",
    clues: ["clue_stakes"]
  },
  {
    id: "underworld_ghost_005",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "听说有人把笔记留下了",
    author: "离魂",
    timestamp: "2023-11-02 03:19",
    content: "笔记、照片、聊天记录、帖子。她把能找到的证据都留下了。\n有人正在把它们拼起来。",
    clues: ["clue_evidence"]
  },
  {
    id: "underworld_ghost_006",
    kind: "blog",
    section: "鬼怪博客",
    title: "巡查日志",
    author: "巡山人",
    timestamp: "2023-10-31 23:59",
    content: "今日巡查：山林无事。井水无事。门口无事。\n门口有事。",
    clues: ["clue_door"]
  },
  {
    id: "underworld_ritual_001",
    kind: "ritual",
    section: "祭祀记录",
    title: "祭祀记录：盐与火",
    author: "白碗",
    timestamp: "2023-10-15 16:00",
    content: "祭品：米、盐、一盏灯。\n对象：无。\n目的：告诉山里的东西，这户有人。别来。",
    clues: ["clue_salt", "clue_fire"]
  },
  {
    id: "underworld_ritual_002",
    kind: "ritual",
    section: "祭祀记录",
    title: "山路口有人放了米和盐",
    author: "巡山人",
    timestamp: "2023-10-30 12:00",
    content: "不是我们放的。\n米很新，盐很白。像是活人放的。\n活人在山路尽头放米和盐，通常是给走丢的人指路。",
    clues: ["clue_ayue_prep"]
  },
  {
    id: "underworld_trade_001",
    kind: "trade",
    section: "交易记录",
    title: "交易记录：梯子",
    author: "老客",
    timestamp: "2023-10-28 21:00",
    content: "梯子交易：1 把。\n买方：匿名。\n备注：转赠。\n受赠人：未登记访客。",
    clues: ["clue_ladder_gift"]
  },
  {
    id: "underworld_trade_002",
    kind: "trade",
    section: "交易记录",
    title: "交易记录：铜镜",
    author: "老客",
    timestamp: "2023-11-02 10:00",
    content: "铜镜交易取消。\n卖方失踪。\n原因不明。",
    clues: ["clue_mirror_gone"]
  },
  {
    id: "underworld_chat_001",
    kind: "chat",
    section: "聊天记录",
    title: "聊天记录：阿月 × 管理员",
    timestamp: "2023-10-28 22:47",
    content:
      "阿月：我把资料放好了。\n管理员：它们会追着你。\n阿月：所以我把路线留给了下一个人。\n管理员：你确定会有人来？\n阿月：会。总会有人好奇。\n管理员：好奇会害死人。\n阿月：好奇也能救人。",
    clues: ["clue_plan", "clue_plan_leave"],
    flags: ["discoveredAyuePlan"]
  },
  {
    id: "underworld_code_001",
    kind: "code",
    section: "乱码档案",
    title: "乱码档案 001",
    timestamp: "2023-11-01 00:00",
    content:
      "这份档案的编码似乎出了问题。它显示为乱码。\n档案标注：第一层确认。",
    garbled: true
  },
  {
    id: "underworld_code_002",
    kind: "code",
    section: "乱码档案",
    title: "乱码档案 002（提示）",
    timestamp: "2023-11-01 00:01",
    content:
      "档案原始编码：UTF-8。\n站点曾按 GBK 误读。\n请把乱码还原为字节，再以正确编码解码。\n（查看网页源码可找到字节序列）",
    clues: ["clue_decode_hint"]
  },
  {
    id: "underworld_ghost_007",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "新人登记处今天来了一个活人",
    author: "无名",
    timestamp: "2023-11-03 04:20",
    content: "我看不清他的脸。登记处说他留下了名字。\n活人留名字，是很重的事情。",
    extras: ["clue_player_noticed"]
  },
  {
    id: "underworld_sys_004",
    kind: "system_log",
    section: "系统日志",
    title: "提示",
    timestamp: "2023-11-03 00:09:12",
    content: "> 答案不在别处。\n> 在你已经看过的东西里。\n> 论坛、官网、空间、源秘社、这里。\n> 拼起来。",
    terminal: true,
    clues: ["clue_final_hint"]
  },
  {
    id: "underworld_ghost_008",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "阿月留下的东西不止一份",
    author: "离魂",
    timestamp: "2023-11-02 06:06",
    content: "笔记一份，帖子若干，聊天记录若干，还有一份藏在旧网页里。\n她考虑得很周全。",
    clues: ["clue_evidence"]
  },
  {
    id: "underworld_ghost_009",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "别信第一条解释",
    author: "无名",
    timestamp: "2023-11-01 23:23",
    content: "阳间的解释是“个人原因”。\n阴间的记录是“自愿”。\n两条都对，但都不完整。\n第三条，在她留的资料里。",
    clues: ["clue_final_warning", "clue_plan_hint"]
  },
  {
    id: "underworld_ghost_010",
    kind: "ghost_post",
    section: "幽冥水帖",
    title: "那个叫阿月的女孩",
    author: "无名",
    timestamp: "2023-11-02 07:07",
    content: "我见过她。她没白死。\n她的路线还在走。\n只要有人把它走完，它就赢不了。",
    clues: ["clue_not_in_vain"]
  },
  {
    id: "underworld_notice_003",
    kind: "notice",
    section: "管理公告",
    title: "本网站与现实无关",
    timestamp: "2023-01-01 00:00",
    content: "本网站与现实无关。\n如果你觉得有关，请关闭浏览器，出门左转，晒晒太阳。",
    author: "管理员"
  },
  {
    id: "underworld_register_001",
    kind: "register",
    section: "新人登记",
    title: "新人登记",
    timestamp: "2023-01-01 00:00",
    content: "登记姓名，方可进入。\n登记后不得随意变更。\n姓名是很重的东西。想好了再写。",
    author: "管理员"
  }
];

export function getUnderworldRecord(id: string): UnderworldRecord | undefined {
  return underworldRecords.find((r) => r.id === id);
}

export const underworldSections = [
  { name: "总览", path: "/underworld/home" },
  { name: "管理公告", path: "/underworld/section/notice" },
  { name: "幽冥水帖", path: "/underworld/section/ghost_post" },
  { name: "死亡记录", path: "/underworld/section/death_record" },
  { name: "祭祀记录", path: "/underworld/section/ritual" },
  { name: "交易记录", path: "/underworld/section/trade" },
  { name: "聊天记录", path: "/underworld/section/chat" },
  { name: "系统日志", path: "/underworld/section/system_log" },
  { name: "鬼怪博客", path: "/underworld/section/blog" },
  { name: "乱码档案", path: "/underworld/decode" },
  { name: "终局档案", path: "/underworld/final" },
  { name: "新人登记", path: "/underworld/register" }
];
