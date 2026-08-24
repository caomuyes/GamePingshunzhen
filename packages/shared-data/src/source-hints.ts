export interface SourceHint {
  route: string;
  comment: string;
}

export const sourceHints: SourceHint[] = [
  {
    route: "/forum/thread/post_forum_005",
    comment: "<!-- 原帖（已被管理员删除）：我见过她一个人对着空气说“你又来了”。不是编的。 -->"
  },
  {
    route: "/forum/thread/post_forum_017",
    comment: "<!-- 民俗存档：熊娘嘎婆。火、盐、关门。 -->"
  },
  {
    route: "/school/notice/school_notice_001",
    comment: "<!-- 公告已由管理员编辑过 3 次。最后一次编辑：2023-11-02 22:41 -->"
  },
  {
    route: "/school/downloads",
    comment: "<!-- 注意：部分文件需要权限。 -->"
  },
  {
    route: "/social/user/ayue",
    comment: "<!-- <meta name=\"author\" content=\"ayue\" /> -->"
  },
  {
    route: "/social/user/ayue/notes",
    comment: "<!-- 友情链接：www.yuanmishe.net（此链接已失效？） -->"
  },
  {
    route: "/social/user/ayue/chat/chat_003",
    comment: "<!-- 截图拍摄于 2023-10-29 23:57 -->"
  },
  {
    route: "/yuanmishe/enter",
    comment: "<!-- 提示：通行码 = 论坛用户名 + 生日 + 校庆编号 -->"
  },
  {
    route: "/yuanmishe/thread/yuanmishe_post_031",
    comment: "<!-- 小骨的梯子：走完 3000 才作数。 -->"
  },
  {
    route: "/underworld/entry",
    comment: "<!-- 密钥已生成：9F2A7B-XIONGNIANG -->"
  },
  {
    route: "/underworld/decode",
    comment: "<!-- 档案原始编码：UTF-8。站点曾按 GBK 误读。 -->"
  },
  {
    route: "/underworld/record/underworld_death_001",
    comment: "<!-- 登记时间早于死亡通报 3 天。 -->"
  }
];

export function findSourceHint(pathname: string): string | undefined {
  return sourceHints.find((s) => pathname.startsWith(s.route))?.comment;
}
