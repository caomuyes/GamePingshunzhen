import type { Character } from "./types";

const ayue: Character = {
  id: "char_ayue",
  slug: "ayue",
  name: "阿月",
  nickname: "月亮不营业",
  username: "ayue",
  avatar: { kind: "moon", bg: "#1a2233", fg: "#f3d9a4", text: "月" },
  bio: "平顺镇高中学生。",
  birthday: "10月17日",
  school: "平顺镇高中",
  classRoom: "高二（2）班",
  status: "deceased"
};

const xiaoyu: Character = {
  id: "char_xiaoyu",
  slug: "xiaoyu",
  name: "小于",
  nickname: "小于小于",
  username: "yuxiaoyu",
  avatar: { kind: "flower", bg: "#3a4a5a", fg: "#cfe7e0", text: "小" },
  bio: "普通高中生。",
  school: "平顺镇高中",
  classRoom: "高二（2）班",
  status: "alive"
};

function mk(
  slug: string,
  name: string,
  nickname: string,
  username: string,
  classRoom: string,
  bio: string,
  bg: string,
  fg: string
): Character {
  return {
    id: "char_" + slug,
    slug,
    name,
    nickname,
    username,
    avatar: { kind: "initials", bg, fg, text: name[0] },
    bio,
    school: "平顺镇高中",
    classRoom,
    status: "alive"
  };
}

const classmates: Character[] = [
  mk("chenyt", "陈雨桐", "雨桐的画本", "chenyt", "高二（3）班", "画画的人。", "#7a9db8", "#fff"),
  mk("whao", "王浩", "篮球浩", "whao", "高二（7）班", "下午四点的球场。", "#b87a4a", "#fff"),
  mk("lina", "李娜", "学习机器", "lina", "高三（2）班", "卷。", "#6b8f6b", "#fff"),
  mk("zhangwei", "张伟", "夜猫子张伟", "zhangwei", "高二（1）班", "打游戏。", "#8a6b9a", "#fff"),
  mk("liuyang", "刘洋", "六弦刘洋", "liuyang", "高一（5）班", "吉他手。", "#9a7a5a", "#fff"),
  mk("yangxue", "杨雪", "雪花酥", "yangxue", "高三（1）班", "追星女孩。", "#c98aa0", "#fff"),
  mk("zhaolei", "赵磊", "睡神", "zhaolei", "高二（4）班", "能睡是福。", "#6a8aa0", "#fff"),
  mk("sunyue", "孙悦", "月月鸟", "sunyue", "高一（2）班", "广播站播音员。", "#a08a5a", "#fff"),
  mk("zhoujie", "周杰", "快门周", "zhoujie", "高二（6）班", "拍照。", "#5a7a9a", "#fff"),
  mk("wuqian", "吴倩", "书虫倩", "wuqian", "高三（4）班", "小说收藏家。", "#8a7a6a", "#fff"),
  mk("zhengke", "郑可", "晨跑郑", "zhengke", "高二（2）班", "跑步打卡。", "#6b9a7a", "#fff"),
  mk("fengxue", "冯雪", "猫奴小雪", "fengxue", "高一（3）班", "猫。", "#c9a06a", "#fff"),
  mk("jiangtao", "蒋涛", "数竞蒋", "jiangtao", "高三（3）班", "数学。", "#4a6a8a", "#fff"),
  mk("hanmei", "韩梅", "泡面艺术家", "hanmei", "高二（5）班", "做饭（泡面）。", "#b88a5a", "#fff"),
  mk("caoyang", "曹阳", "羽毛球曹", "caoyang", "高一（1）班", "羽毛球。", "#5a8a6a", "#fff"),
  mk("xujing", "许静", "日记本", "xujing", "高二（8）班", "写日记。", "#8a8ab0", "#fff"),
  mk("dengkai", "邓凯", "看球的凯", "dengkai", "高三（5）班", "足球。", "#4a8a6a", "#fff"),
  mk("linxiao", "林晓", "番剧小林", "linxiao", "高一（4）班", "追番。", "#a06aa0", "#fff"),
  mk("heyu", "何雨", "雨天不出门", "heyu", "高二（3）班", "喜欢下雨。", "#5a7a8a", "#fff"),
  mk("gaoxiang", "高翔", "看星星的高翔", "gaoxiang", "高三（6）班", "天文社。", "#4a5a8a", "#fff"),
  mk("luoting", "罗婷", "折纸婷", "luoting", "高二（1）班", "折纸。", "#b08ab0", "#fff"),
  mk("songjia", "宋佳", "跳舞的佳佳", "songjia", "高一（6）班", "文艺汇演。", "#c98a6a", "#fff"),
  mk("xieyu", "谢宇", "象棋小谢", "xieyu", "高二（4）班", "楚河汉界。", "#7a6a5a", "#fff"),
  mk("tangtang", "唐糖", "甜度超标", "tangtang", "高一（7）班", "甜品测评。", "#c9a0a0", "#fff"),
  mk("yuyue", "于悦", "图书馆常客", "yuyue", "高二（5）班", "看书。", "#8a9ab0", "#fff"),
  mk("donghao", "董浩", "夜跑董", "donghao", "高三（1）班", "晚自习后的操场。", "#4a7a7a", "#fff"),
  mk("xiaoran", "萧然", "汉服萧然", "xiaoran", "高二（6）班", "古风。", "#9a7a8a", "#fff"),
  mk("chengliang", "程亮", "电脑程", "chengliang", "高一（8）班", "修电脑。", "#5a6a8a", "#fff"),
  mk("caoyu", "曹雨", "种花的曹雨", "caoyu", "高二（2）班", "阳台种花。", "#a08a6a", "#fff"),
  mk("yuanyuan", "袁媛", "钢琴媛", "yuanyuan", "高三（2）班", "琴房。", "#8a6a8a", "#fff"),
  mk("panting", "潘婷", "漫画潘", "panting", "高一（9）班", "漫画。", "#a0a06a", "#fff"),
  mk("houjun", "侯军", "体测第一", "houjun", "高二（7）班", "体育生。", "#6a8a5a", "#fff"),
  mk("jianglin", "姜琳", "练字的姜琳", "jianglin", "高三（3）班", "书法。", "#6a6a8a", "#fff"),
  mk("xiemin", "谢敏", "零食仓库", "xiemin", "高二（8）班", "囤零食。", "#b08a6a", "#fff"),
  mk("yanchen", "严晨", "滑板严晨", "yanchen", "高一（10）班", "滑板。", "#5a8a8a", "#fff"),
  mk("gubei", "顾北", "写故事的北", "gubei", "高二（1）班", "短篇。", "#7a7a9a", "#fff"),
  mk("maodou", "毛豆", "毛豆", "maodou", "高二（4）班", "吃。", "#9a9a5a", "#fff"),
  mk("luofei", "罗飞", "补觉罗飞", "luofei", "高三（4）班", "睡觉。", "#7a8a7a", "#fff"),
  mk("luhang", "陆航", "模型陆航", "luhang", "高一（5）班", "拼模型。", "#5a6a7a", "#fff"),
  mk("xiaqi", "夏琪", "追剧琪", "xiaqi", "高二（3）班", "追剧。", "#c98a8a", "#fff")
];

export const characters: Character[] = [ayue, xiaoyu, ...classmates];

export function getCharacter(id: string): Character {
  return characters.find((c) => c.id === id)!;
}

export function getCharacterBySlug(slug: string): Character | undefined {
  return characters.find((c) => c.slug === slug);
}
