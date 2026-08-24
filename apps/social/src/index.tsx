import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ayueNotes,
  chatLogs,
  characters,
  getCharacter,
  getCharacterBySlug,
  getSocialPost,
  getSocialPostsByAuthor,
  socialPosts,
  timelineAnswers,
  timelineEvents
} from "@psz/shared-data";
import { checkTimeline, completePuzzle, grantCluesAndFlags, requirementsMet, applyRewards } from "@psz/puzzle-engine";
import { Avatar, ClueGrabber, Pagination, useVisit } from "@psz/shared-ui";
import { useGameStore } from "@psz/game-state";
import "./social.css";

const PAGE_SIZE = 8;

function SocialNav() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <div className="social-nav">
      <Link to="/social">小窝首页</Link>
      <Link to="/social/user/ayue">月亮的窝</Link>
      <Link to="/social/user/xiaoyu">小于的小屋</Link>
      <Link to="/social/archive">按年份归档</Link>
      <form
        style={{ marginLeft: "auto", display: "flex", gap: 4 }}
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/social/search?q=${encodeURIComponent(q.trim())}`);
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索空间"
          style={{ width: 130, padding: "2px 6px", fontSize: 12, border: "1px solid #b8a0c0" }}
        />
        <button type="submit" style={{ fontSize: 12, padding: "2px 8px" }}>
          搜索
        </button>
      </form>
    </div>
  );
}

function SocialShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="social-root">
      <div className="social-stars" />
      <div className="social-shell">
        <div className="social-window">
          <div className="social-titlebar">
            <span>☆ {title} ☆</span>
            <span className="dots">
              <span style={{ background: "#e8b4b4" }} />
              <span style={{ background: "#e8dcb4" }} />
              <span style={{ background: "#b4e8c4" }} />
            </span>
          </div>
          <SocialNav />
          <div className="social-marquee">♪ 欢迎来到平顺镇同学录 · 我们一直都在 ♪</div>
          <div className="social-content">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SocialHome() {
  return (
    <SocialShell title="平顺镇同学录">
      <div style={{ textAlign: "center", padding: "12px 0 18px" }}>
        <div style={{ fontSize: 26, fontWeight: 700, color: "#4a2a5a" }}>平顺镇同学录</div>
        <div style={{ fontSize: 13, color: "#8a6a96", margin: "6px 0 18px" }}>
          欢迎来到平顺镇同学录，共 {characters.length} 位住户。点开任意一位串串门吧。
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))", gap: 12 }}>
        {characters.map((c) => (
          <Link key={c.id} to={`/social/user/${c.slug}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#f7f3ef",
                border: "2px solid #6a4a7a",
                borderRadius: 8,
                padding: 14,
                textAlign: "center",
                height: "100%"
              }}
            >
              <Avatar spec={c.avatar} size={56} />
              <div style={{ fontWeight: 700, color: "#4a2a5a", marginTop: 8, fontSize: 14 }}>{c.nickname}</div>
              <div style={{ fontSize: 11, color: "#8a6a96" }}>
                {c.name} · {c.classRoom ?? "毕业生"}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div style={{ marginTop: 22, fontSize: 12, color: "#9a8aa2", textAlign: "center" }}>
        友情链接：<Link to="/yuanmishe" style={{ color: "#6a4a7a" }}>源秘社</Link> · <Link to="/forum" style={{ color: "#6a4a7a" }}>校园论坛</Link>
      </div>
    </SocialShell>
  );
}

function ProfilePage() {
  const { userId } = useParams();
  const visits = useVisit(`/social/user/${userId ?? ""}`);
  const [page, setPage] = useState(1);
  const character = getCharacterBySlug(userId ?? "");
  if (!character) {
    return (
      <SocialShell title="找不到">
        <div className="social-404">这个空间不存在。</div>
      </SocialShell>
    );
  }
  const isAyue = character.id === "char_ayue";
  const isXiaoyu = character.id === "char_xiaoyu";
  const posts = getSocialPostsByAuthor(character.id);
  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalLikes = posts.reduce((acc, p) => acc + p.likes, 0);

  return (
    <SocialShell title={isAyue ? "月亮的窝" : isXiaoyu ? "小于的小屋" : `${character.name}的小屋`}>
      <ClueGrabber clues={isAyue ? ["clue_birthday"] : isXiaoyu ? ["clue_username"] : undefined} />
      <div style={{ fontSize: 12, color: "#9a8aa2", marginBottom: 10 }}>
        <Link to="/social" style={{ color: "#6a4a7a" }}>
          ← 返回同学录
        </Link>
      </div>
      <div className="social-profile-head">
        <Avatar spec={character.avatar} size={72} />
        <div>
          <div className="social-profile-name">
            {character.name}
            {isAyue && <span style={{ fontSize: 12, color: "#b06a6a", marginLeft: 8 }}>账号未更新</span>}
          </div>
          <div className="social-profile-meta">
            @{character.username} · {character.classRoom ?? "毕业生"} · {character.school}
          </div>
          {character.birthday && <div className="social-profile-meta">生日 {character.birthday}</div>}
          <div className="social-profile-meta">{character.bio}</div>
          {isAyue && (
            <div className="social-profile-meta" style={{ marginTop: 4 }}>
              <Link to="/social/user/ayue/notes" style={{ color: "#8a3a5a", textDecoration: "underline" }}>
                【我的笔记】
              </Link>
              <span> · </span>
              <Link to="/social/user/ayue/timeline" style={{ color: "#8a3a5a", textDecoration: "underline" }}>
                【整理时间线】
              </Link>
            </div>
          )}
        </div>
        <div className="social-stats">
          <div>
            <b>{posts.length}</b>
            动态
          </div>
          <div>
            <b>{totalLikes}</b>
            获赞
          </div>
          <div>
            <b>{isAyue ? 3 : 2}</b>
            来访
          </div>
        </div>
      </div>

      {isAyue && visits >= 2 && (
        <div className="social-visitor">
          最近来访：小于、{visits >= 3 ? "无名访客、你自己" : "无名访客"}
          {visits >= 3 && <span style={{ color: "#b06a6a" }}>（这个账号最近被查看了很多次。）</span>}
        </div>
      )}
      {isXiaoyu && visits >= 2 && <div className="social-visitor">最近来访：你。这个空间的主人偶尔回来看看。</div>}
      {!isAyue && !isXiaoyu && visits >= 2 && <div className="social-visitor">最近来访：你。这位住户的日常还在更新。</div>}

      {slice.map((p) => (
        <SocialPostCard key={p.id} postId={p.id} />
      ))}
      <Pagination page={page} pageCount={pages} onPage={setPage} />
      {isAyue && (
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 12, color: "#9a8aa2" }}>
          <Link to="/social/user/ayue/chat/chat_001" style={{ color: "#6a4a7a" }}>
            查看聊天记录截图
          </Link>
          {" · "}
          <Link to="/social/user/ayue/chat/chat_002" style={{ color: "#6a4a7a" }}>
            更多
          </Link>
          {" · "}
          <Link to="/social/user/ayue/chat/chat_003" style={{ color: "#6a4a7a" }}>
            最后一段
          </Link>
        </div>
      )}
    </SocialShell>
  );
}

function SocialPostCard({ postId }: { postId: string }) {
  const post = getSocialPost(postId);
  if (!post) return null;
  const author = getCharacter(post.author);
  return (
    <div className="social-post">
      <ClueGrabber clues={post.clues} flags={post.flags} extras={post.extras} />
      <div className="social-post-head">
        <Avatar spec={author.avatar} size={36} />
        <div>
          <div className="social-post-name">{author.name}</div>
          <div className="social-post-time">{post.timestamp}</div>
        </div>
        <Link to={`/social/user/${post.author === "char_ayue" ? "ayue" : "xiaoyu"}/post/${post.id}`} style={{ marginLeft: "auto", fontSize: 11, color: "#9a8aa2" }}>
          查看详情
        </Link>
      </div>
      <div className="social-post-body">{post.content}</div>
      {post.images && (
        <div className="social-post-imgs">
          {post.images.map((img, i) => (
            <div key={i} className={`social-img ${img.startsWith("photo") ? "photo" : "broken"}`}>
              {img.startsWith("photo") ? <span>{img.replace("photo:", "")}</span> : <span />}
            </div>
          ))}
        </div>
      )}
      <div className="social-post-foot">
        <span>♥ {post.likes}</span>
        <span>评论 {post.comments?.length ?? 0}</span>
        {post.repost && <span>转发</span>}
      </div>
      {post.comments?.slice(0, 2).map((c) => (
        <div className="social-comment" key={c.id}>
          <b>{c.author}</b>：{c.content}
        </div>
      ))}
    </div>
  );
}

function PostDetailPage() {
  const { userId, postId } = useParams();
  const post = getSocialPost(postId ?? "");
  if (!post) {
    return (
      <SocialShell title="动态不存在">
        <div className="social-404">这条动态不存在，可能已被删除。</div>
      </SocialShell>
    );
  }
  const author = getCharacter(post.author);
  return (
    <SocialShell title="动态详情">
      <div className="social-post">
        <ClueGrabber clues={post.clues} flags={post.flags} extras={post.extras} />
        <div className="social-post-head">
          <Avatar spec={author.avatar} size={36} />
          <div>
            <div className="social-post-name">{author.name}</div>
            <div className="social-post-time">{post.timestamp}</div>
          </div>
        </div>
        <div className="social-post-body">{post.content}</div>
        <div className="social-post-foot">
          <span>♥ {post.likes}</span>
          <span>评论 {post.comments?.length ?? 0}</span>
        </div>
        {post.comments?.map((c) => (
          <div className="social-comment" key={c.id}>
            <b>{c.author}</b>：{c.content}
            <span style={{ color: "#b0a0b4", fontSize: 10 }}> · {c.timestamp}</span>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 10 }}>
        <Link to={`/social/user/${userId ?? ""}`} style={{ color: "#6a4a7a", fontSize: 13 }}>
          ← 返回空间
        </Link>
      </div>
    </SocialShell>
  );
}

function NotesPage() {
  return (
    <SocialShell title="我的笔记">
      <ClueGrabber clues={ayueNotes.clues} flags={ayueNotes.flags} />
      <div className="social-notes">
        <h1>{ayueNotes.title}</h1>
        <div style={{ textAlign: "center", fontSize: 13, color: "#9a8a8a", marginBottom: 14 }}>{ayueNotes.subtitle}</div>
        {ayueNotes.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div style={{ textAlign: "right", marginTop: 14 }}>
          —— <b>阿月</b>
        </div>
        <div style={{ textAlign: "center", marginTop: 18, fontSize: 12, color: "#8a7a6a" }}>
          <Link to="/yuanmishe" style={{ color: "#6a4a2a" }}>
            去源秘社（www.yuanmishe.net）
          </Link>
        </div>
      </div>
    </SocialShell>
  );
}

function ChatPage() {
  const { chatId } = useParams();
  const chat = chatLogs.find((c) => c.id === chatId);
  if (!chat) {
    return (
      <SocialShell title="截图不存在">
        <div className="social-404">聊天记录不存在。</div>
      </SocialShell>
    );
  }
  return (
    <SocialShell title={chat.title}>
      <ClueGrabber clues={chat.clues} />
      <div className="social-chat">
        <div className="social-chat-head">阿月 与 小于 的对话 · {chat.date}</div>
        <div className="social-chat-body">
          {chat.messages.map((m) => (
            <div key={m.id} className={`chat-msg ${m.from === "char_ayue" ? "ayue" : "xiaoyu"}`}>
              <div>
                <div className="chat-bubble">{m.content}</div>
                <div className="chat-time">{m.from === "char_ayue" ? "阿月" : "小于"} {m.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: 12, fontSize: 12, color: "#9a8aa2" }}>
        （截图由小于提供。拍摄时间见网页源代码。）
      </div>
    </SocialShell>
  );
}

function TimelinePuzzlePage() {
  const state = useGameStore.getState();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<"ok" | "wrong" | "locked" | null>(null);
  const required = ["clue_001", "clue_002", "clue_003", "clue_004", "clue_005"];
  const hasEvidence = requirementsMet(state, required);
  const foundCount = required.filter((r) => state.discoveredClues.includes(r)).length;

  const submit = () => {
    if (!hasEvidence) {
      setResult("locked");
      return;
    }
    const res = checkTimeline(answers);
    if (res.ok) {
      applyRewards(["reconstructedTimeline"]);
      completePuzzle("puzzle_018");
      setResult("ok");
    } else {
      setResult("wrong");
      setMessage(`还有 ${res.wrong.length} 个事件的位置不对。`);
    }
  };

  return (
    <SocialShell title="整理时间线">
      <div className="timeline-puzzle">
        <div style={{ fontWeight: 700, color: "#4a2a5a", fontSize: 18, marginBottom: 6 }}>阿月的时间线</div>
        <div style={{ fontSize: 13, color: "#8a6a96", marginBottom: 12 }}>
          把七个关键事件放到正确的时间位置。线索散落在论坛、官网与动态里。已掌握证据 {foundCount}/5。
        </div>
        {!hasEvidence && (
          <div className="social-visitor" style={{ color: "#a45a5a" }}>
            证据不足：请先找到「阿月死亡」「小于」「初中异常」「熊娘嘎婆」「主动调查」相关线索。
          </div>
        )}
        {timelineEvents.map((ev) => (
          <div className="timeline-event" key={ev.id}>
            <div style={{ fontWeight: 700 }}>{ev.title}</div>
            <div style={{ fontSize: 12, color: "#8a6a96", margin: "4px 0" }}>{ev.description}</div>
            <div style={{ fontSize: 12, color: "#b0a0b4" }}>证据：{ev.evidence.join("、")}</div>
            <div>
              时间：
              <select value={answers[ev.id] ?? ""} onChange={(e) => setAnswers((a) => ({ ...a, [ev.id]: e.target.value }))}>
                <option value="">请选择</option>
                {timelineAnswers[ev.id].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
        <button
          onClick={submit}
          style={{ width: "100%", padding: 10, background: "#6a4a7a", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 15 }}
        >
          提交时间线
        </button>
        {result === "ok" && (
          <div className="social-visitor" style={{ color: "#3a7a4a", borderColor: "#8ab88a" }}>
            时间线还原成功。阿月的故事完整了：认识小于 → 第一次异常 → 影响加深 → 开始调查 → 关系疏远 → 死亡计划 → 死亡。
          </div>
        )}
        {result === "wrong" && (
          <div className="social-visitor" style={{ color: "#a45a5a" }}>
            {message} 再对照一下证据。
          </div>
        )}
        {result === "locked" && <div className="social-visitor" style={{ color: "#a45a5a" }}>证据不足，暂时无法提交。</div>}
      </div>
    </SocialShell>
  );
}

function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const results = useMemo(() => {
    if (!q) return [];
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    return socialPosts.filter((p) => {
      const author = getCharacter(p.author);
      const hay = [p.content, author.name, author.nickname, author.username].join(" ").toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [q]);
  return (
    <SocialShell title="搜索">
      <div style={{ fontSize: 13, color: "#8a6a96", marginBottom: 12 }}>搜索「{q || "—"}」：找到 {results.length} 条动态</div>
      {results.length === 0 && <div className="social-404">没有找到相关动态。</div>}
      {results.map((p) => (
        <SocialPostCard key={p.id} postId={p.id} />
      ))}
    </SocialShell>
  );
}

function ArchivePage() {
  const years = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const p of socialPosts) {
      const year = p.timestamp.slice(0, 4);
      map.set(year, [...(map.get(year) ?? []), p.id]);
    }
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  }, []);
  return (
    <SocialShell title="按年份归档">
      {years.map(([year, ids]) => (
        <div key={year} style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: "#4a2a5a", borderBottom: "1px solid #c8a8d0", marginBottom: 8 }}>{year}年</div>
          {ids.map((id) => {
            const p = getSocialPost(id)!;
            const author = getCharacter(p.author);
            return (
              <div key={id} style={{ fontSize: 13, margin: "4px 0" }}>
                <span style={{ color: "#9a8aa2" }}>{p.timestamp.slice(5, 16)}</span> {author.name}：{p.content.slice(0, 36)}
                {p.content.length > 36 ? "…" : ""}
              </div>
            );
          })}
        </div>
      ))}
    </SocialShell>
  );
}

export function SocialHomePage() {
  return <SocialHome />;
}

export function SocialProfilePage() {
  return <ProfilePage />;
}

export function SocialPostDetailPage() {
  return <PostDetailPage />;
}

export function SocialNotesPage() {
  return <NotesPage />;
}

export function SocialTimelinePage() {
  return <TimelinePuzzlePage />;
}

export function SocialChatPage() {
  return <ChatPage />;
}

export function SocialSearchPage() {
  return <SearchPage />;
}

export function SocialArchivePage() {
  return <ArchivePage />;
}

export function SocialNotFoundPage() {
  return (
    <SocialShell title="找不到">
      <div className="social-404">这个页面不存在。</div>
    </SocialShell>
  );
}

const SocialApp = { SocialHomePage, SocialProfilePage, SocialPostDetailPage, SocialNotesPage, SocialTimelinePage, SocialChatPage, SocialSearchPage, SocialArchivePage, SocialNotFoundPage };
export default SocialApp;
