import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  forumBoards,
  forumPosts,
  forumUsers,
  getBoard,
  getCommentsForPost,
  getForumPost,
  getForumUser,
  type ForumPost
} from "@psz/shared-data";
import { ClueGrabber, Avatar, Pagination, TextBlock } from "@psz/shared-ui";
import { useGameStore } from "@psz/game-state";
import "./forum.css";

const PAGE_SIZE = 10;

function ForumHeader() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const playerName = useGameStore((s) => s.playerName);
  return (
    <>
      <div className="forum-header">
        <div className="forum-header-inner">
          <div className="forum-logo">
            平顺镇高中论坛
            <small>bbs.pingshunzhongxue.com</small>
          </div>
          <form
            className="forum-search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate(q.trim() ? `/forum/search?q=${encodeURIComponent(q.trim())}` : "/forum/search");
            }}
          >
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索帖子 / 用户" />
            <button type="submit">搜索</button>
          </form>
          <div className="forum-userbar">{playerName ? `${playerName}，欢迎回来` : "未登录"} · 论坛</div>
        </div>
      </div>
      <div className="forum-nav">
        <div className="forum-nav-inner">
          <Link to="/forum">首页</Link>
          {forumBoards.slice(0, 7).map((b) => (
            <Link key={b.id} to={`/forum/board/${b.id}`}>
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function ForumLayout({ children }: { children: ReactNode }) {
  return (
    <div className="forum-root">
      <ForumHeader />
      <div className="forum-body">
        <div className="forum-main">{children}</div>
        <ForumSidebar />
      </div>
    </div>
  );
}

function ForumSidebar() {
  return (
    <aside className="forum-sidebar">
      <div className="forum-side-box">
        <h3>论坛分区</h3>
        <ul>
          {forumBoards.map((b) => (
            <li key={b.id}>
              <Link to={`/forum/board/${b.id}`}>{b.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="forum-side-box">
        <h3>友情链接</h3>
        <ul>
          <li>
            <Link to="/school">平顺镇高中官网</Link>
          </li>
          <li>
            <Link to="/social">同学录 · 个人空间</Link>
          </li>
        </ul>
      </div>
      <div className="forum-side-box">
        <h3>版规</h3>
        <ul>
          <li>
            <span style={{ padding: "6px 12px", display: "block", fontSize: 12, color: "#6b7684" }}>禁止人身攻击 · 禁止造谣传谣 · 请理性讨论</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function PostRow({ post }: { post: ForumPost }) {
  const author = getForumUser(post.author);
  return (
    <div className={`forum-post-row ${post.pinned ? "forum-pinned" : ""}`}>
      <Avatar spec={author.avatar} size={40} />
      <div>
        <div className="forum-post-title">
          {post.deleted ? (
            <Link to={`/forum/thread/${post.id}`} style={{ color: "#a33" }}>
              【已删除】{post.title}
            </Link>
          ) : (
            <Link to={`/forum/thread/${post.id}`}>{post.title}</Link>
          )}
          {post.pinned && <span className="forum-tag">置顶</span>}
          {post.locked && <span className="forum-tag">锁定</span>}
        </div>
        <div className="forum-post-meta">
          {post.author === "user_admin" ? "校务办" : author.name} · {post.timestamp}
        </div>
      </div>
      <div className="forum-post-stats">
        <div>回复 {post.replies}</div>
        <div>浏览 {post.views}</div>
      </div>
    </div>
  );
}

function HomePage() {
  const general = getBoard("board_general");
  const posts = general ? general.postIds.map((id) => getForumPost(id)!).filter(Boolean) : [];
  const pinned = posts.filter((p) => p.pinned);
  const rest = posts.filter((p) => !p.pinned);
  const [page, setPage] = useState(1);
  const pages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const slice = rest.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div>
      <div className="forum-board-head">校园综合讨论区 · 今日新帖 {forumPosts.length} 篇</div>
      {[...pinned, ...slice].map((p) => (
        <PostRow key={p.id} post={p} />
      ))}
      <Pagination page={page} pageCount={pages} onPage={setPage} />
    </div>
  );
}

function BoardPage() {
  const { boardId } = useParams();
  const board = getBoard(boardId ?? "");
  const [page, setPage] = useState(1);
  if (!board) return <ForumNotFound />;
  const posts = board.postIds.map((id) => getForumPost(id)!).filter(Boolean);
  const pages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  const slice = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <div>
      <div className="forum-board-head">
        {board.name} · {board.description}
      </div>
      {slice.map((p) => (
        <PostRow key={p.id} post={p} />
      ))}
      <Pagination page={page} pageCount={pages} onPage={setPage} />
    </div>
  );
}

function ThreadPage() {
  const { postId } = useParams();
  const post = getForumPost(postId ?? "");
  const [localComments, setLocalComments] = useState<{ id: string; postId: string; author: string; floor: number; timestamp: string; content: string; quote?: string }[]>([]);
  const [draft, setDraft] = useState("");
  const ending = useGameStore((s) => s.endingUnlocked);
  const hiddenStarted = useGameStore((s) => s.hiddenEndingStarted);

  const comments = useMemo(
    () => [...getCommentsForPost(post?.id ?? ""), ...localComments],
    [post?.id, localComments]
  );

  if (!post) return <ForumNotFound />;

  if (post.id === "post_forum_005" && ending === "normal" && !hiddenStarted) {
    return (
      <div className="forum-root">
        <HiddenReveal />
      </div>
    );
  }

  const author = getForumUser(post.author);

  return (
    <div className="forum-thread">
      <ClueGrabber clues={post.clues} flags={post.flags} extras={post.extras} />
      <div className="forum-thread-head">
        <h1>{post.title}</h1>
        <div className="forum-thread-meta">
          <Link to={`/forum/user/${post.author}`} style={{ color: "#2c5b96" }}>
            {author.name}
          </Link>{" "}
          · {post.timestamp} · 浏览 {post.views} · 回复 {post.replies}
          {post.edited && <span> · 最后编辑于 {post.edited.at}</span>}
        </div>
      </div>
      {post.deleted ? (
        <div className="forum-deleted">
          该帖已被{post.deletedBy ?? "管理员"}删除。
          <br />
          删除原因：涉及未经核实的内容。
          <br />
          <span style={{ fontSize: 12, color: "#977" }}>（以下楼层为删除前保留的回复）</span>
        </div>
      ) : (
        <div className="forum-thread-body">
          <TextBlock text={post.content} />
        </div>
      )}
      <div style={{ borderTop: "1px solid #edf1f6" }} />
      {comments.map((c) => (
        <div className="forum-comment" key={c.id}>
          <span className="floor">{c.floor}楼</span>
          <span className="author">{getForumUser(c.author).name}</span> <span style={{ color: "#9aa3b0", fontSize: 11 }}>{c.timestamp}</span>
          {c.quote && <div className="quote">引用：{c.quote}</div>}
          <div style={{ marginTop: 4 }}>{c.content}</div>
        </div>
      ))}
      <div className="forum-reply-box">
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="回复本帖……" />
        <button
          onClick={() => {
            if (!draft.trim()) return;
            setLocalComments((arr) => [...arr, { id: `local_${arr.length}`, postId: post.id, author: "user_anonym", floor: 999 + arr.length, timestamp: "刚刚", content: draft.trim() }]);
            setDraft("");
          }}
        >
          发表回复
        </button>
      </div>
    </div>
  );
}

function HiddenReveal() {
  const [stage, setStage] = useState(0);
  const playerName = useGameStore((s) => s.playerName);
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 3000);
    const t2 = setTimeout(() => {
      useGameStore.getState().setExtra("hiddenRevealed", true);
      setStage(2);
    }, 5800);
    const t3 = setTimeout(() => {
      useGameStore.getState().startHiddenEnding();
      navigate("/underworld/register");
    }, 8500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [navigate]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#06070a",
        color: "#d8dce4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "KaiTi, STKaiti, serif"
      }}
    >
      <div style={{ maxWidth: 560, lineHeight: 2.2, fontSize: 18 }}>
        {stage === 0 && (
          <>
            <div>如果你看到这里，</div>
            <div>说明我失败了。</div>
            <div style={{ marginTop: 30, color: "#7a8494" }}>——阿月</div>
          </>
        )}
        {stage === 1 && (
          <>
            <div>访客身份确认：</div>
            <div style={{ fontSize: 26, color: "#7fb0d0" }}>{playerName || "无名访客"}</div>
          </>
        )}
        {stage === 2 && <div style={{ color: "#5f8fb0" }}>正在前往阴间内部网站……</div>}
      </div>
    </div>
  );
}

function UserPage() {
  const { userId } = useParams();
  const user = forumUsers.find((u) => u.id === userId);
  if (!user) return <ForumNotFound />;
  return (
    <div className="forum-user-profile">
      <ClueGrabber clues={user.id === "user_xiaoyu" ? ["clue_username"] : undefined} />
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <Avatar spec={user.avatar} size={64} />
        <div>
          <div className="name">
            {user.name}
            {user.status === "deleted" && <span className="forum-badge">已注销</span>}
            {user.status === "banned" && <span className="forum-badge">已封禁</span>}
            {user.badges?.map((b) => (
              <span key={b} className="forum-tag">
                {b}
              </span>
            ))}
          </div>
          <div className="username">@{user.username}</div>
        </div>
      </div>
      {user.oldName && (
        <div className="row" style={{ color: "#8a94a3" }}>
          曾用名：{user.oldName}
        </div>
      )}
      <div className="row">注册时间：{user.joined}</div>
      <div className="row">发帖：{user.posts} · 关注者：{user.followers}</div>
      <div className="row" style={{ whiteSpace: "pre-wrap" }}>
        {user.bio || "这个用户很懒，什么都没写。"}
      </div>
      <div className="row" style={{ marginTop: 16, fontSize: 12, color: "#8a94a3" }}>
        TA 发布的帖子：
      </div>
      {forumPosts
        .filter((p) => p.author === user.id)
        .map((p) => (
          <PostRow key={p.id} post={p} />
        ))}
    </div>
  );
}

function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const results = useMemo(() => {
    if (!q) return { posts: [], users: [] };
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    const matchAll = (hay: string) => tokens.every((t) => hay.includes(t));
    const posts = forumPosts.filter((p) => {
      const author = getForumUser(p.author);
      const hay = [p.title, p.content, ...(p.tags ?? []), author.name, author.username, ...(p.extras ?? [])].join(" ").toLowerCase();
      return matchAll(hay);
    });
    const users = forumUsers.filter((u) => matchAll([u.name, u.username, u.bio, u.oldName ?? ""].join(" ").toLowerCase()));
    return { posts, users };
  }, [q]);

  return (
    <div>
      <div className="forum-board-head">
        搜索：{q || "全部"} · 找到 {results.posts.length} 个帖子，{results.users.length} 个用户
      </div>
      {!q && <div className="forum-404">请输入关键词。</div>}
      {q && results.posts.length === 0 && results.users.length === 0 && <div className="forum-404">没有找到相关内容。换个关键词试试？</div>}
      {results.users.length > 0 && (
        <>
          <div className="forum-board-head" style={{ borderTop: "1px solid #d3dce8" }}>
            用户
          </div>
          {results.users.map((u) => (
            <div className="forum-post-row" key={u.id}>
              <Avatar spec={u.avatar} size={40} />
              <div>
                <Link to={`/forum/user/${u.id}`} style={{ color: "#2c5b96", fontWeight: 700 }}>
                  {u.name}
                </Link>
                <span style={{ color: "#8a94a3", fontSize: 12 }}> @{u.username}</span>
                {u.status === "deleted" && <span className="forum-badge">已注销</span>}
              </div>
              <div className="forum-post-stats">发帖 {u.posts}</div>
            </div>
          ))}
        </>
      )}
      {results.posts.length > 0 && (
        <>
          <div className="forum-board-head" style={{ borderTop: "1px solid #d3dce8" }}>
            帖子
          </div>
          {results.posts.map((p) => (
            <PostRow key={p.id} post={p} />
          ))}
        </>
      )}
      <div style={{ fontSize: 12, color: "#8a94a3", padding: 10 }}>搜索结果基于关键词匹配。部分内容可能已被删除或隐藏。</div>
    </div>
  );
}

function ForumNotFound() {
  return <div className="forum-404">该帖子不存在，或已被删除。</div>;
}

export function ForumHomePage() {
  return (
    <ForumLayout>
      <HomePage />
    </ForumLayout>
  );
}

export function ForumBoardPage() {
  return (
    <ForumLayout>
      <BoardPage />
    </ForumLayout>
  );
}

export function ForumThreadPage() {
  return (
    <ForumLayout>
      <ThreadPage />
    </ForumLayout>
  );
}

export function ForumUserPage() {
  return (
    <ForumLayout>
      <UserPage />
    </ForumLayout>
  );
}

export function ForumSearchPage() {
  return (
    <ForumLayout>
      <SearchPage />
    </ForumLayout>
  );
}

export function ForumNotFoundPage() {
  return (
    <ForumLayout>
      <ForumNotFound />
    </ForumLayout>
  );
}

const ForumApp = { ForumHomePage, ForumBoardPage, ForumThreadPage, ForumUserPage, ForumSearchPage, ForumNotFoundPage };
export default ForumApp;
