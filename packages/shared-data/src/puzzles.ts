import type { PuzzleDef } from "./types";

export const puzzles: PuzzleDef[] = [
  {
    id: "puzzle_017",
    type: "cross-site",
    title: "源秘社通行码",
    description: "进入源秘社内部板块需要通行码。它由三部分拼成：论坛用户名 + 阿月的生日 + 校庆编号。",
    location: "/yuanmishe/enter",
    requirements: ["clue_username", "clue_birthday", "clue_school_27"],
    solution: ["yuxiaoyu101727"],
    rewards: ["yuanmisheAuthed"],
    hints: [
      "通行码由三段拼成：论坛的注册名、一个日期、一个数字。",
      "论坛用户「小于」的注册名是什么？阿月的生日是几月几日？官网哪条新闻提到了 27？",
      "yuxiaoyu + 1017 + 27，拼成 yuxiaoyu101727。"
    ]
  },
  {
    id: "puzzle_018",
    type: "timeline",
    title: "阿月的时间线",
    description: "把七个关键事件放进正确的时间位置，还原阿月的故事。",
    location: "/social/user/ayue/timeline",
    requirements: ["clue_001", "clue_002", "clue_003", "clue_004", "clue_005"],
    solution: [],
    rewards: ["reconstructedTimeline"],
    hints: [
      "先找出时间线里最确定的两个点：认识小于和死亡。",
      "异常行为出现在认识小于之后；调查开始于异常加重之后；疏远发生在高中前后。",
      "顺序：认识小于 → 第一次异常 → 影响加深 → 开始调查 → 关系疏远 → 死亡计划 → 死亡。"
    ]
  },
  {
    id: "puzzle_019",
    type: "minigame",
    title: "骷髅跳跳：与小骨的赌局",
    description: "接受小骨的赌约，跑到 3000 分，赢得它的梯子。",
    location: "/yuanmishe/game",
    requirements: ["yuanmisheAuthed"],
    solution: ["3000"],
    rewards: ["skeletonGameWon", "ladderObtained"],
    hints: [
      "空格键起跳，落地再跳。",
      "666 分后背景会变；1314 分后会有“朋友”出现；2000 分时小骨会来打赌。",
      "接受赌约，坚持到 3000 分，梯子就是你的。"
    ]
  },
  {
    id: "puzzle_020",
    type: "url",
    title: "梯子密钥",
    description: "小骨输掉的梯子是一串密钥。把它交给阴间的门。",
    location: "/underworld/entry",
    requirements: ["ladderObtained"],
    solution: ["9f2a7b-xiongniang", "9F2A7B-XIONGNIANG", "9f2a7b-xiongniang"],
    rewards: ["enteredUnderworld"],
    hints: [
      "密钥在小骨输掉赌局后给出的面板上。",
      "密钥由字母和数字组成，注意大小写。",
      "9F2A7B-XIONGNIANG"
    ]
  },
  {
    id: "puzzle_021",
    type: "encoding",
    title: "乱码档案",
    description: "档案以 UTF-8 存储，站点曾按 GBK 误读。请还原字节序列，再用正确编码解码。",
    location: "/underworld/decode",
    requirements: ["enteredUnderworld"],
    solution: ["漆炬迎新人，幽圹萤扰扰"],
    rewards: ["decodedUnderworld"],
    hints: [
      "乱码不是内容，是编码问题。",
      "查看网页源码，找到档案的十六进制字节序列；用 GBK 把它还原。",
      "先按 GBK 编码乱码文本得到 UTF-8 字节，再按 UTF-8 解码。结果是十四个字。"
    ]
  },
  {
    id: "puzzle_022",
    type: "logic",
    title: "终局档案",
    description: "回答三个问题：阿月为什么死？她在对抗什么？她为什么留下这些信息？",
    location: "/underworld/final",
    requirements: ["ladderObtained", "decodedUnderworld", "discoveredAyuePlan", "reconstructedTimeline"],
    solution: [],
    rewards: ["finalPuzzleSolved"],
    hints: [
      "三个问题的答案散落在五个网站里。",
      "她不是被杀死，也不是绝望自杀；她对抗的东西会学人说话；她留下资料是为了让下一个人多知道一点。",
      "答案：主动设计死亡以反制熊娘嘎婆；她在对抗熊娘嘎婆；为了把对抗的路线留给后来者。"
    ]
  }
];

export function getPuzzle(id: string): PuzzleDef | undefined {
  return puzzles.find((p) => p.id === id);
}
