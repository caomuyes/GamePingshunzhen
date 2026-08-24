import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { findSourceHint } from "@psz/shared-data";
import { useGameStore } from "@psz/game-state";
import { audio } from "@psz/audio";
import { domainForPath, pathFromInput } from "./domain";

export function BrowserBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [showSource, setShowSource] = useState(false);
  const muted = useGameStore((s) => s.muted);
  const effects = useGameStore((s) => s.effectsEnabled);
  const domain = domainForPath(pathname);
  const sourceHint = findSourceHint(pathname);

  const go = () => {
    const path = pathFromInput(address || domain);
    if (path) navigate(path);
    setAddress("");
  };

  return (
    <>
      <div className="browser-bar">
        <button onClick={() => window.history.back()}>← 后退</button>
        <button onClick={() => window.history.forward()}>前进 →</button>
        <button onClick={() => window.location.reload()}>⟳</button>
        <div className="browser-address">
          <span className="lock">●</span>
          <span>{domain}</span>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && go()}
            placeholder="输入网址或路径"
          />
        </div>
        <div className="browser-extra">
          <button className={muted ? "" : "on"} onClick={() => useGameStore.getState().toggleMuted()}>
            {muted ? "音效 关" : "音效 开"}
          </button>
          <button className={effects ? "on" : ""} onClick={() => useGameStore.getState().toggleEffects()}>
            特效
          </button>
          <button onClick={() => setShowSource(true)}>&lt;/&gt; 源码</button>
        </div>
      </div>
      {showSource && (
        <div className="source-modal" onClick={() => setShowSource(false)}>
          <pre onClick={(e) => e.stopPropagation()}>
            {`<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <title>${domain}${pathname}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content="pingshun-web v1.0" />
  </head>
  <body>
    <!-- 该页面由数据驱动渲染，以下为部分源码注释 -->
    ${sourceHint ?? "<!-- 此页面没有额外注释 -->"}
    <!-- 提示：在五个网站间交叉比对，比盯着一个页面有用。 -->
    <!-- 访问记录将被保存。它们会被某些东西看见。 -->
  </body>
</html>`}
          </pre>
        </div>
      )}
    </>
  );
}
