import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGameStore } from "@psz/game-state";
import { audio } from "@psz/audio";

export function StartPage() {
  const [q, setQ] = useState("平顺镇高中 学生死亡");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const search = () => {
    const store = useGameStore.getState();
    if (name.trim()) store.setPlayerName(name.trim());
    audio.unlock();
    audio.play("ui.click");
    const query = q.trim() || "平顺镇高中 学生死亡";
    navigate(`/forum/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="start-page">
      <div className="start-box">
        <div className="start-logo">平顺镇生活网</div>
        <div className="start-sub">本地生活信息 · 新闻 · 论坛 · 便民服务</div>
        <div className="start-search">
          <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === "Enter" && search()} />
          <button onClick={search}>搜索</button>
        </div>
        <div className="start-name">
          给这次检索取个昵称（可选）
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="访客" maxLength={12} />
        </div>
        <div className="start-links">
          <Link to="/forum">校园论坛</Link>
          <Link to="/school">平顺镇高中官网</Link>
          <Link to="/social">同学录</Link>
        </div>
        <div className="start-note">本页面为虚构游戏内容，与现实中的任何网站、人物、事件无关。</div>
      </div>
    </div>
  );
}
