import type { SchoolPage } from "./types";

export const schoolName = "平顺镇高中";
export const schoolDomain = "www.pingshunhs.edu.cn";

export const schoolPages: SchoolPage[] = [
  {
    id: "school_page_profile",
    kind: "profile",
    section: "学校简介",
    title: "学校简介",
    date: "2020-03-01",
    content:
      "平顺镇高中创办于1996年，是一所公办全日制普通高级中学。学校坐落于湘西平顺镇，依山而建，校园环境优美。\n\n学校坚持“立德树人”的办学理念，现有教学班42个，在校学生2100余人，教职工160余人。\n\n学校高度重视学生身心健康，设有心理健康辅导室，配备专职心理教师，定期开展心理健康教育活动。",
    author: "校办公室"
  },
  {
    id: "school_news_001",
    kind: "news",
    section: "校园新闻",
    title: "热烈庆祝平顺镇高中建校27周年",
    date: "2023-10-18",
    content:
      "2023年10月18日，平顺镇高中迎来建校27周年。学校举行了简朴而隆重的校庆活动，全体师生参加了升旗仪式和校史回顾展。\n\n校长在致辞中回顾了学校27年来的发展历程，勉励同学们珍惜时光、努力学习。\n\n校庆期间，学校还举办了校友座谈会、校园开放日等活动。",
    author: "校办公室",
    clues: ["clue_school_27"],
    extras: ["school_event_27"]
  },
  {
    id: "school_news_002",
    kind: "news",
    section: "校园新闻",
    title: "我校2023年秋季运动会圆满举行",
    date: "2023-10-20",
    content:
      "10月19日至20日，我校2023年秋季运动会在田径场举行。本次运动会设有田赛、径赛、团体项目等40余个项目，全校师生积极参与。",
    author: "校办公室"
  },
  {
    id: "school_news_003",
    kind: "news",
    section: "校园新闻",
    title: "我校开展教学开放日活动",
    date: "2023-09-22",
    content:
      "为加强家校沟通，我校于9月21日举办教学开放日活动，邀请家长走进课堂，了解学生学习情况。",
    author: "教务处"
  },
  {
    id: "school_news_004",
    kind: "news",
    section: "校园新闻",
    title: "我校与县文化馆联合举办湘西民俗文化展",
    date: "2021-05-12",
    content:
      "为传承优秀传统文化，我校与县文化馆联合举办湘西民俗文化展。展览包括苗族、土家族传统节日、民间故事、生死观念等展板内容，吸引了众多师生参观。",
    author: "德育处"
  },
  {
    id: "school_news_005",
    kind: "news",
    section: "校园新闻",
    title: "2023级新生军训汇报表演",
    date: "2023-08-30",
    content: "2023级新生圆满完成军训任务，在汇报表演中展现了良好的精神风貌。",
    author: "德育处"
  },
  {
    id: "school_news_006",
    kind: "news",
    section: "校园新闻",
    title: "我校2023年高考再创佳绩",
    date: "2023-06-25",
    content: "在全体师生的共同努力下，我校2023年高考成绩再创新高，本科上线人数较去年稳步提升。",
    author: "教务处"
  },
  {
    id: "school_notice_001",
    kind: "notice",
    section: "通知公告",
    title: "关于我校一名学生不幸离世的说明",
    date: "2023-11-02",
    content:
      "2023年10月31日，我校高二年级一名学生不幸离世。经核实，该生系因个人原因离世，家属已办理相关善后事宜。\n\n学校对此深表惋惜，并向逝者家属致以诚挚的慰问。请广大师生、家长尊重逝者，不要传播未经证实的信息。\n\n学校心理健康辅导室为有需要的师生提供心理支持，办公地点：综合楼三楼。\n\n平顺镇高中\n2023年11月2日",
    author: "校办公室",
    hidden: true,
    requiresFlags: ["discoveredAyue", "discoveredXiaoyu"],
    clues: ["clue_school_official"],
    flags: ["foundSchoolEvidence"]
  },
  {
    id: "school_notice_002",
    kind: "notice",
    section: "通知公告",
    title: "国庆节放假及调课安排",
    date: "2023-09-27",
    content: "10月1日至7日放假调休，10月8日（星期日）补周四的课。请同学们合理安排假期学习生活。",
    author: "教务处"
  },
  {
    id: "school_notice_003",
    kind: "notice",
    section: "通知公告",
    title: "2023-2024学年第一学期期中考试安排",
    date: "2023-10-30",
    content: "期中考试定于11月15日至17日进行，具体科目与时间安排见附件。请同学们认真复习备考。",
    author: "教务处"
  },
  {
    id: "school_notice_004",
    kind: "notice",
    section: "通知公告",
    title: "关于开展心理健康教育周活动的通知",
    date: "2019-11-25",
    content:
      "为帮助同学们正确认识心理健康，我校将于12月2日至6日开展心理健康教育周活动，包括专题讲座、心理测评、个别辅导等。欢迎同学们积极参加。\n\n心理健康辅导室：综合楼三楼。",
    author: "德育处"
  },
  {
    id: "school_psych_001",
    kind: "psych",
    section: "心理健康",
    title: "如何识别青少年的异常行为",
    date: "2019-11-28",
    author: "周慧",
    content:
      "青春期是身心快速发展的时期，部分青少年会出现一些让家长和老师担忧的行为。以下情况需要引起重视：\n\n1. 出现自伤行为，如啃咬手指、抓挠皮肤；\n2. 长时间自言自语，或与空气对话；\n3. 回避目光接触，突然的坐立不安；\n4. 外貌短时间内出现明显变化；\n5. 对日常事物失去兴趣，睡眠和饮食紊乱。\n\n需要说明的是，以上行为并不一定意味着心理疾病，但持续出现时，建议及时寻求专业帮助，由家长陪同就医或联系学校心理辅导室。\n\n请多给孩子一些耐心和理解。",
    extras: ["clue_symptoms"]
  },
  {
    id: "school_file_001",
    kind: "file",
    section: "文件下载",
    title: "重点关注学生名单（2020-2021学年）",
    date: "2020-09-15",
    author: "德育处",
    content:
      "平顺镇高中重点关注学生名单（2020-2021学年）\n\n编号：GZ-2020-071\n姓名：阿月\n班级：初中部2019级（2020-2021学年初三）\n\n关注原因：多次出现自伤行为（啃咬手指）、自言自语、回避社交；本人自述“听到声音”。\n\n处理措施：已约谈家长，建议陪同就医；已联系社区关注；在校期间由班主任重点关注。\n\n备注：学生本人拒绝接受心理测评。\n\n（内部资料，请勿外传）",
    hidden: true,
    requiresFlags: ["discoveredAyue", "discoveredXiaoyu"],
    clues: ["clue_concern_list"],
    flags: ["foundSchoolEvidence"],
    file: { name: "重点关注学生名单-2020-2021.docx", size: "46 KB", kind: "docx" }
  },
  {
    id: "school_file_002",
    kind: "file",
    section: "文件下载",
    title: "2023-2024学年第一学期校历",
    date: "2023-09-01",
    content: "2023-2024学年第一学期校历：9月1日开学，1月19日期末考试结束，1月22日起放寒假。",
    file: { name: "校历-2023-2024-1.pdf", size: "312 KB", kind: "pdf" }
  },
  {
    id: "school_file_003",
    kind: "file",
    section: "文件下载",
    title: "学生作息时间表",
    date: "2023-09-01",
    content: "06:30 起床；07:20 早读；08:00 第一节课；12:00 午餐；14:30 下午上课；18:30 晚自习；22:10 熄灯。",
    file: { name: "作息时间表-2023.xlsx", size: "28 KB", kind: "xlsx" }
  },
  {
    id: "school_teacher_001",
    kind: "teacher",
    section: "教师队伍",
    title: "周慧 · 心理健康教师",
    date: "2019-09-01",
    author: "校办公室",
    content:
      "周慧，女，国家二级心理咨询师，2019年9月起在我校心理健康辅导室任职。\n\n辅导室开放时间：周一至周五 12:30-13:30、17:30-18:30。\n\n留言：如果有同学需要帮助，可以来心理辅导室坐坐。如果觉得那不是什么“心理问题”，也可以来。我都会在。"
  },
  {
    id: "school_teacher_002",
    kind: "teacher",
    section: "教师队伍",
    title: "陈建国 · 校长",
    date: "2018-09-01",
    content: "陈建国，男，中学高级教师，现任平顺镇高中校长，负责学校全面工作。",
    author: "校办公室"
  },
  {
    id: "school_teacher_003",
    kind: "teacher",
    section: "教师队伍",
    title: "王丽 · 语文教师",
    date: "2015-09-01",
    content: "王丽，女，中学一级教师，长期担任语文教学工作，现任高二年级语文备课组组长。",
    author: "教务处"
  },
  {
    id: "school_teacher_004",
    kind: "teacher",
    section: "教师队伍",
    title: "李强 · 数学教师",
    date: "2016-09-01",
    content: "李强，男，中学一级教师，现任高一年级数学教师、班主任。",
    author: "教务处"
  },
  {
    id: "school_morality_001",
    kind: "morality",
    section: "德育工作",
    title: "德育工作",
    date: "2020-03-01",
    content:
      "学校德育工作以“立德树人”为根本任务，通过主题班会、社会实践、志愿服务等活动，培养学生良好的道德品质和行为习惯。\n\n学校严格校纪校规，对翻越围墙、夜不归宿等行为进行教育处理，切实保障学生安全。"
  },
  {
    id: "school_culture_001",
    kind: "culture",
    section: "校园文化",
    title: "校园文化",
    date: "2020-03-01",
    content:
      "学校坚持以文化人，通过社团活动、艺术节、读书节等活动丰富校园生活。现有文学社、合唱团、篮球社、心理社等学生社团20余个。"
  },
  {
    id: "school_admission_001",
    kind: "admission",
    section: "招生信息",
    title: "招生信息",
    date: "2023-06-01",
    content: "平顺镇高中2023年秋季计划招收高一新生700人，实行划片招生与择优录取相结合。具体政策请咨询教务处。"
  },
  {
    id: "school_honor_001",
    kind: "honor",
    section: "学校荣誉",
    title: "学校荣誉",
    date: "2023-05-01",
    content: "近年来，学校先后获得“县级文明校园”“平安校园”“教育教学质量先进单位”等荣誉称号。"
  },
  {
    id: "school_archive_001",
    kind: "archive",
    section: "旧版新闻",
    title: "2019级新生报到工作顺利完成",
    date: "2019-09-01",
    content: "2019年9月1日，我校2019级新生报到工作顺利完成。今年共录取新生680人，其中初中部260人，高中部420人。",
    author: "校办公室"
  },
  {
    id: "school_archive_002",
    kind: "archive",
    section: "旧版公告",
    title: "关于后山区域禁止通行的通告",
    date: "2018-04-12",
    content:
      "因后山区域地形复杂、存在安全隐患，经研究决定，即日起封闭后山入口，禁止师生及无关人员进入后山区域。\n\n特此通告。",
    author: "校办公室"
  },
  {
    id: "school_archive_003",
    kind: "safety",
    section: "旧版公告",
    title: "校园安全记录（2020年6月）",
    date: "2020-06-20",
    content:
      "6月14日晚，值班教师巡查时发现一名学生翻越围墙进入后山区域，经查找于当晚22:40在后山入口处找到该生。\n\n该生自述“听到有人叫自己的名字，就走了过去”。经检查身体无碍，已通知家长带回并进行安全教育。",
    author: "保卫处",
    extras: ["clue_hillside"]
  },
  {
    id: "school_archive_004",
    kind: "archive",
    section: "旧版新闻",
    title: "2019年心理健康讲座顺利举行",
    date: "2019-12-06",
    content: "12月6日下午，我校在礼堂举行心理健康讲座，周慧老师主讲，初高中部学生代表参加。",
    author: "校办公室"
  }
];

export function getSchoolPage(id: string): SchoolPage | undefined {
  return schoolPages.find((p) => p.id === id);
}

export const schoolSections = [
  { name: "首页", path: "/school" },
  { name: "校园新闻", path: "/school/news" },
  { name: "通知公告", path: "/school/notices" },
  { name: "学校简介", path: "/school/profile" },
  { name: "教师队伍", path: "/school/teachers" },
  { name: "德育工作", path: "/school/morality" },
  { name: "校园文化", path: "/school/culture" },
  { name: "招生信息", path: "/school/admission" },
  { name: "学校荣誉", path: "/school/honors" },
  { name: "文件下载", path: "/school/downloads" },
  { name: "旧版新闻", path: "/school/archive" }
];
