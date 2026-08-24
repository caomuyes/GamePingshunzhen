import { ayueNotes, chatLogs, socialPosts } from "./social";
import { forumPosts } from "./forum";
import { schoolPages } from "./school";
import { yuanmishePosts } from "./yuanmishe";
import { underworldRecords } from "./underworld";

export const allClueIds: string[] = Array.from(
  new Set([
    ...forumPosts.flatMap((p) => [...(p.clues ?? []), ...(p.extras ?? [])]),
    ...schoolPages.flatMap((p) => [...(p.clues ?? []), ...(p.extras ?? [])]),
    ...socialPosts.flatMap((p) => [...(p.clues ?? []), ...(p.extras ?? [])]),
    ...chatLogs.flatMap((c) => c.clues ?? []),
    ...ayueNotes.clues,
    ...yuanmishePosts.flatMap((p) => [...(p.clues ?? []), ...(p.extras ?? [])]),
    ...underworldRecords.flatMap((r) => [...(r.clues ?? []), ...(r.extras ?? [])])
  ])
);
