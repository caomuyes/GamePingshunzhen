import type { ForumBoard, ForumComment, ForumPost, ForumUser } from "./types";

export const forumUsers: ForumUser[] = [
  {
    id: "user_admin",
    name: "平顺镇高中校务办",
    username: "ps_admin",
    joined: "2016-09-01",
    posts: 312,
    followers: 1893,
    bio: "平顺镇高中官方账号。通知、公告与校园信息发布。",
    avatar: { kind: "initials", bg: "#2f6db3", fg: "#ffffff", text: "校" },
    status: "active",
    badges: ["管理员"]
  },
  {
    id: "user_xiaoyu",
    name: "小于",
    username: "yuxiaoyu",
    joined: "2019-09-05",
    posts: 47,
    followers: 62,
    bio: "普普通通的高中生。",
    avatar: { kind: "flower", bg: "#3a4a5a", fg: "#cfe7e0", text: "小" },
    status: "active"
  },
  {
    id: "user_yuecao",
    name: "月见草",
    username: "yuecao_17",
    joined: "2019-09-08",
    posts: 23,
    followers: 35,
    bio: "",
    avatar: { kind: "moon", bg: "#1a2233", fg: "#f3d9a4", text: "月" },
    status: "deleted",
    oldName: "晚风过境"
  },
  {
    id: "user_liutao",
    name: "刘涛",
    username: "taotao_03",
    joined: "2022-09-01",
    posts: 131,
    followers: 18,
    bio: "高二（7）班。",
    avatar: { kind: "initials", bg: "#5b7a9d", fg: "#fff", text: "刘" },
    status: "active"
  },
  {
    id: "user_zhouchen",
    name: "周晨",
    username: "chenchen_07",
    joined: "2022-09-01",
    posts: 89,
    followers: 26,
    bio: "今天也要开心。",
    avatar: { kind: "initials", bg: "#c9879c", fg: "#fff", text: "晨" },
    status: "active"
  },
  {
    id: "user_aizhe",
    name: "阿泽不熬夜",
    username: "aize",
    joined: "2023-03-12",
    posts: 54,
    followers: 9,
    bio: "口号：不熬夜。现状：凌晨一点。",
    avatar: { kind: "initials", bg: "#6d5b8c", fg: "#fff", text: "泽" },
    status: "active"
  },
  {
    id: "user_wanshifu",
    name: "晚自习幸存者",
    username: "wanzixi",
    joined: "2020-09-03",
    posts: 76,
    followers: 12,
    bio: "活着下晚自习就是胜利。",
    avatar: { kind: "initials", bg: "#3f6f6a", fg: "#fff", text: "晚" },
    status: "active"
  },
  {
    id: "user_touming",
    name: "初三二班小透明",
    username: "touming",
    joined: "2018-09-01",
    posts: 41,
    followers: 7,
    bio: "已毕业。偶尔回来看看。",
    avatar: { kind: "silhouette", bg: "#8a8a9a", fg: "#fff", text: "透" },
    status: "active"
  },
  {
    id: "user_luguo",
    name: "路过",
    username: "luguoluguo",
    joined: "2017-10-11",
    posts: 15,
    followers: 3,
    bio: "真的只是路过。",
    avatar: { kind: "initials", bg: "#9a8c6b", fg: "#fff", text: "路" },
    status: "active"
  },
  {
    id: "user_chawu",
    name: "查无此人",
    username: "chawuci",
    joined: "2019-04-02",
    posts: 9,
    followers: 2,
    bio: "",
    avatar: { kind: "broken", bg: "#555", fg: "#888", text: "?" },
    status: "active"
  },
  {
    id: "user_kaoya",
    name: "烤鸭真好吃",
    username: "kaoya666",
    joined: "2021-09-01",
    posts: 203,
    followers: 31,
    bio: "吃！",
    avatar: { kind: "initials", bg: "#b3653f", fg: "#fff", text: "鸭" },
    status: "active"
  },
  {
    id: "user_anonym",
    name: "匿名同学",
    username: "niming",
    joined: "2020-09-01",
    posts: 22,
    followers: 5,
    bio: "别问我是谁。",
    avatar: { kind: "silhouette", bg: "#6b6b7b", fg: "#fff", text: "匿" },
    status: "active"
  },
  {
    id: "user_deleted",
    name: "用户已注销",
    username: "deleted_user",
    joined: "2019-09-01",
    posts: 0,
    followers: 0,
    bio: "该用户已注销。",
    avatar: { kind: "broken", bg: "#444", fg: "#777", text: "×" },
    status: "deleted"
  }
];

export const forumBoards: ForumBoard[] = [
  {
    id: "board_general",
    name: "校园综合讨论区",
    description: "大家想聊什么就聊什么",
    postIds: [
      "post_forum_001",
      "post_forum_007",
      "post_forum_008",
      "post_forum_002",
      "post_forum_006",
      "post_forum_013",
      "post_forum_009",
      "post_forum_025",
      "post_forum_014",
      "post_forum_022",
      "post_forum_010"
    ]
  },
  {
    id: "board_life",
    name: "校园生活",
    description: "食堂、宿舍、日常",
    postIds: ["post_forum_009", "post_forum_013", "post_forum_022", "post_forum_025", "post_forum_020"]
  },
  {
    id: "board_study",
    name: "学习交流",
    description: "作业、考试、学习方法",
    postIds: ["post_forum_010", "post_forum_021", "post_forum_026"]
  },
  {
    id: "board_lost",
    name: "失物招领",
    description: "丢了什么、捡到什么",
    postIds: ["post_forum_011", "post_forum_020"]
  },
  {
    id: "board_gossip",
    name: "校园八卦",
    description: "仅限闲聊，请勿人身攻击",
    postIds: ["post_forum_002", "post_forum_004", "post_forum_005", "post_forum_007", "post_forum_014", "post_forum_023"]
  },
  {
    id: "board_graduate",
    name: "毕业生交流",
    description: "毕业的同学们常回来看看",
    postIds: ["post_forum_012", "post_forum_019"]
  },
  {
    id: "board_notice",
    name: "校内公告",
    description: "学校官方通知",
    postIds: ["post_forum_001", "post_forum_015", "post_forum_016", "post_forum_024"]
  },
  {
    id: "board_archive",
    name: "旧帖子归档",
    description: "2019 年及以前的帖子存档",
    postIds: ["post_forum_003", "post_forum_004", "post_forum_017", "post_forum_018", "post_forum_016"]
  }
];

export const forumPosts: ForumPost[] = [
  {
    id: "post_forum_001",
    board: "board_notice",
    author: "user_admin",
    title: "关于我校一名学生死亡情况的说明",
    content:
      "各位老师、同学、家长：\n\n2023年10月31日，我校一名学生不幸离世。经核实，该生系因个人原因离世，相关善后事宜已由家属处理完毕。\n\n请全体师生尊重逝者及其家属隐私，不要在网络上传播未经证实的信息。对于造谣传谣行为，学校将保留追究责任的权利。\n\n如有心理困扰，可联系学校心理健康辅导室（办公地点：综合楼三楼，周老师）。\n\n平顺镇高中 校务办公室\n2023年11月2日",
    timestamp: "2023-11-02 08:30",
    views: 2041,
    replies: 6,
    pinned: true,
    edited: { at: "2023-11-02 22:41", note: "内容已编辑" },
    tags: ["公告", "死亡"],
    clues: ["clue_001"],
    flags: ["foundDeathNotice", "discoveredAyue"]
  },
  {
    id: "post_forum_002",
    board: "board_gossip",
    author: "user_liutao",
    title: "有人知道阿月是谁吗？",
    content:
      "就是今天公告里说的那个。有认识的吗？我们班没人认识她，查了分班表也没见过这名字。",
    timestamp: "2023-11-02 09:14",
    views: 687,
    replies: 12,
    tags: ["阿月"],
    clues: ["clue_001"]
  },
  {
    id: "post_forum_003",
    board: "board_archive",
    author: "user_luguo",
    title: "初中部是不是有个特别奇怪的女生？",
    content:
      "我初二那年（2019年），初中部有个女生特别出名，好像叫阿月。\n\n上课的时候会突然咬自己的手指头，咬到出血那种；有时候整个人像一下子老了几十岁，把老师都吓到过。\n\n不是我说她坏话，是真的挺吓人的。有没有人知道她后来怎么样了？",
    timestamp: "2019-11-18 21:37",
    views: 1543,
    replies: 18,
    tags: ["初中部", "阿月"],
    clues: ["clue_003"],
    flags: ["discoveredAyue"]
  },
  {
    id: "post_forum_004",
    board: "board_archive",
    author: "user_touming",
    title: "她以前是不是和小于一起？",
    content:
      "翻到初中部的老帖子，想起来那个女生了。她初一那会儿一直和隔壁班一个女生一起玩，叫小于。\n\n两人形影不离，吃饭都在一起。后来初三好像就没什么交集了，不知道为什么。",
    timestamp: "2021-06-12 16:02",
    views: 902,
    replies: 9,
    tags: ["阿月", "小于"],
    clues: ["clue_002"],
    flags: ["discoveredXiaoyu"]
  },
  {
    id: "post_forum_005",
    board: "board_gossip",
    author: "user_zhouchen",
    title: "阿月的事，真的不要乱说",
    content:
      "我认识她。准确说，我初中和她同班过一年。\n\n她不是你们说的那种“怪人”。她其实很清醒，比谁都清醒。\n\n我见过她一个人对着空气说话，像是在跟什么人打招呼。有一次我问她跟谁说话，她说“它又来了”。我当时以为她在开玩笑。\n\n她现在不在了。求求大家别再乱传了。",
    timestamp: "2023-11-02 11:03",
    views: 431,
    replies: 4,
    deleted: true,
    deletedBy: "管理员",
    tags: ["阿月"],
    extras: ["clue_whisper"]
  },
  {
    id: "post_forum_006",
    board: "board_gossip",
    author: "user_deleted",
    title: "有人认识月见草吗？她账号注销了",
    content:
      "初中同学，今天突然听说她的事。她以前在论坛叫“月见草”，发过一些帖子，后来账号注销了。\n\n有没有人记得她？",
    timestamp: "2023-11-03 19:26",
    views: 315,
    replies: 7,
    tags: ["月见草", "阿月"]
  },
  {
    id: "post_forum_007",
    board: "board_gossip",
    author: "user_aizhe",
    title: "关于阿月的帖子怎么被删了",
    content:
      "刚才有个帖子说认识阿月，怎么一会儿就没了？\n\n不是说造谣才删吗，那帖子看着不像造谣啊。",
    timestamp: "2023-11-02 11:26",
    views: 258,
    replies: 6,
    tags: ["阿月"]
  },
  {
    id: "post_forum_008",
    board: "board_general",
    author: "user_wanshifu",
    title: "为什么学校说是个人原因",
    content:
      "公告就一句“个人原因”，具体什么都没说。\n\n我姐以前在初中部，她说那女生家里出事之前就特别奇怪，好像还进过什么名单。有知道内情的吗？",
    timestamp: "2023-11-03 20:11",
    views: 402,
    replies: 11,
    tags: ["阿月"],
    extras: ["clue_school_hint"]
  },
  {
    id: "post_forum_009",
    board: "board_life",
    author: "user_kaoya",
    title: "食堂三楼新窗口测评：麻辣香锅yyds",
    content: "排队二十分钟，好吃是好吃，就是太慢了。推荐加方便面，绝了。",
    timestamp: "2023-10-28 12:30",
    views: 866,
    replies: 15
  },
  {
    id: "post_forum_010",
    board: "board_study",
    author: "user_liutao",
    title: "期中考试安排出了，人麻了",
    content: "11月15号开始考，连考三天。求大佬划重点。",
    timestamp: "2023-10-30 18:45",
    views: 731,
    replies: 22
  },
  {
    id: "post_forum_011",
    board: "board_lost",
    author: "user_anonym",
    title: "捡到一串钥匙，失物招领处",
    content: "钥匙串上有个小铃铛挂件。放失物招领处了。",
    timestamp: "2023-10-29 07:52",
    views: 143,
    replies: 3
  },
  {
    id: "post_forum_012",
    board: "board_graduate",
    author: "user_touming",
    title: "毕业三年，回来看看",
    content: "学校变化不大。后山那片还是围着的，挺好。",
    timestamp: "2023-10-27 20:18",
    views: 208,
    replies: 4
  },
  {
    id: "post_forum_013",
    board: "board_life",
    author: "user_zhouchen",
    title: "运动会报名开始了，有人一起吗",
    content: "报了800米，现在开始后悔。",
    timestamp: "2023-10-26 15:40",
    views: 312,
    replies: 9
  },
  {
    id: "post_forum_014",
    board: "board_gossip",
    author: "user_kaoya",
    title: "高一年级篮球赛决赛今晚",
    content: "七班对四班，操场见。",
    timestamp: "2023-10-25 12:02",
    views: 456,
    replies: 12
  },
  {
    id: "post_forum_015",
    board: "board_notice",
    author: "user_admin",
    title: "国庆节放假通知",
    content: "10月1日至7日放假，8日照常上课。祝大家节日愉快。",
    timestamp: "2023-09-28 09:00",
    views: 1203,
    replies: 4
  },
  {
    id: "post_forum_016",
    board: "board_archive",
    author: "user_admin",
    title: "关于开展心理健康讲座的通知",
    content: "2019年12月6日下午，学校将在礼堂举办心理健康讲座，主讲人：心理健康辅导室周慧老师。欢迎同学们参加。",
    timestamp: "2019-11-30 10:00",
    views: 640,
    replies: 5
  },
  {
    id: "post_forum_017",
    board: "board_archive",
    author: "user_chawu",
    title: "有人听说过熊娘嘎婆吗",
    content:
      "奶奶给我讲过，说是山里的一种东西，会假装成你最亲的人，骗你开门，然后把你吃掉。\n\n现在应该没人信这个了吧？",
    timestamp: "2021-04-13 22:19",
    views: 987,
    replies: 16,
    tags: ["民俗"],
    extras: ["clue_bear_legend"]
  },
  {
    id: "post_forum_018",
    board: "board_archive",
    author: "user_luguo",
    title: "初中部后山到底能不能去",
    content:
      "听老教师说后山不让去是因为怕出事。有个学长说后山那片林子进去容易迷路，天黑了还会有奇怪的声音。\n\n真的假的？",
    timestamp: "2020-10-09 20:33",
    views: 1120,
    replies: 23
  },
  {
    id: "post_forum_019",
    board: "board_graduate",
    author: "user_touming",
    title: "2019届初中毕业生集合",
    content: "都四年了。想问问大家现在都怎么样了。",
    timestamp: "2023-06-20 21:05",
    views: 534,
    replies: 18
  },
  {
    id: "post_forum_020",
    board: "board_lost",
    author: "user_wanshifu",
    title: "有人捡到我的保温杯吗",
    content: "蓝色，杯盖上贴了“别拿”两个字。",
    timestamp: "2023-10-24 13:27",
    views: 96,
    replies: 2
  },
  {
    id: "post_forum_021",
    board: "board_study",
    author: "user_aizhe",
    title: "求英语作文万能模板",
    content: "周六要交，救救孩子。",
    timestamp: "2023-10-23 19:44",
    views: 285,
    replies: 8
  },
  {
    id: "post_forum_022",
    board: "board_life",
    author: "user_anonym",
    title: "宿舍热水总是不热，报修也没用",
    content: "六楼的水跟凉水没什么区别，有人管管吗。",
    timestamp: "2023-10-22 21:12",
    views: 214,
    replies: 6
  },
  {
    id: "post_forum_023",
    board: "board_gossip",
    author: "user_zhouchen",
    title: "新来的心理老师好温柔",
    content: "周老师人真的好好，跟她聊天感觉很安心。大家有烦恼可以去找她。",
    timestamp: "2023-10-20 17:26",
    views: 389,
    replies: 7
  },
  {
    id: "post_forum_024",
    board: "board_notice",
    author: "user_admin",
    title: "校园安全提示：请勿翻越围墙，勿进入后山区域",
    content:
      "近日发现个别同学在晚自习后翻越围墙。后山区域地形复杂，夜间禁止进入。请同学们注意人身安全。",
    timestamp: "2023-09-18 08:45",
    views: 876,
    replies: 3
  },
  {
    id: "post_forum_025",
    board: "board_life",
    author: "user_kaoya",
    title: "晚自习停电了，好黑",
    content: "教学楼一片黑。有人说是变压器跳闸。摸黑回的宿舍，刺激。",
    timestamp: "2023-10-17 22:01",
    views: 542,
    replies: 10
  },
  {
    id: "post_forum_026",
    board: "board_study",
    author: "user_liutao",
    title: "高二分班名单公示了",
    content: "在公告栏和官网上都能查，大家快去看。",
    timestamp: "2023-10-16 10:30",
    views: 689,
    replies: 14
  }
];

export const forumComments: ForumComment[] = [
  { id: "cmt_forum_001_1", postId: "post_forum_001", author: "user_anonym", floor: 1, timestamp: "2023-11-02 08:52", content: "一路走好。" },
  { id: "cmt_forum_001_2", postId: "post_forum_001", author: "user_liutao", floor: 2, timestamp: "2023-11-02 09:10", content: "有人知道是哪位同学吗？" },
  { id: "cmt_forum_001_3", postId: "post_forum_001", author: "user_wanshifu", floor: 3, timestamp: "2023-11-02 09:41", content: "“个人原因”……真的假的。" },
  { id: "cmt_forum_001_4", postId: "post_forum_001", author: "user_admin", floor: 4, timestamp: "2023-11-02 10:02", content: "请同学们以学校官方发布为准，不要传播未经证实的信息。", isOp: true },
  { id: "cmt_forum_001_5", postId: "post_forum_001", author: "user_zhouchen", floor: 5, timestamp: "2023-11-02 10:31", content: "……" },
  { id: "cmt_forum_001_6", postId: "post_forum_001", author: "user_touming", floor: 6, timestamp: "2023-11-02 11:02", content: "她是我初中同学。她真的不是你们想的那样。" },

  { id: "cmt_forum_002_1", postId: "post_forum_002", author: "user_touming", floor: 1, timestamp: "2023-11-02 09:21", content: "初中部的。后来转去高中部了。挺安静的一个女生。" },
  { id: "cmt_forum_002_2", postId: "post_forum_002", author: "user_anonym", floor: 2, timestamp: "2023-11-02 09:35", content: "是不是以前初中部特别出名的那个……就是会咬手那个。" },
  { id: "cmt_forum_002_3", postId: "post_forum_002", author: "user_wanshifu", floor: 3, timestamp: "2023-11-02 09:58", content: "楼上的，你说的那个是不是叫阿月？我姐提过。" },
  { id: "cmt_forum_002_4", postId: "post_forum_002", author: "user_zhouchen", floor: 4, timestamp: "2023-11-02 10:12", content: "别说了。她人不在了。" },
  { id: "cmt_forum_002_5", postId: "post_forum_002", author: "user_liutao", floor: 5, timestamp: "2023-11-02 10:16", content: "啊这……抱歉。", isOp: true },

  { id: "cmt_forum_003_1", postId: "post_forum_003", author: "user_touming", floor: 1, timestamp: "2019-11-18 22:01", content: "她叫阿月，我们班的。确实……有点吓人。不过她没伤害过任何人。" },
  { id: "cmt_forum_003_2", postId: "post_forum_003", author: "user_anonym", floor: 2, timestamp: "2019-11-18 22:14", content: "有一次她上课突然站起来，盯着窗户外面看了很久，老师叫她都听不见。后来才知道窗外什么都没有。" },
  { id: "cmt_forum_003_3", postId: "post_forum_003", author: "user_luguo", floor: 3, timestamp: "2019-11-18 22:37", content: "有没有人认识她？感觉她需要帮助。", isOp: true },
  { id: "cmt_forum_003_4", postId: "post_forum_003", author: "user_xiaoyu", floor: 4, timestamp: "2019-11-19 07:26", content: "她是我朋友。她很好。请你们别这样说她。" },
  { id: "cmt_forum_003_5", postId: "post_forum_003", author: "user_touming", floor: 5, timestamp: "2019-11-19 07:58", content: "啊，小于也在啊。抱歉抱歉。" },

  { id: "cmt_forum_004_1", postId: "post_forum_004", author: "user_anonym", floor: 1, timestamp: "2021-06-12 16:30", content: "对，小于。两人初一就形影不离。后来确实不怎么一起了。" },
  { id: "cmt_forum_004_2", postId: "post_forum_004", author: "user_xiaoyu", floor: 2, timestamp: "2021-06-12 17:03", content: "我们还一起。只是……有些事说不清楚。" },
  { id: "cmt_forum_004_3", postId: "post_forum_004", author: "user_touming", floor: 3, timestamp: "2021-06-12 17:20", content: "小于！你还在这论坛啊，好久不见。", isOp: true },
  { id: "cmt_forum_004_4", postId: "post_forum_004", author: "user_luguo", floor: 4, timestamp: "2021-06-12 18:02", content: "莫名觉得有点难过。" },

  { id: "cmt_forum_005_1", postId: "post_forum_005", author: "user_anonym", floor: 1, timestamp: "2023-11-02 11:09", content: "楼主说的是真的吗……我初中也见过她一个人说话。" },
  { id: "cmt_forum_005_2", postId: "post_forum_005", author: "user_liutao", floor: 2, timestamp: "2023-11-02 11:15", content: "？？？" },
  { id: "cmt_forum_005_3", postId: "post_forum_005", author: "user_admin", floor: 3, timestamp: "2023-11-02 11:22", content: "该帖已被管理员删除：涉及未经核实的内容，请勿传播。" },
  { id: "cmt_forum_005_4", postId: "post_forum_005", author: "user_zhouchen", floor: 4, timestamp: "2023-11-02 11:23", content: "我没乱说。", isOp: true, quote: "她其实很清醒，比谁都清醒。" },

  { id: "cmt_forum_006_1", postId: "post_forum_006", author: "user_touming", floor: 1, timestamp: "2023-11-03 19:40", content: "月见草就是阿月啊。她论坛名叫月见草，之前叫“晚风过境”。" },
  { id: "cmt_forum_006_2", postId: "post_forum_006", author: "user_luguo", floor: 2, timestamp: "2023-11-03 20:05", content: "她发过一些挺奇怪的帖子，后来又都删了。" },
  { id: "cmt_forum_006_3", postId: "post_forum_006", author: "user_zhouchen", floor: 3, timestamp: "2023-11-03 20:18", content: "她说过一句话：有些事只能写给自己看。" },

  { id: "cmt_forum_007_1", postId: "post_forum_007", author: "user_anonym", floor: 1, timestamp: "2023-11-02 11:34", content: "管理员删的吧。看到删帖记录了。" },
  { id: "cmt_forum_007_2", postId: "post_forum_007", author: "user_admin", floor: 2, timestamp: "2023-11-02 11:45", content: "请同学们理性讨论，不要发布未经核实的内容。" },

  { id: "cmt_forum_008_1", postId: "post_forum_008", author: "user_touming", floor: 1, timestamp: "2023-11-03 20:23", content: "名单的事……好像是有。初中有个什么关注名单。" },
  { id: "cmt_forum_008_2", postId: "post_forum_008", author: "user_anonym", floor: 2, timestamp: "2023-11-03 20:40", content: "她家里出事之前就很奇怪。我一个亲戚是初中的老师，说学校早就知道她不对劲。" },
  { id: "cmt_forum_008_3", postId: "post_forum_008", author: "user_liutao", floor: 3, timestamp: "2023-11-03 20:55", content: "所以公告为什么不写清楚？" },
  { id: "cmt_forum_008_4", postId: "post_forum_008", author: "user_wanshifu", floor: 4, timestamp: "2023-11-03 21:02", content: "不知道。反正我觉得这事没那么简单。", isOp: true },

  { id: "cmt_forum_017_1", postId: "post_forum_017", author: "user_anonym", floor: 1, timestamp: "2021-04-13 22:31", content: "小时候奶奶也讲过，专门骗小孩的。说是会学你妈妈的声音叫门。" },
  { id: "cmt_forum_017_2", postId: "post_forum_017", author: "user_luguo", floor: 2, timestamp: "2021-04-13 22:52", content: "湘西那边好像挺信这个的。我奶奶说遇到这种东西要关门、烧火、撒盐。" },
  { id: "cmt_forum_017_3", postId: "post_forum_017", author: "user_chawu", floor: 3, timestamp: "2021-04-13 23:10", content: "故事而已，大家别当真。", isOp: true },
  { id: "cmt_forum_017_4", postId: "post_forum_017", author: "user_touming", floor: 4, timestamp: "2021-04-14 07:44", content: "这帖子怎么又被顶上来了……我记得原来楼主不是这个ID。" },

  { id: "cmt_forum_009_1", postId: "post_forum_009", author: "user_liutao", floor: 1, timestamp: "2023-10-28 12:45", content: "排队太久了，下次去。" },
  { id: "cmt_forum_010_1", postId: "post_forum_010", author: "user_anonym", floor: 1, timestamp: "2023-10-30 18:52", content: "同麻。", },
  { id: "cmt_forum_013_1", postId: "post_forum_013", author: "user_kaoya", floor: 1, timestamp: "2023-10-26 15:55", content: "冲！我报跳远。" },
  { id: "cmt_forum_018_1", postId: "post_forum_018", author: "user_anonym", floor: 1, timestamp: "2020-10-09 20:45", content: "后山真的别去。我一个表哥初中翻墙进去，半夜才出来，回来发了好几天烧。" },
  { id: "cmt_forum_018_2", postId: "post_forum_018", author: "user_luguo", floor: 2, timestamp: "2020-10-09 21:03", content: "后来就围起来了，好像再没人进去过。", isOp: true },
  { id: "cmt_forum_023_1", postId: "post_forum_023", author: "user_aizhe", floor: 1, timestamp: "2023-10-20 17:40", content: "去过一次，确实很安心。" },
  { id: "cmt_forum_025_1", postId: "post_forum_025", author: "user_anonym", floor: 1, timestamp: "2023-10-17 22:10", content: "当时我就在教学楼，走廊尽头好像站着个人，停电了看不清。" },
  { id: "cmt_forum_025_2", postId: "post_forum_025", author: "user_kaoya", floor: 2, timestamp: "2023-10-17 22:18", content: "别吓人，是值班老师吧。", isOp: true },
  { id: "cmt_forum_025_3", postId: "post_forum_025", author: "user_anonym", floor: 3, timestamp: "2023-10-17 22:25", content: "可能吧。就是一直站在那，没动。" },
  { id: "cmt_forum_024_1", postId: "post_forum_024", author: "user_touming", floor: 1, timestamp: "2023-09-18 09:02", content: "后山晚上确实别去。" },
  { id: "cmt_forum_026_1", postId: "post_forum_026", author: "user_aizhe", floor: 1, timestamp: "2023-10-16 10:44", content: "查到了，和想的分到一起，开心。" }
];

export function getForumUser(id: string): ForumUser {
  return forumUsers.find((u) => u.id === id) ?? forumUsers[forumUsers.length - 1];
}

export function getForumPost(id: string): ForumPost | undefined {
  return forumPosts.find((p) => p.id === id);
}

export function getBoard(id: string): ForumBoard | undefined {
  return forumBoards.find((b) => b.id === id);
}

export function getCommentsForPost(postId: string): ForumComment[] {
  return forumComments
    .filter((c) => c.postId === postId)
    .sort((a, b) => a.floor - b.floor);
}
