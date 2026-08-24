import type { TimelineEvent } from "./types";

export const timelineEvents: TimelineEvent[] = [
  {
    id: "timeline_001",
    date: "2019-11",
    title: "初中第一次异常",
    description: "阿月在初中部开始出现咬手指、自言自语等异常行为。",
    evidence: ["post_forum_003", "post_social_ayue_011", "school_psych_001"]
  },
  {
    id: "timeline_002",
    date: "2019-09",
    title: "认识小于",
    description: "阿月与小于相识，两人很快成为形影不离的朋友。",
    evidence: ["post_forum_004", "post_social_xiaoyu_001", "post_social_ayue_001"]
  },
  {
    id: "timeline_003",
    date: "2021-2022",
    title: "熊娘嘎婆影响加深",
    description: "它开始学阿月亲近的人说话，阿月用盐、火与关门压制它。",
    evidence: ["post_social_ayue_011", "post_social_ayue_019", "chat_001", "yuanmishe_post_006"]
  },
  {
    id: "timeline_004",
    date: "2021-2022",
    title: "开始调查",
    description: "阿月阅读旧书、寻访老人，并在源秘社记录自己的附身经历。",
    evidence: ["ayueNotes", "yuanmishe_post_001", "yuanmishe_post_006"]
  },
  {
    id: "timeline_005",
    date: "2022-2023",
    title: "关系逐渐疏远",
    description: "阿月身上的特殊属性减弱，与小于之间的相互吸引逐渐消失。",
    evidence: ["post_social_xiaoyu_009", "post_social_xiaoyu_013", "chat_002"]
  },
  {
    id: "timeline_006",
    date: "2023-07~10",
    title: "死亡计划",
    description: "阿月意识到压制无法解决问题，开始准备自己的最终计划并留下资料。",
    evidence: ["post_social_ayue_029", "post_social_ayue_030", "chat_003", "yuanmishe_post_032"]
  },
  {
    id: "timeline_007",
    date: "2023-10-31",
    title: "死亡",
    description: "阿月将自己绑起来，主动结束生命，把自己与熊娘嘎婆绑在一起。",
    evidence: ["post_forum_001", "school_notice_001", "underworld_death_001", "yuanmishe_post_022"]
  }
];

export const timelineAnswers: Record<string, string[]> = {
  timeline_001: ["2019-11", "2019-10", "2019-12", "2020-03"],
  timeline_002: ["2019-09", "2019-11", "2020-09", "2021-09"],
  timeline_003: ["2021-2022", "2019-2020", "2022-2023", "2020-2021"],
  timeline_004: ["2021-2022", "2020-2021", "2022-2023", "2019-2020"],
  timeline_005: ["2022-2023", "2021-2022", "2019-2020", "2023-2024"],
  timeline_006: ["2023-07~10", "2023-01~03", "2022-07~10", "2023-11"],
  timeline_007: ["2023-10-31", "2023-11-02", "2023-10-30", "2023-10-17"]
};

export const timelineSolutions: Record<string, string> = {
  timeline_001: "2019-11",
  timeline_002: "2019-09",
  timeline_003: "2021-2022",
  timeline_004: "2021-2022",
  timeline_005: "2022-2023",
  timeline_006: "2023-07~10",
  timeline_007: "2023-10-31"
};
