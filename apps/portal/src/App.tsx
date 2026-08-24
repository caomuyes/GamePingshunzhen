import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useGameStore } from "@psz/game-state";
import {
  ForumHomePage,
  ForumBoardPage,
  ForumThreadPage,
  ForumUserPage,
  ForumSearchPage,
  ForumNotFoundPage
} from "@psz/forum";
import {
  SchoolHomePage,
  SchoolNewsListPage,
  SchoolNoticesListPage,
  SchoolArticlePage,
  SchoolDownloadsPage,
  SchoolArchivePage,
  SchoolSearchPage,
  SchoolNotFoundPage
} from "@psz/school";
import {
  SocialHomePage,
  SocialProfilePage,
  SocialPostDetailPage,
  SocialNotesPage,
  SocialTimelinePage,
  SocialChatPage,
  SocialSearchPage,
  SocialArchivePage,
  SocialNotFoundPage
} from "@psz/social";
import {
  YmsHomePage,
  YmsEnterPage,
  YmsBoardPage,
  YmsThreadPage,
  YmsUserPage,
  YmsGamePage,
  YmsTerminalPage,
  YmsNotFoundPage
} from "@psz/yuanmishe";
import {
  UnderworldGuard,
  UnderworldHomePage,
  UnderworldEntryPage,
  UnderworldSectionPage,
  UnderworldRecordPagePage,
  UnderworldDecodePage,
  UnderworldFinalPage,
  UnderworldEndingPage,
  UnderworldRegisterPage,
  UnderworldNotFoundPage
} from "@psz/underworld";
import { BrowserBar } from "./BrowserBar";
import { StartPage } from "./StartPage";
import { DebugPage } from "./DebugPage";

function NotFound() {
  return (
    <div style={{ minHeight: "100vh", background: "#101318", color: "#8a929e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 26, marginBottom: 10 }}>404</div>
        <div>您访问的页面不存在。</div>
      </div>
    </div>
  );
}

function ResetPage() {
  const navigate = useNavigate();
  useEffect(() => {
    useGameStore.getState().reset();
    navigate("/", { replace: true });
  }, [navigate]);
  return null;
}

export function App() {
  const location = useLocation();
  const isStart = location.pathname === "/";
  const isDebug = location.pathname.startsWith("/dev");
  return (
    <>
      {!isStart && <BrowserBar />}
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/forum" element={<ForumHomePage />} />
        <Route path="/forum/board/:boardId" element={<ForumBoardPage />} />
        <Route path="/forum/thread/:postId" element={<ForumThreadPage />} />
        <Route path="/forum/user/:userId" element={<ForumUserPage />} />
        <Route path="/forum/search" element={<ForumSearchPage />} />
        <Route path="/forum/*" element={<ForumNotFoundPage />} />

        <Route path="/school" element={<SchoolHomePage />} />
        <Route path="/school/news" element={<SchoolNewsListPage />} />
        <Route path="/school/news/:id" element={<SchoolArticlePage />} />
        <Route path="/school/notices" element={<SchoolNoticesListPage />} />
        <Route path="/school/notice/:id" element={<SchoolArticlePage />} />
        <Route path="/school/page/:id" element={<SchoolArticlePage />} />
        <Route path="/school/file/:id" element={<SchoolArticlePage />} />
        <Route path="/school/downloads" element={<SchoolDownloadsPage />} />
        <Route path="/school/archive" element={<SchoolArchivePage />} />
        <Route path="/school/search" element={<SchoolSearchPage />} />
        <Route path="/school/*" element={<SchoolNotFoundPage />} />

        <Route path="/social" element={<SocialHomePage />} />
        <Route path="/social/user/:userId" element={<SocialProfilePage />} />
        <Route path="/social/user/:userId/post/:postId" element={<SocialPostDetailPage />} />
        <Route path="/social/user/ayue/notes" element={<SocialNotesPage />} />
        <Route path="/social/user/ayue/timeline" element={<SocialTimelinePage />} />
        <Route path="/social/user/ayue/chat/:chatId" element={<SocialChatPage />} />
        <Route path="/social/search" element={<SocialSearchPage />} />
        <Route path="/social/archive" element={<SocialArchivePage />} />
        <Route path="/social/*" element={<SocialNotFoundPage />} />

        <Route path="/yuanmishe" element={<YmsHomePage />} />
        <Route path="/yuanmishe/enter" element={<YmsEnterPage />} />
        <Route path="/yuanmishe/board/:boardId" element={<YmsBoardPage />} />
        <Route path="/yuanmishe/thread/:postId" element={<YmsThreadPage />} />
        <Route path="/yuanmishe/user/:userId" element={<YmsUserPage />} />
        <Route path="/yuanmishe/game" element={<YmsGamePage />} />
        <Route path="/yuanmishe/terminal" element={<YmsTerminalPage />} />
        <Route path="/yuanmishe/*" element={<YmsNotFoundPage />} />

        <Route
          path="/underworld"
          element={
            <UnderworldGuard>
              <UnderworldHomePage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/home"
          element={
            <UnderworldGuard>
              <UnderworldHomePage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/entry"
          element={
            <UnderworldGuard>
              <UnderworldEntryPage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/section/:section"
          element={
            <UnderworldGuard>
              <UnderworldSectionPage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/record/:id"
          element={
            <UnderworldGuard>
              <UnderworldRecordPagePage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/decode"
          element={
            <UnderworldGuard>
              <UnderworldDecodePage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/final"
          element={
            <UnderworldGuard>
              <UnderworldFinalPage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/ending"
          element={
            <UnderworldGuard>
              <UnderworldEndingPage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/register"
          element={
            <UnderworldGuard>
              <UnderworldRegisterPage />
            </UnderworldGuard>
          }
        />
        <Route
          path="/underworld/*"
          element={
            <UnderworldGuard>
              <UnderworldNotFoundPage />
            </UnderworldGuard>
          }
        />
        {import.meta.env.DEV ? (
          <Route path="/dev/debug" element={<DebugPage />} />
        ) : (
          <Route path="/dev/*" element={<NotFound />} />
        )}
        <Route path="/dev/reset" element={<ResetPage />} />
        <Route path="*" element={isDebug ? <NotFound /> : <NotFound />} />
      </Routes>
    </>
  );
}
