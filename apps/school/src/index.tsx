import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  getSchoolPage,
  schoolPages,
  schoolSections,
  schoolName,
  type SchoolPage
} from "@psz/shared-data";
import { ClueGrabber, TextBlock } from "@psz/shared-ui";
import { useGameStore } from "@psz/game-state";
import { requirementsMet } from "@psz/puzzle-engine";
import "./school.css";

function canSeeHidden(state: ReturnType<typeof useGameStore.getState>) {
  return requirementsMet(state, ["discoveredAyue", "discoveredXiaoyu", "clue_003"]);
}

function SchoolHeader() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <div className="school-topbar">
        <div className="school-topbar-inner">
          <span>今天是 2023年11月5日 星期日</span>
          <span>设为首页 | 加入收藏</span>
        </div>
      </div>
      <div className="school-header">
        <div className="school-header-inner">
          <div className="school-logo">平</div>
          <div>
            <div className="school-title">
              {schoolName}
              <small>PINGSHUNZHEN SENIOR HIGH SCHOOL</small>
            </div>
          </div>
          <form
            className="school-search"
            style={{ marginLeft: "auto" }}
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/school/search?q=${encodeURIComponent(q.trim())}`);
            }}
          >
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="站内搜索" />
            <button type="submit">搜索</button>
          </form>
        </div>
      </div>
      <div className="school-nav">
        <div className="school-nav-inner">
          {schoolSections.map((s) => (
            <Link key={s.path} to={s.path}>
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function SchoolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="school-root">
      <SchoolHeader />
      <div className="school-body">
        <div className="school-main">{children}</div>
        <SchoolSidebar />
      </div>
      <div className="school-footer">版权所有 © 平顺镇高中 · 地址：湘西平顺镇育才路1号 · 联系电话：0743-88XXXXX</div>
    </div>
  );
}

function SchoolSidebar() {
  return (
    <aside className="school-side">
      <div className="school-side-box">
        <h3>通知公告</h3>
        <ul>
          {schoolPages
            .filter((p) => p.kind === "notice" && !p.hidden)
            .slice(0, 5)
            .map((p) => (
              <li key={p.id}>
                <Link to={`/school/notice/${p.id}`}>{p.title}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="school-side-box">
        <h3>友情链接</h3>
        <ul>
          <li>
            <Link to="/forum">校园论坛</Link>
          </li>
          <li>
            <Link to="/social">同学录 · 个人空间</Link>
          </li>
        </ul>
      </div>
      <div className="school-side-box">
        <h3>心理健康</h3>
        <ul>
          <li>
            <Link to="/school/page/school_psych_001">如何识别青少年的异常行为</Link>
          </li>
          <li>
            <Link to="/school/page/school_teacher_001">周慧老师</Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

function SchoolHome() {
  const news = schoolPages.filter((p) => p.kind === "news").slice(0, 5);
  const notices = schoolPages.filter((p) => p.kind === "notice" && !p.hidden).slice(0, 4);
  return (
    <div>
      <h1>欢迎访问{schoolName}网站</h1>
      <div className="school-article-body">
        平顺镇高中创办于1996年，坐落于湘西平顺镇。学校坚持立德树人，注重学生全面发展。
      </div>
      <h2>校园新闻</h2>
      {news.map((p) => (
        <div className="school-news-item" key={p.id}>
          <Link to={`/school/news/${p.id}`}>{p.title}</Link>
          <span className="date">{p.date}</span>
        </div>
      ))}
      <h2>通知公告</h2>
      {notices.map((p) => (
        <div className="school-news-item" key={p.id}>
          <Link to={`/school/notice/${p.id}`}>{p.title}</Link>
          <span className="date">{p.date}</span>
        </div>
      ))}
    </div>
  );
}

function SchoolList({ kind, title }: { kind: SchoolPage["kind"]; title: string }) {
  const items = schoolPages.filter((p) => p.kind === kind && !p.hidden);
  return (
    <div>
      <h1>{title}</h1>
      {items.map((p) => (
        <div className="school-news-item" key={p.id}>
          <Link to={kind === "notice" ? `/school/notice/${p.id}` : `/school/news/${p.id}`}>{p.title}</Link>
          <span className="date">{p.date}</span>
        </div>
      ))}
    </div>
  );
}

function SchoolArticle() {
  const { id } = useParams();
  const page = getSchoolPage(id ?? "");
  const state = useGameStore.getState();
  if (!page) return <SchoolNotFound />;
  if (page.requiresFlags && !requirementsMet(state, page.requiresFlags)) {
    return (
      <div className="school-gate">
        <ClueGrabber />
        <div style={{ fontSize: 20, marginBottom: 10 }}>404</div>
        <div>您访问的页面不存在，或您没有查看权限。</div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 20 }}>（如果这是学校公告，请先在校园论坛确认相关信息。）</div>
      </div>
    );
  }
  return (
    <div>
      <ClueGrabber clues={page.clues} flags={page.flags} extras={page.extras} />
      <h1>{page.title}</h1>
      <div className="school-article-meta">
        发布部门：{page.author ?? "校办公室"} · 发布时间：{page.date ?? "—"}
      </div>
      <div className="school-article-body">
        <TextBlock text={page.content} />
        {page.file && (
          <div className="school-file">
            附件：{page.file.name}（{page.file.size}） · <Link to={`/school/file/${page.id}`}>在线查看</Link>
          </div>
        )}
      </div>
    </div>
  );
}

function SchoolDownloads() {
  const files = schoolPages.filter((p) => p.kind === "file");
  const state = useGameStore.getState();
  return (
    <div>
      <h1>文件下载</h1>
      {files.map((p) => {
        const locked = p.requiresFlags && !requirementsMet(state, p.requiresFlags);
        return (
          <div className="school-news-item" key={p.id}>
            {locked ? (
              <span style={{ color: "#999" }}>{p.file?.name ?? p.title}（暂无权限）</span>
            ) : (
              <Link to={`/school/file/${p.id}`}>{p.file?.name ?? p.title}</Link>
            )}
            <span className="date">{p.file?.size ?? ""}</span>
          </div>
        );
      })}
    </div>
  );
}

function SchoolArchive() {
  const archive = schoolPages.filter((p) => p.kind === "archive" || p.kind === "safety");
  return (
    <div>
      <h1>旧版新闻 / 历史公告</h1>
      <div style={{ fontSize: 12, color: "#8a949e", marginBottom: 10 }}>以下为学校网站历史归档内容，仅供查阅。</div>
      {archive.map((p) => (
        <div className="school-news-item" key={p.id}>
          <Link to={`/school/page/${p.id}`}>{p.title}</Link>
          <span className="date">{p.date}</span>
        </div>
      ))}
    </div>
  );
}

function SchoolSearch() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const results = useMemo(() => {
    if (!q) return [];
    const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
    return schoolPages.filter((p) => {
      const hay = [p.title, p.content, p.section].join(" ").toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [q]);
  return (
    <div>
      <h1>站内搜索</h1>
      {!q && <div className="school-gate">请输入关键词。</div>}
      {q && results.length === 0 && <div className="school-gate">没有找到与「{q}」相关的内容。</div>}
      {results.map((p) => (
        <div className="school-news-item" key={p.id}>
          <Link to={`/school/${p.kind === "notice" ? "notice" : p.kind === "file" ? "file" : "page"}/${p.id}`}>{p.title}</Link>
          <span className="date">{p.section}</span>
        </div>
      ))}
    </div>
  );
}

function SchoolNotFound() {
  return (
    <div className="school-gate">
      <div style={{ fontSize: 20, marginBottom: 10 }}>404</div>
      <div>您访问的页面不存在。</div>
    </div>
  );
}

export function SchoolHomePage() {
  return (
    <SchoolLayout>
      <SchoolHome />
    </SchoolLayout>
  );
}

export function SchoolNewsListPage() {
  return (
    <SchoolLayout>
      <SchoolList kind="news" title="校园新闻" />
    </SchoolLayout>
  );
}

export function SchoolNoticesListPage() {
  return (
    <SchoolLayout>
      <SchoolList kind="notice" title="通知公告" />
    </SchoolLayout>
  );
}

export function SchoolArticlePage() {
  return (
    <SchoolLayout>
      <SchoolArticle />
    </SchoolLayout>
  );
}

export function SchoolDownloadsPage() {
  return (
    <SchoolLayout>
      <SchoolDownloads />
    </SchoolLayout>
  );
}

export function SchoolArchivePage() {
  return (
    <SchoolLayout>
      <SchoolArchive />
    </SchoolLayout>
  );
}

export function SchoolSearchPage() {
  return (
    <SchoolLayout>
      <SchoolSearch />
    </SchoolLayout>
  );
}

export function SchoolNotFoundPage() {
  return (
    <SchoolLayout>
      <SchoolNotFound />
    </SchoolLayout>
  );
}

const SchoolApp = { SchoolHomePage, SchoolNewsListPage, SchoolNoticesListPage, SchoolArticlePage, SchoolDownloadsPage, SchoolArchivePage, SchoolSearchPage, SchoolNotFoundPage };
export default SchoolApp;
