import type { YuanmisheBoard, YuanmishePost, YuanmisheUser } from "./types";

export const yuanmisheUsers: YuanmisheUser[] = [
  {
    id: "user_xiaogu",
    name: "小骨",
    username: "xiaogu",
    joined: "1998-03-13",
    bio: "喜欢玩游戏、打赌、骗人。讨厌晒太阳。",
    avatar: { kind: "skeleton", bg: "#2a2a33", fg: "#cfd6dc", text: "骨" },
    kind: "ghost"
  },
  {
    id: "user_wuling",
    name: "武陵渔人",
    username: "wuling",
    joined: "2015-06-02",
    bio: "湘西人。知道的不少，说的不多。",
    avatar: { kind: "initials", bg: "#39423a", fg: "#cfe3c6", text: "渔" },
    kind: "human"
  },
  {
    id: "user_baiwan",
    name: "白碗",
    username: "baiwan",
    joined: "2017-11-20",
    bio: "祭祀问题可以问我。碗要白，米要新。",
    avatar: { kind: "initials", bg: "#5c5044", fg: "#f0e3cf", text: "碗" },
    kind: "human"
  },
  {
    id: "user_mengpo",
    name: "孟婆汤半价",
    username: "mengpo",
    joined: "2016-01-04",
    bio: "收各种梦。噩梦价格高。",
    avatar: { kind: "silhouette", bg: "#3a2f3a", fg: "#d9c9d9", text: "汤" },
    kind: "unknown"
  },
  {
    id: "user_shoupiao",
    name: "收票的",
    username: "shoupiao",
    joined: "2014-09-09",
    bio: "旧物交易，童叟无欺。",
    avatar: { kind: "initials", bg: "#4a4030", fg: "#e8d9b8", text: "票" },
    kind: "human"
  },
  {
    id: "user_wuming",
    name: "无名",
    username: "wuming",
    joined: "1990-01-01",
    bio: "没有名字，不需要名字。",
    avatar: { kind: "broken", bg: "#222", fg: "#666", text: "?" },
    kind: "ghost"
  },
  {
    id: "user_duan",
    name: "断线木偶",
    username: "duanxian",
    joined: "2020-02-14",
    bio: "记录中。别学我。",
    avatar: { kind: "silhouette", bg: "#443344", fg: "#cbb3cb", text: "偶" },
    kind: "human"
  },
  {
    id: "user_guiren",
    name: "归人",
    username: "guiren",
    joined: "2012-08-08",
    bio: "死亡记录登记员。活人勿扰。",
    avatar: { kind: "initials", bg: "#24262e", fg: "#9fb2c8", text: "归" },
    kind: "unknown"
  },
  {
    id: "user_laoke",
    name: "老客",
    username: "laoke",
    joined: "2013-05-17",
    bio: "地下交易。认货不认人。",
    avatar: { kind: "initials", bg: "#333a2e", fg: "#c8d3ae", text: "客" },
    kind: "unknown"
  },
  {
    id: "user_lihun",
    name: "离魂",
    username: "lihun",
    joined: "2023-08-01",
    bio: "新人。想回家。",
    avatar: { kind: "broken", bg: "#3a3a44", fg: "#9a9ab0", text: "魂" },
    kind: "ghost"
  },
  {
    id: "user_yuecao_yms",
    name: "月见草",
    username: "yuecao",
    joined: "2021-08-19",
    bio: "记录中。有东西跟着我。",
    avatar: { kind: "moon", bg: "#1a2233", fg: "#f3d9a4", text: "月" },
    kind: "human"
  }
];

export const yuanmisheBoards: YuanmisheBoard[] = [
  {
    id: "board_newcomer",
    name: "新人区",
    description: "新来的在这里报到。报名字，不然没人认识你。",
    locked: false,
    postIds: ["yuanmishe_post_001", "yuanmishe_post_002", "yuanmishe_post_020", "yuanmishe_post_032", "yuanmishe_post_033"]
  },
  {
    id: "board_consult",
    name: "灵异咨询",
    description: "有问题可以问。答不答看缘分。",
    locked: false,
    postIds: ["yuanmishe_post_003", "yuanmishe_post_021", "yuanmishe_post_026", "yuanmishe_post_033"]
  },
  {
    id: "board_possession",
    name: "附身记录",
    description: "被附身者的记录。不要在这里开玩笑。",
    locked: true,
    postIds: ["yuanmishe_post_004", "yuanmishe_post_005", "yuanmishe_post_006", "yuanmishe_post_007", "yuanmishe_post_027"]
  },
  {
    id: "board_dream",
    name: "梦境交换",
    description: "交换梦境。梦里的事，在别处是真的。",
    locked: false,
    postIds: ["yuanmishe_post_010", "yuanmishe_post_011", "yuanmishe_post_028"]
  },
  {
    id: "board_trade",
    name: "旧物交易",
    description: "卖东西，买东西。不保真，不退货。",
    locked: false,
    postIds: ["yuanmishe_post_012", "yuanmishe_post_013", "yuanmishe_post_029"]
  },
  {
    id: "board_ritual",
    name: "祭祀问题",
    description: "祭祀、上坟、烧纸。规矩多，别乱来。",
    locked: false,
    postIds: ["yuanmishe_post_008", "yuanmishe_post_009"]
  },
  {
    id: "board_death",
    name: "死亡记录",
    description: "登记的是已经“走了”的人。活人不要点进来。",
    locked: true,
    postIds: ["yuanmishe_post_022", "yuanmishe_post_023", "yuanmishe_post_024"]
  },
  {
    id: "board_underground",
    name: "地下交易",
    description: "见不得光的买卖。",
    locked: true,
    postIds: ["yuanmishe_post_014", "yuanmishe_post_015", "yuanmishe_post_016", "yuanmishe_post_030", "yuanmishe_post_034"]
  },
  {
    id: "board_game",
    name: "游戏区",
    description: "小骨的游戏。输了把名字留下。",
    locked: false,
    postIds: ["yuanmishe_post_017", "yuanmishe_post_018", "yuanmishe_post_019", "yuanmishe_post_031"]
  }
];

export const yuanmishePosts: YuanmishePost[] = [
  {
    id: "yuanmishe_post_001",
    board: "board_newcomer",
    author: "user_yuecao_yms",
    title: "大家好，我是新来的。",
    content:
      "有东西跟着我。它学我说话，学我妈妈的声音叫门。\n\n我试过很多办法，都没用。有人遇到过一样的事吗？",
    timestamp: "2021-08-19 23:12",
    clues: ["clue_yms_arrive"],
    extras: ["clue_004"]
  },
  {
    id: "yuanmishe_post_002",
    board: "board_newcomer",
    author: "user_xiaogu",
    title: "新来的报上名字！",
    content: "不报名字的不许进来！——开玩笑的，我谁的名字都要。",
    timestamp: "2021-08-19 23:20",
    weird: true
  },
  {
    id: "yuanmishe_post_003",
    board: "board_consult",
    author: "user_wuming",
    title: "有人知道“学人说话”的东西是什么吗",
    content: "替一个活人问的。她总是听见有人学她说话，学得很像。",
    timestamp: "2021-08-20 00:03",
    clues: ["clue_004"],
    flags: ["discoveredBearGrandma"]
  },
  {
    id: "yuanmishe_post_004",
    board: "board_possession",
    author: "user_duan",
    title: "附身记录：第37天",
    content:
      "第37天。它开始用我妈的声音叫我吃饭了。\n\n我知道那不是我妈。我妈不会在凌晨三点叫我吃饭。",
    timestamp: "2022-05-18 03:02",
    locked: true
  },
  {
    id: "yuanmishe_post_005",
    board: "board_possession",
    author: "user_duan",
    title: "它开始用我妈的声音叫我吃饭了",
    content: "盐撒了，门也关了。它现在在门外。我能感觉到它在听。",
    timestamp: "2022-05-18 03:11",
    locked: true,
    clues: ["clue_salt"]
  },
  {
    id: "yuanmishe_post_006",
    board: "board_possession",
    author: "user_yuecao_yms",
    title: "我的记录：第 431 天",
    content:
      "记录一下，给以后的人参考。\n\n第 1-60 天：听到有人学我说话。以为是错觉。\n第 61-180 天：开始咬手指。控制不住。班里的人开始躲我。\n第 181-300 天：发现它学的是我妈妈和小于的声音。它想让我开门。\n第 300 天：第一次在门槛上撒盐。它没进来。\n第 400 天：找到一本旧书。书上写的和我经历的一样。它叫熊娘嘎婆。\n第 431 天：我决定把一切都记下来。",
    timestamp: "2022-11-24 22:47",
    locked: true,
    clues: ["clue_005", "clue_006"],
    extras: ["clue_004", "clue_plan_start"]
  },
  {
    id: "yuanmishe_post_007",
    board: "board_possession",
    author: "user_wuling",
    title: "熊娘嘎婆的规矩（整理）",
    content:
      "既然有人问到，我整理一下，只此一帖。\n\n一、它不是野兽，是“存在”。信的人越多，它越稳。\n二、它靠“像”吃饭：学你亲人的声音，穿你熟人的影子，骗你开门。\n三、火与盐可拒。门槛撒盐，屋中点灯。\n四、它对身份：问它只有你们家知道的事。答不上来的，不是人。\n五、它不急。它会等很多年，等一个人慢慢变成它的一部分。\n六、一旦被它认定，躲不开。只能想办法“断”。",
    timestamp: "2021-09-02 21:30",
    locked: true,
    clues: ["clue_004", "clue_006"],
    flags: ["discoveredBearGrandma"]
  },
  {
    id: "yuanmishe_post_008",
    board: "board_ritual",
    author: "user_baiwan",
    title: "祭山的时候能不能说话？",
    content: "规矩是“不回头、不答应、不开口”。但是要敬米，要敬盐。",
    timestamp: "2022-04-01 08:00"
  },
  {
    id: "yuanmishe_post_009",
    board: "board_ritual",
    author: "user_wuling",
    title: "给亡人烧纸用不用画圈",
    content: "画圈是怕别人抢。但圈要留口，方向朝坟。不朝家。",
    timestamp: "2023-04-04 19:15"
  },
  {
    id: "yuanmishe_post_010",
    board: "board_dream",
    author: "user_mengpo",
    title: "梦里有人问我借名字，我没借",
    content: "梦到一条山路，路的尽头站着一个人，问我叫什么名字。\n\n我没说。它站了很久，走了。",
    timestamp: "2023-06-15 02:30"
  },
  {
    id: "yuanmishe_post_011",
    board: "board_dream",
    author: "user_lihun",
    title: "连续七天梦见同一条山路",
    content: "山路，两边是林子，特别黑。每次走到一半就醒了。\n\n有谁知道这是哪里吗？",
    timestamp: "2023-09-10 01:12",
    clues: ["clue_hillside"]
  },
  {
    id: "yuanmishe_post_012",
    board: "board_trade",
    author: "user_shoupiao",
    title: "收一面铜镜，要真用过的",
    content: "不要新的。要旧宅子里用过的。有的联系。",
    timestamp: "2023-07-22 15:44"
  },
  {
    id: "yuanmishe_post_013",
    board: "board_trade",
    author: "user_wuming",
    title: "出一串老钥匙，不知道开哪扇门",
    content: "一共七把。有人要吗。",
    timestamp: "2023-08-08 22:22"
  },
  {
    id: "yuanmishe_post_014",
    board: "board_underground",
    author: "user_laoke",
    title: "收“梯子”。出价好商量。",
    content: "老规矩：有梯子的来。别拿假货糊弄我。",
    timestamp: "2023-05-30 12:00",
    locked: true,
    clues: ["clue_ladder_intro"]
  },
  {
    id: "yuanmishe_post_015",
    board: "board_underground",
    author: "user_xiaogu",
    title: "我偷到一把梯子！真的！",
    content: "——骗你的。\n\n但是我知道谁有。",
    timestamp: "2023-06-01 13:37",
    locked: true,
    weird: true
  },
  {
    id: "yuanmishe_post_016",
    board: "board_underground",
    author: "user_laoke",
    title: "梯子不是谁都能走的",
    content: "梯子是权限，不是工具。走错了，人就留在那边了。\n\n要走，先把名字想好。那边的规矩：没名字的进不去。",
    timestamp: "2023-06-02 20:18",
    locked: true,
    clues: ["clue_ladder_rule"]
  },
  {
    id: "yuanmishe_post_017",
    board: "board_game",
    author: "user_xiaogu",
    title: "快来玩骷髅跳跳！",
    content: "玩法很简单：跳！躲棺材躲鬼火躲纸人躲墓碑！\n\n输了的话，把名字留给我就行。赢了？不可能的。",
    timestamp: "2023-07-01 19:19",
    weird: true,
    clues: ["clue_game_entry"]
  },
  {
    id: "yuanmishe_post_018",
    board: "board_game",
    author: "user_xiaogu",
    title: "没人能跑过 3000",
    content: "我赌一把梯子，没人能在我这儿跑到 3000。\n\n敢赌吗？",
    timestamp: "2023-08-01 19:19",
    weird: true,
    clues: ["clue_bet"]
  },
  {
    id: "yuanmishe_post_019",
    board: "board_game",
    author: "user_lihun",
    title: "这个游戏玩到后面背景会变？",
    content: "玩到六百多的时候，背景好像变成了一片林子。是我看错了吗。",
    timestamp: "2023-09-18 23:40"
  },
  {
    id: "yuanmishe_post_020",
    board: "board_newcomer",
    author: "user_lihun",
    title: "新人报到。有人能告诉我怎么回去吗？",
    content: "我找不到回家的路了。有人能帮帮我吗？",
    timestamp: "2023-08-02 00:00"
  },
  {
    id: "yuanmishe_post_021",
    board: "board_consult",
    author: "user_wuling",
    title: "附身之后还能不能救回来？",
    content:
      "能压，能断，不能轻易“除”。\n\n原理很简单：它靠“像”活着，你就要让它“不像”。撒盐、点灯、对身份、不说话。时间长了，它会去找更好骗的人。\n\n但要是它已经认定你了，就只能断。断的意思，你们自己琢磨。",
    timestamp: "2022-10-10 21:02"
  },
  {
    id: "yuanmishe_post_022",
    board: "board_death",
    author: "user_guiren",
    title: "死亡记录：阿月（2023-10-31）",
    content:
      "姓名：阿月\n日期：2023-10-31\n死因登记：自缚。自愿。\n备注：反制中。\n补充：她把自己的名字留在了门外。\n\n（登记时间早于阳间通报。此事不必再问。）",
    timestamp: "2023-10-31 04:17",
    locked: true,
    clues: ["clue_death_record", "clue_plan_hint"],
    extras: ["clue_self_registered"]
  },
  {
    id: "yuanmishe_post_023",
    board: "board_death",
    author: "user_guiren",
    title: "死亡记录板块说明",
    content: "这里登记的是已经“走了”的人。活人不要点进来。\n\n点进来的，自己负责。",
    timestamp: "2012-08-08 00:00",
    locked: true
  },
  {
    id: "yuanmishe_post_024",
    board: "board_death",
    author: "user_guiren",
    title: "阿月的记录被管理员动过",
    content: "昨天还在的备注，今天少了一行。\n\n有些东西不想被看见。看见了，就当没看见。",
    timestamp: "2023-11-02 09:12",
    locked: true
  },
  {
    id: "yuanmishe_post_025",
    board: "board_newcomer",
    author: "user_guiren",
    title: "管理公告：涉及熊娘嘎婆的帖子已清理",
    content: "本社不欢迎指名道姓的讨论。该说的自然会说。\n\n已清理帖子：若干。",
    timestamp: "2023-11-01 03:03",
    clues: ["clue_censorship"]
  },
  {
    id: "yuanmishe_post_026",
    board: "board_consult",
    author: "user_wuling",
    title: "它学我说话，我不理它，它生气了怎么办",
    content:
      "它生气，是因为你让它“不像”了。\n\n继续不理。把门关好，门槛撒盐，点灯。它气不过，会去别家。\n\n记住：别让它进你的名字。名字是它在那边登记你的方式。",
    timestamp: "2023-09-05 21:44",
    clues: ["clue_name"]
  },
  {
    id: "yuanmishe_post_027",
    board: "board_possession",
    author: "user_duan",
    title: "今天它用了我闺蜜的声音。我差点就开门了。",
    content: "它学得太像了，连语气都一样。我站在门口，手都放在门把手上了。\n\n然后我听见我闺蜜在楼下喊我的名字。楼下那个是真的。",
    timestamp: "2023-10-12 22:30",
    locked: true
  },
  {
    id: "yuanmishe_post_028",
    board: "board_dream",
    author: "user_wuming",
    title: "梦见一个穿校服的女生站在山路上，她没说话",
    content: "她站在山路中间，像是在等谁。我叫她，她没应。\n\n后来她转身走了，往山里走。",
    timestamp: "2023-10-31 03:30",
    clues: ["clue_ayue_vision"]
  },
  {
    id: "yuanmishe_post_029",
    board: "board_trade",
    author: "user_laoke",
    title: "求购打火机，要能一直点着的那种",
    content: "不是普通打火机。要一直烧的。有的联系我。",
    timestamp: "2023-10-20 11:11"
  },
  {
    id: "yuanmishe_post_030",
    board: "board_underground",
    author: "user_laoke",
    title: "提醒：梯子有使用期限",
    content: "梯子不是永久的。过期作废，人就回不来了。\n\n用过的人记得按时回来。",
    timestamp: "2023-10-01 00:00",
    locked: true
  },
  {
    id: "yuanmishe_post_031",
    board: "board_game",
    author: "user_xiaogu",
    title: "打赌吗？",
    content:
      "你跑到 3000，我把我的梯子给你。\n\n跑不到，名字归我。\n\n公平吧？——不公平，但谁在乎呢。",
    timestamp: "2023-10-05 19:19",
    weird: true,
    clues: ["clue_bet"]
  },
  {
    id: "yuanmishe_post_032",
    board: "board_newcomer",
    author: "user_yuecao_yms",
    title: "谢谢大家。我把笔记留好了。",
    content:
      "谢谢武陵渔人，谢谢白碗，谢谢所有给过我建议的人。\n\n我把笔记留好了。如果有人看到这篇帖子，请帮我把路线走下去。\n\n它还没赢。",
    timestamp: "2023-10-28 21:30",
    clues: ["clue_plan_leave"]
  },
  {
    id: "yuanmishe_post_033",
    board: "board_consult",
    author: "user_wuling",
    title: "给新人的话",
    content:
      "源秘社不是论坛，是渡口。\n\n在这里，人和“非人”都在。没有人告诉你谁是哪种。自己分辨。\n\n还有：不要在这里留真名。名字是很重的东西。",
    timestamp: "2019-01-01 00:00"
  },
  {
    id: "yuanmishe_post_034",
    board: "board_underground",
    author: "user_xiaogu",
    title: "你们谁看见我的梯子了？",
    content: "——哦，我还没输过，梯子还在。等我输了再说。",
    timestamp: "2023-10-06 19:19",
    locked: true,
    weird: true
  }
];

export function getYuanmisheUser(id: string): YuanmisheUser {
  return yuanmisheUsers.find((u) => u.id === id) ?? yuanmisheUsers[0];
}

export function getYuanmishePost(id: string): YuanmishePost | undefined {
  return yuanmishePosts.find((p) => p.id === id);
}

export function getYuanmisheBoard(id: string): YuanmisheBoard | undefined {
  return yuanmisheBoards.find((b) => b.id === id);
}

export const yuanmisheAdminNotice = {
  title: "社规",
  content:
    "一、这里欢迎一切存在。\n二、禁止指名道姓地讨论“某些东西”。\n三、禁止在死亡记录板块发布活人信息。\n四、游戏区输掉的人，把名字留下。\n五、渡口不等人。"
};
