import type { ChatLog, SocialComment, SocialPost } from "./types";

const corePosts: SocialPost[] = [
  // ---------- 阿月：正常时期 ----------
  {
    id: "post_social_ayue_001",
    author: "char_ayue",
    timestamp: "2019-10-01 21:14",
    content: "第一天住校。宿舍窗户外有棵树，风一吹像有人在招手。",
    likes: 12,
    comments: [
      { id: "c1", author: "小于", timestamp: "2019-10-01 21:20", content: "树而已啦，别自己吓自己。" }
    ]
  },
  {
    id: "post_social_ayue_002",
    author: "char_ayue",
    timestamp: "2019-10-17 20:02",
    content: "生日。妈妈寄了腊肉，食堂阿姨说帮我热一下。小于送了我一个本子，她说把想说的话都写下来。",
    likes: 23,
    clues: ["clue_birthday"],
    comments: [
      { id: "c1", author: "小于", timestamp: "2019-10-17 20:10", content: "生日快乐！本子要写满呀。" },
      { id: "c2", author: "月见草", timestamp: "2019-10-17 20:33", content: "谢谢。" }
    ]
  },
  {
    id: "post_social_ayue_003",
    author: "char_ayue",
    timestamp: "2019-11-05 18:47",
    content: "今天考试又寄了。",
    likes: 8
  },
  {
    id: "post_social_ayue_004",
    author: "char_ayue",
    timestamp: "2019-11-18 12:30",
    content: "食堂的饭越来越难吃。",
    likes: 15
  },
  {
    id: "post_social_ayue_005",
    author: "char_ayue",
    timestamp: "2019-12-01 07:56",
    content: "小于今天又迟到了。我在教室门口等她，她被班主任罚站了，还冲我笑。",
    likes: 19
  },
  {
    id: "post_social_ayue_006",
    author: "char_ayue",
    timestamp: "2020-01-12 22:31",
    content: "寒假回家。火车上对面的人一直盯着我看，下车的时候对我笑了一下。我不认识他。",
    likes: 9
  },
  {
    id: "post_social_ayue_007",
    author: "char_ayue",
    timestamp: "2020-03-20 15:10",
    content: "网课好无聊。",
    likes: 11
  },
  {
    id: "post_social_ayue_008",
    author: "char_ayue",
    timestamp: "2020-06-15 18:22",
    content: "期末了。宿舍楼下的猫又生了三只，橘色的。",
    likes: 27
  },
  {
    id: "post_social_ayue_009",
    author: "char_ayue",
    timestamp: "2020-09-01 08:03",
    content: "初二了。",
    likes: 10
  },
  {
    id: "post_social_ayue_010",
    author: "char_ayue",
    timestamp: "2020-10-31 23:47",
    content: "晚上梦见自己一直在走一条很长的山路，走了很久，前面还是山。",
    likes: 14,
    comments: [
      { id: "c1", author: "小于", timestamp: "2020-11-01 00:05", content: "梦而已，醒了就好。" }
    ]
  },
  // ---------- 阿月：异常逐渐出现 ----------
  {
    id: "post_social_ayue_011",
    author: "char_ayue",
    timestamp: "2021-01-05 22:40",
    content: "最近总觉得有人在学我说话。",
    likes: 6,
    extras: ["clue_whisper"]
  },
  {
    id: "post_social_ayue_012",
    author: "char_ayue",
    timestamp: "2021-02-14 20:11",
    content: "它今天用了妈妈的声音。",
    likes: 4,
    extras: ["clue_voice"]
  },
  {
    id: "post_social_ayue_013",
    author: "char_ayue",
    timestamp: "2021-03-30 21:02",
    content: "别在走廊尽头那间教室自习。",
    likes: 5
  },
  {
    id: "post_social_ayue_014",
    author: "char_ayue",
    timestamp: "2021-05-20 23:19",
    content: "我在本子上写了字，第二天字变了。不是我写的。",
    likes: 7
  },
  {
    id: "post_social_ayue_015",
    author: "char_ayue",
    timestamp: "2021-07-01 19:44",
    content: "暑假。外婆说，山里的东西不能乱答应。我问为什么，她说答应了就要跟它走。",
    likes: 13
  },
  {
    id: "post_social_ayue_016",
    author: "char_ayue",
    timestamp: "2021-09-01 08:15",
    content: "初三了。搬到了新教学楼。",
    likes: 9
  },
  {
    id: "post_social_ayue_017",
    author: "char_ayue",
    timestamp: "2021-10-17 21:30",
    content: "生日。今年只有我一个人。",
    likes: 11,
    clues: ["clue_birthday"],
    comments: [
      { id: "c1", author: "小于", timestamp: "2021-10-17 21:41", content: "对不起阿月……我那天真的有事。生日快乐。" }
    ]
  },
  {
    id: "post_social_ayue_018",
    author: "char_ayue",
    timestamp: "2021-12-24 23:58",
    content: "它知道我几点睡。",
    likes: 3
  },
  {
    id: "post_social_ayue_019",
    author: "char_ayue",
    timestamp: "2022-03-15 22:03",
    content: "我把盐撒在门槛上了。它今天没进来。",
    likes: 8,
    extras: ["clue_salt"]
  },
  {
    id: "post_social_ayue_020",
    author: "char_ayue",
    timestamp: "2022-05-01 21:27",
    content: "它学会了敲门。别开。",
    likes: 6,
    extras: ["clue_door"]
  },
  {
    id: "post_social_ayue_021",
    author: "char_ayue",
    timestamp: "2022-07-02 16:50",
    content: "找到一本旧书，里面写的东西和我知道的一样。原来它一直在。",
    likes: 12,
    extras: ["clue_book"]
  },
  {
    id: "post_social_ayue_022",
    author: "char_ayue",
    timestamp: "2022-09-01 08:00",
    content: "高一。",
    likes: 7
  },
  {
    id: "post_social_ayue_023",
    author: "char_ayue",
    timestamp: "2022-10-30 22:18",
    content: "不要回答门外的人。",
    likes: 5,
    extras: ["clue_door"]
  },
  {
    id: "post_social_ayue_024",
    author: "char_ayue",
    timestamp: "2022-12-01 20:39",
    content: "我把它写下来的东西贴在床头了。外婆说，看得见的东西不可怕。",
    likes: 9
  },
  {
    id: "post_social_ayue_025",
    author: "char_ayue",
    timestamp: "2023-01-01 00:01",
    content: "新的一年。它还在。",
    likes: 6
  },
  {
    id: "post_social_ayue_026",
    author: "char_ayue",
    timestamp: "2023-02-14 21:33",
    content: "火。盐。记住这两样。",
    likes: 10,
    extras: ["clue_salt", "clue_fire"]
  },
  {
    id: "post_social_ayue_027",
    author: "char_ayue",
    timestamp: "2023-04-05 18:20",
    content: "清明。我去给外婆扫墓。她说要是哪天她不在，让我别信学她声音的东西。外婆，我记住了。",
    likes: 16
  },
  {
    id: "post_social_ayue_028",
    author: "char_ayue",
    timestamp: "2023-06-10 17:42",
    content: "马上高二了。",
    likes: 8
  },
  {
    id: "post_social_ayue_029",
    author: "char_ayue",
    timestamp: "2023-07-15 23:05",
    content: "我想明白了一些事。",
    likes: 11,
    extras: ["clue_plan_start"]
  },
  {
    id: "post_social_ayue_030",
    author: "char_ayue",
    timestamp: "2023-08-20 22:47",
    content: "我在准备一件重要的事。可能很久不会更新。不用担心我。",
    likes: 13,
    extras: ["clue_plan_start"]
  },
  {
    id: "post_social_ayue_031",
    author: "char_ayue",
    timestamp: "2023-09-30 20:15",
    content: "别担心我。",
    likes: 9
  },
  {
    id: "post_social_ayue_032",
    author: "char_ayue",
    timestamp: "2023-10-17 22:00",
    content: "生日。我给自己买了蛋糕。蜡烛点起来的时候，火苗晃了三次。",
    likes: 17,
    clues: ["clue_birthday"],
    comments: [
      { id: "c1", author: "小于", timestamp: "2023-10-17 22:14", content: "生日快乐。明年我们一定一起过。" },
      { id: "c2", author: "月亮不营业", timestamp: "2023-10-17 22:16", content: "好。" }
    ]
  },
  {
    id: "post_social_ayue_035",
    author: "char_ayue",
    timestamp: "2023-10-15 17:20",
    content: "她又来了。今天它跟了一路。",
    likes: 6,
    extras: ["clue_voice"],
    comments: [
      { id: "c1", author: "小于", timestamp: "2023-10-15 17:31", content: "今天和阿月出去玩，她看起来有点累。没事吧？" }
    ]
  },
  {
    id: "post_social_ayue_033",
    author: "char_ayue",
    timestamp: "2023-10-25 21:38",
    content: "它最近很安静。安静得不对劲。",
    likes: 5
  },
  {
    id: "post_social_ayue_034",
    author: "char_ayue",
    timestamp: "2023-10-30 23:59",
    content: "如果我突然不见了，不要相信第一条解释。",
    likes: 21,
    extras: ["clue_final_warning"]
  },

  // ---------- 小于：普通人的视角 ----------
  {
    id: "post_social_xiaoyu_001",
    author: "char_xiaoyu",
    timestamp: "2019-09-05 18:30",
    content: "开学第一天，认识了一个新朋友。她叫阿月。她话不多，但是个很好的人。",
    likes: 14
  },
  {
    id: "post_social_xiaoyu_002",
    author: "char_xiaoyu",
    timestamp: "2019-10-17 20:05",
    content: "今天是阿月的生日！送了她一个本子，希望她把开心的事都写下来。",
    likes: 18
  },
  {
    id: "post_social_xiaoyu_003",
    author: "char_xiaoyu",
    timestamp: "2019-12-01 07:50",
    content: "又迟到了，被班主任抓个正着。阿月在教室门口笑得可开心了。",
    likes: 16
  },
  {
    id: "post_social_xiaoyu_004",
    author: "char_xiaoyu",
    timestamp: "2020-05-20 21:11",
    content: "阿月今天情绪不太好。我问她怎么了，她说没事。希望她是真的没事。",
    likes: 12
  },
  {
    id: "post_social_xiaoyu_005",
    author: "char_xiaoyu",
    timestamp: "2020-09-01 08:12",
    content: "初二，和阿月分到了一个班！开心！",
    likes: 22
  },
  {
    id: "post_social_xiaoyu_006",
    author: "char_xiaoyu",
    timestamp: "2021-01-08 22:20",
    content: "阿月最近总说有人学她说话。我让她去医院看看，她说她没事。",
    likes: 8
  },
  {
    id: "post_social_xiaoyu_007",
    author: "char_xiaoyu",
    timestamp: "2021-05-02 20:18",
    content: "今天和阿月出去玩。她看起来很开心，我也开心。",
    likes: 19
  },
  {
    id: "post_social_xiaoyu_008",
    author: "char_xiaoyu",
    timestamp: "2021-09-01 08:05",
    content: "初三了，好快。",
    likes: 9
  },
  {
    id: "post_social_xiaoyu_009",
    author: "char_xiaoyu",
    timestamp: "2022-01-02 21:40",
    content: "不知道为什么，和阿月之间好像没有以前那么亲近了。明明什么都没发生。",
    likes: 15
  },
  {
    id: "post_social_xiaoyu_010",
    author: "char_xiaoyu",
    timestamp: "2022-04-02 22:35",
    content: "我问阿月到底怎么了。她说我没事。她说“不是我”。她看着我，眼神很清醒。我有点害怕。",
    likes: 11
  },
  {
    id: "post_social_xiaoyu_011",
    author: "char_xiaoyu",
    timestamp: "2022-06-15 20:02",
    content: "阿月转告我说，暑假别去找她。她说家里有事。",
    likes: 7
  },
  {
    id: "post_social_xiaoyu_012",
    author: "char_xiaoyu",
    timestamp: "2022-09-01 08:20",
    content: "高一。我和阿月还是同一所学校，但不在一个班了。",
    likes: 10
  },
  {
    id: "post_social_xiaoyu_013",
    author: "char_xiaoyu",
    timestamp: "2022-10-05 21:22",
    content: "阿月说，让我别再问“它”是什么。她说我越知道越危险。我不懂。",
    likes: 13
  },
  {
    id: "post_social_xiaoyu_014",
    author: "char_xiaoyu",
    timestamp: "2022-12-31 23:50",
    content: "跨年了。阿月没有回我消息。可能她睡了。",
    likes: 9
  },
  {
    id: "post_social_xiaoyu_015",
    author: "char_xiaoyu",
    timestamp: "2023-02-14 21:40",
    content: "阿月发了一条动态：“火。盐。记住这两样。”我问她什么意思，她说没什么。",
    likes: 12
  },
  {
    id: "post_social_xiaoyu_016",
    author: "char_xiaoyu",
    timestamp: "2023-04-05 19:20",
    content: "清明。阿月去给外婆扫墓了。她外婆去年走的，她哭得很厉害。",
    likes: 14
  },
  {
    id: "post_social_xiaoyu_017",
    author: "char_xiaoyu",
    timestamp: "2023-07-20 20:12",
    content: "阿月说她在准备一件重要的事。我问是什么事，她只说“到时候你就知道了”。",
    likes: 8
  },
  {
    id: "post_social_xiaoyu_018",
    author: "char_xiaoyu",
    timestamp: "2023-09-02 19:45",
    content: "高二开学。阿月变了很多，她好像……轻松了一点？但说不上来哪里不对。",
    likes: 11
  },
  {
    id: "post_social_xiaoyu_019",
    author: "char_xiaoyu",
    timestamp: "2023-10-15 16:30",
    content: "今天和阿月出去玩。她请我喝奶茶，说我最近复习辛苦了。她笑得很好看。",
    likes: 26,
    extras: ["clue_contrast"]
  },
  {
    id: "post_social_xiaoyu_020",
    author: "char_xiaoyu",
    timestamp: "2023-10-17 22:20",
    content: "阿月生日。她说想一个人过，我就没去。她发了我一张蛋糕的照片，蜡烛火苗晃了三次。她说这是第三次了。",
    likes: 18
  },
  {
    id: "post_social_xiaoyu_021",
    author: "char_xiaoyu",
    timestamp: "2023-10-30 23:30",
    content: "阿月最后一条动态：“如果我突然不见了，不要相信第一条解释。”我给她打电话，没打通。",
    likes: 9
  },
  {
    id: "post_social_xiaoyu_022",
    author: "char_xiaoyu",
    timestamp: "2023-11-02 21:18",
    content: "学校公告说她是因为个人原因。我不信。\n\n她走之前跟我说过：有些事不是解释得清楚的。但她从来没想过伤害自己。我知道的。",
    likes: 31,
    extras: ["clue_xiaoyu_doubt"]
  },
  {
    id: "post_social_xiaoyu_023",
    author: "char_xiaoyu",
    timestamp: "2023-11-03 20:05",
    content: "我今天去看了她留下的东西。她没有清理。她好像……是故意留下的。",
    likes: 24,
    extras: ["clue_left_behind"]
  },
  {
    id: "post_social_xiaoyu_024",
    author: "char_xiaoyu",
    timestamp: "2023-11-05 19:02",
    content: "如果有人在看阿月的账号，请你把她写的东西看完。她不是疯的。",
    likes: 28,
    extras: ["clue_reader"]
  }
];

export const chatLogs: ChatLog[] = [
  {
    id: "chat_001",
    title: "2022年4月2日 21:40-22:10",
    date: "2022-04-02",
    clues: ["clue_notme"],
    messages: [
      { id: "m1", from: "char_xiaoyu", content: "你最近到底怎么了？", time: "21:40" },
      { id: "m2", from: "char_ayue", content: "我没事。", time: "21:41" },
      { id: "m3", from: "char_xiaoyu", content: "你昨天又咬手了。我看到你手上有牙印。", time: "21:43" },
      { id: "m4", from: "char_ayue", content: "不是我。", time: "21:44" },
      { id: "m5", from: "char_xiaoyu", content: "什么？", time: "21:44" },
      { id: "m6", from: "char_ayue", content: "咬手的人不是我。它想让我看起来像疯了。", time: "21:47" },
      { id: "m7", from: "char_xiaoyu", content: "阿月……我们去医院好不好？", time: "21:50" },
      { id: "m8", from: "char_ayue", content: "医院治不了它。但我能。", time: "21:52" },
      { id: "m9", from: "char_xiaoyu", content: "……", time: "21:53" }
    ]
  },
  {
    id: "chat_002",
    title: "2022年10月5日 22:30-22:55",
    date: "2022-10-05",
    clues: ["clue_protect"],
    messages: [
      { id: "m1", from: "char_xiaoyu", content: "你上次说的“它”，到底是什么？", time: "22:30" },
      { id: "m2", from: "char_ayue", content: "别问了。你越知道越危险。", time: "22:31" },
      { id: "m3", from: "char_xiaoyu", content: "我们是朋友。我可以帮你。", time: "22:33" },
      { id: "m4", from: "char_ayue", content: "所以更不能告诉你。", time: "22:34" },
      { id: "m5", from: "char_xiaoyu", content: "那你一个人扛着？", time: "22:36" },
      { id: "m6", from: "char_ayue", content: "它有目标。只要我一直在，它就不会注意到你。", time: "22:40" },
      { id: "m7", from: "char_xiaoyu", content: "我不怕。", time: "22:41" },
      { id: "m8", from: "char_ayue", content: "我怕。", time: "22:42" }
    ]
  },
  {
    id: "chat_003",
    title: "2023年10月29日 23:30-23:58",
    date: "2023-10-29",
    clues: ["clue_plan_leave"],
    messages: [
      { id: "m1", from: "char_xiaoyu", content: "你要去哪？", time: "23:30" },
      { id: "m2", from: "char_ayue", content: "去把我留下的东西放好。", time: "23:32" },
      { id: "m3", from: "char_xiaoyu", content: "什么东西？", time: "23:33" },
      { id: "m4", from: "char_ayue", content: "一些经验。一些方法。给下一个需要的人。", time: "23:36" },
      { id: "m5", from: "char_xiaoyu", content: "什么时候回来？", time: "23:40" },
      { id: "m6", from: "char_ayue", content: "……", time: "23:41" },
      { id: "m7", from: "char_xiaoyu", content: "阿月？", time: "23:42" },
      { id: "m8", from: "char_ayue", content: "小于，谢谢你陪我这么多年。如果以后有人问起我，别让他们只看第一条解释。", time: "23:50" },
      { id: "m9", from: "char_xiaoyu", content: "你别说这种话……", time: "23:52" },
      { id: "m10", from: "char_ayue", content: "晚安。", time: "23:58" }
    ]
  }
];

function cp(
  author: string,
  idSuffix: string,
  timestamp: string,
  content: string,
  likes = 5,
  comments?: SocialComment[]
): SocialPost {
  return {
    id: `post_social_${author}_${idSuffix}`,
    author: "char_" + author,
    timestamp,
    content,
    likes,
    comments
  };
}

const classmatePosts: SocialPost[] = [
  cp("chenyt", "001", "2023-10-12 18:30", "今天画了一张速写，是教室窗外的树。", 7, [
    { id: "cc1", author: "小于", timestamp: "2023-10-12 18:42", content: "好看！求教。" }
  ]),
  cp("chenyt", "002", "2021-04-08 16:10", "美术课画水彩，把颜料弄得到处都是。", 6),
  cp("whao", "001", "2023-10-18 17:20", "篮球赛赢了！七班下周见。", 12),
  cp("whao", "002", "2022-11-09 18:02", "校队选拔落选了，明年再来。", 9),
  cp("lina", "001", "2023-11-01 21:10", "模考成绩出来了，数学还是老样子。", 10),
  cp("lina", "002", "2023-09-25 22:00", "整理了错题本，希望能用上。", 8),
  cp("zhangwei", "001", "2023-10-21 22:40", "周末打游戏，爽。", 11),
  cp("liuyang", "001", "2023-10-14 19:30", "学会一首新歌了，有机会弹给大家听。", 9),
  cp("yangxue", "001", "2023-10-19 12:20", "演唱会门票抢到了！", 15),
  cp("zhaolei", "001", "2023-10-23 13:05", "困。", 20),
  cp("sunyue", "001", "2023-10-16 17:40", "今天广播站放了我点的歌。", 8),
  cp("zhoujie", "001", "2023-10-20 18:15", "晚霞真好看，拍了好几张。", 14, [
    { id: "cc1", author: "小于", timestamp: "2023-10-20 18:22", content: "好看！" }
  ]),
  cp("wuqian", "001", "2023-10-11 22:05", "看完了一本小说，结局有点难过。", 7),
  cp("zhengke", "001", "2023-10-15 07:20", "晨跑打卡第 21 天。", 6),
  cp("fengxue", "001", "2023-10-13 12:10", "宿舍楼下的猫又生了三只，跟去年一样多。", 18),
  cp("jiangtao", "001", "2023-10-17 23:30", "那道数学题终于解出来了，用了两页草稿纸。", 5),
  cp("hanmei", "001", "2023-10-09 18:40", "泡面加蛋，是今晚的仪式感。", 8),
  cp("caoyang", "001", "2023-10-08 15:50", "报名了羽毛球赛，先练起来。", 7),
  cp("xujing", "001", "2023-10-18 22:10", "晚自习结束，走廊尽头好像站着个人。走近一看是值日生在拖地。吓我一跳。", 10),
  cp("xujing", "002", "2022-05-20 21:00", "今天没什么特别的，写进日记里。", 4),
  cp("dengkai", "001", "2023-10-22 20:30", "半夜看球，明天上课要完。", 9),
  cp("linxiao", "001", "2023-10-10 21:40", "新番更新了，今晚先看一集。", 12),
  cp("heyu", "001", "2023-06-09 17:05", "后山下过雨，路特别滑，大家绕道走啊。", 13),
  cp("gaoxiang", "001", "2023-10-06 21:50", "晚上在操场看到好多星星，拍不清，用眼睛记住了。", 8),
  cp("luoting", "001", "2023-10-07 19:20", "折了一盒子星星，打算送人。", 9),
  cp("songjia", "001", "2023-10-05 17:30", "文艺汇演排练，脚都酸了。", 7),
  cp("xieyu", "001", "2023-10-04 16:40", "象棋又输了，下次一定。", 5),
  cp("tangtang", "001", "2023-10-03 12:20", "食堂新出的蛋糕也太好吃了！", 16, [
    { id: "cc1", author: "小于", timestamp: "2023-10-03 12:35", content: "哪个窗口？求指路。" }
  ]),
  cp("yuyue", "001", "2023-09-14 20:10", "图书馆三楼那间自习室的灯一直闪，能不能找人修一下。", 9),
  cp("donghao", "001", "2023-10-02 21:30", "晚自习后操场夜跑，风挺大的。", 6),
  cp("xiaoran", "001", "2023-10-22 23:50", "半夜好像听见有人喊我名字，爬起来一看是我妈打电话。吓死我了。", 17, [
    { id: "cc1", author: "小于", timestamp: "2023-10-23 00:05", content: "哈哈哈哈你太惨了。" }
  ]),
  cp("xiaoran", "002", "2023-09-30 15:20", "订的汉服到了，好看！", 11),
  cp("chengliang", "001", "2023-09-28 20:40", "把家里的旧电脑修好了，成就感满满。", 7),
  cp("caoyu", "001", "2023-09-26 17:10", "阳台种的花开了，粉色那朵。", 10),
  cp("yuanyuan", "001", "2023-09-22 19:30", "练琴。隔壁宿舍说挺好听的。", 6),
  cp("panting", "001", "2023-09-20 12:40", "借到心心念念的漫画了。", 8),
  cp("houjun", "001", "2023-09-18 16:30", "体测跑完，腿已经不是我的了。", 9),
  cp("jianglin", "001", "2023-09-15 21:20", "临了一页字帖，手有点抖。", 5),
  cp("xiemin", "001", "2023-09-12 18:50", "又囤了一抽屉零食。", 12),
  cp("yanchen", "001", "2023-10-05 22:15", "晚自习后有人在我后面跑步，脚步声跟了我一路。回头一看是同学，吓我一跳。", 11),
  cp("gubei", "001", "2023-09-10 22:30", "写了个短篇，三千字，累。", 7),
  cp("maodou", "001", "2023-09-08 12:30", "午饭连吃了三家窗口，撑。", 10),
  cp("luofei", "001", "2023-09-05 13:10", "补觉。谁都别叫我。", 8),
  cp("luhang", "001", "2023-09-03 15:40", "拼完了一个模型，放桌上镇宅。", 6),
  cp("xiaqi", "001", "2023-08-30 23:40", "追剧追到半夜，明天上课完蛋。", 14),
  cp("chenyt", "003", "2019-10-15 17:20", "初一第一节美术课，画了只猫。", 6),
  cp("whao", "003", "2019-11-03 16:10", "初一运动会，跑了个第三名。", 9),
  cp("sunyue", "002", "2021-06-01 12:00", "六一儿童节，广播站放了一下午儿歌。", 7),
  cp("fengxue", "002", "2021-05-04 18:20", "宿舍楼下那只猫今天趴在门口晒太阳，可爱。", 11),
  cp("xujing", "003", "2021-03-15 21:50", "初中部走廊尽头那间教室今天锁了，灯也没开。有点奇怪，但和我没关系。", 4),
  cp("maodou", "002", "2022-12-01 12:10", "食堂二楼新窗口，分量挺足。", 8),
  cp("zhoujie", "002", "2022-10-19 18:05", "秋天了，操场边的叶子落了一地。", 9)
];

export const socialPosts: SocialPost[] = [...corePosts, ...classmatePosts];

export const ayueNotes = {
  id: "page_ayue_notes",
  title: "我的笔记",
  subtitle: "写给自己，也给以后看到的人",
  paragraphs: [
    "它叫熊娘嘎婆。湘西的老人叫它“熊外婆”。它不是故事。它一直在。",
    "它会学你最亲近的人的声音。学妈妈叫门，学小于说话。你只要答应，它就会进来。所以：不要回答门外的人。",
    "火和盐可以挡住它。门槛上撒盐，房间里点一盏灯。它怕光，怕烫，怕“被看见”。",
    "它会模仿，所以要对身份。问它只有你和家人知道的事。答不上来的，不是人。",
    "它会吃人。但更多时候，它想让人活着，变成它的一部分。它想让我“成为它”。",
    "我查了三年。旧书、老人、网络，还有源秘社（www.yuanmishe.net）。那里有人懂这些。",
    "我试过所有办法。压不住。它太强了，而且我快撑不住了。",
    "所以我决定自己来。我的死会是它计划里的一道裂缝。我把自己和它绑在一起，让它暂时动不了。",
    "我把经验留在这里了。如果你能看到这份笔记，说明它还没成功。",
    "火。盐。关门。不要相信第一条解释。",
    "——阿月"
  ],
  clues: ["clue_004", "clue_005", "clue_006"],
  flags: ["discoveredBearGrandma"]
};

export function getSocialPostsByAuthor(author: string): SocialPost[] {
  return socialPosts
    .filter((p) => p.author === author)
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function getSocialPost(id: string): SocialPost | undefined {
  return socialPosts.find((p) => p.id === id);
}
