export interface AvatarSpec {
  kind: "initials" | "silhouette" | "skeleton" | "flower" | "moon" | "broken";
  bg: string;
  fg: string;
  text?: string;
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  nickname: string;
  username: string;
  avatar: AvatarSpec;
  bio: string;
  birthday?: string;
  school?: string;
  classRoom?: string;
  status: "alive" | "deceased" | "unknown" | "ghost";
}

export interface ForumUser {
  id: string;
  name: string;
  username: string;
  joined: string;
  posts: number;
  followers: number;
  bio: string;
  avatar: AvatarSpec;
  status: "active" | "deleted" | "banned";
  oldName?: string;
  badges?: string[];
}

export interface ForumPost {
  id: string;
  board: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  views: number;
  replies: number;
  pinned?: boolean;
  deleted?: boolean;
  deletedBy?: string;
  edited?: { at: string; note?: string };
  locked?: boolean;
  tags?: string[];
  clues?: string[];
  flags?: string[];
  extras?: string[];
  requiresFlags?: string[];
}

export interface ForumComment {
  id: string;
  postId: string;
  author: string;
  floor: number;
  timestamp: string;
  content: string;
  deleted?: boolean;
  quote?: string;
  edited?: boolean;
  isOp?: boolean;
}

export interface ForumBoard {
  id: string;
  name: string;
  description: string;
  postIds: string[];
}

export interface SchoolPage {
  id: string;
  kind:
    | "news"
    | "notice"
    | "profile"
    | "teacher"
    | "morality"
    | "culture"
    | "admission"
    | "honor"
    | "download"
    | "archive"
    | "safety"
    | "psych"
    | "file";
  section: string;
  title: string;
  date?: string;
  content: string;
  author?: string;
  hidden?: boolean;
  deleted?: boolean;
  clues?: string[];
  flags?: string[];
  extras?: string[];
  requiresFlags?: string[];
  file?: { name: string; size: string; kind: string };
}

export interface SocialComment {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

export interface SocialPost {
  id: string;
  author: string;
  timestamp: string;
  content: string;
  images?: string[];
  comments?: SocialComment[];
  repost?: string;
  clues?: string[];
  flags?: string[];
  extras?: string[];
  likes: number;
  deleted?: boolean;
}

export interface ChatMessage {
  id: string;
  from: "char_ayue" | "char_xiaoyu";
  content: string;
  time: string;
}

export interface ChatLog {
  id: string;
  title: string;
  date: string;
  clues?: string[];
  flags?: string[];
  messages: ChatMessage[];
}

export interface YuanmisheUser {
  id: string;
  name: string;
  username: string;
  joined: string;
  bio: string;
  avatar: AvatarSpec;
  kind: "human" | "ghost" | "unknown";
}

export interface YuanmishePost {
  id: string;
  board: string;
  author: string;
  title: string;
  content: string;
  timestamp: string;
  locked?: boolean;
  weird?: boolean;
  pinned?: boolean;
  deleted?: boolean;
  clues?: string[];
  flags?: string[];
  extras?: string[];
  requiresFlags?: string[];
}

export interface YuanmisheBoard {
  id: string;
  name: string;
  description: string;
  locked: boolean;
  postIds: string[];
}

export type UnderworldRecordKind =
  | "ghost_post"
  | "death_record"
  | "system_log"
  | "trade"
  | "ritual"
  | "notice"
  | "chat"
  | "blog"
  | "code"
  | "register";

export interface UnderworldRecord {
  id: string;
  kind: UnderworldRecordKind;
  section: string;
  title?: string;
  author?: string;
  timestamp?: string;
  content: string;
  garbled?: boolean;
  terminal?: boolean;
  clues?: string[];
  flags?: string[];
  extras?: string[];
  requiresFlags?: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  evidence: string[];
}

export type PuzzleType =
  | "password"
  | "encoding"
  | "timeline"
  | "source"
  | "url"
  | "cross-site"
  | "minigame"
  | "logic";

export interface PuzzleDef {
  id: string;
  type: PuzzleType;
  title: string;
  description: string;
  location: string;
  requirements: string[];
  solution: string[];
  rewards: string[];
  hints: [string, string, string];
}

export interface MinigameEvent {
  score: number;
  event: string;
  label: string;
}

export interface MinigameConfig {
  gravity: number;
  jumpVelocity: number;
  baseSpeed: number;
  maxSpeed: number;
  speedStep: number;
  obstacleGapMin: number;
  obstacleGapMax: number;
  betTarget: number;
  events: MinigameEvent[];
}
