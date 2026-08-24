import { useState } from "react";
import { Link } from "react-router-dom";
import { allClueIds } from "@psz/shared-data";
import { useGameStore, type GameState } from "@psz/game-state";
import { applyRewards, completePuzzle } from "@psz/puzzle-engine";

const ALL_FLAGS: (keyof GameState)[] = [
  "discoveredAyue",
  "discoveredXiaoyu",
  "foundDeathNotice",
  "foundForumEvidence",
  "foundSchoolEvidence",
  "reconstructedTimeline",
  "discoveredBearGrandma",
  "enteredYuanmiShe",
  "skeletonGameStarted",
  "skeletonGameWon",
  "ladderObtained",
  "enteredUnderworld",
  "decodedUnderworld",
  "discoveredAyuePlan",
  "finalPuzzleSolved"
];

export function DebugPage() {
  const state = useGameStore();
  const [json, setJson] = useState("");
  const [done, setDone] = useState("");

  const snapshot = () => {
    const s = useGameStore.getState();
    setJson(JSON.stringify({ ...s, visits: s.visits }, null, 2));
  };

  const unlockAll = () => {
    const s = useGameStore.getState();
    ALL_FLAGS.forEach((f) => s.setFlag(f, true));
    s.grantClues(allClueIds);
    s.setExtra("yuanmisheAuthed", true);
    s.setExtra("skeletonGameStarted", true);
    s.setExtra("skeletonGameWon", true);
    s.setExtra("ladderObtained", true);
    s.setExtra("enteredUnderworld", true);
    s.setExtra("readyForYuanmiShe", true);
    s.setExtra("hiddenRevealed", true);
    ["puzzle_017", "puzzle_018", "puzzle_019", "puzzle_020", "puzzle_021", "puzzle_022"].forEach((p) => s.completePuzzle(p));
    setDone("已解锁全部线索与谜题");
  };

  const simulateEnding = (kind: "normal" | "hidden") => {
    unlockAll();
    const s = useGameStore.getState();
    if (kind === "hidden") {
      s.startHiddenEnding();
      s.setEnding("hidden");
    } else {
      s.setEnding("normal");
    }
    setDone(`已模拟${kind === "normal" ? "普通" : "隐藏"}结局`);
  };

  return (
    <div className="debug-page">
      <h1>/dev/debug · 调试工具</h1>
      <p>此页面仅在开发环境可用。正式构建不会包含它。</p>
      <div>
        <Link to="/forum">→ 论坛</Link> · <Link to="/school">→ 官网</Link> · <Link to="/social">→ 个人空间</Link> · <Link to="/yuanmishe">→ 源秘社</Link> · <Link to="/underworld">→ 阴间</Link>
      </div>
      <div style={{ margin: "14px 0" }}>
        <button onClick={snapshot}>查看 GameState</button>
        <button onClick={unlockAll}>解锁全部</button>
        <button
          onClick={() => {
            useGameStore.getState().reset();
            setDone("存档已清空");
          }}
        >
          清空存档
        </button>
        <button onClick={() => simulateEnding("normal")}>模拟普通结局</button>
        <button onClick={() => simulateEnding("hidden")}>模拟隐藏结局</button>
      </div>
      {done && <div style={{ color: "#7fd08a" }}>{done}</div>}
      <h2>GameState</h2>
      <pre>{json || "点击「查看 GameState」获取当前状态。"}</pre>
      <h2>已发现线索（{state.discoveredClues.length}/{allClueIds.length}）</h2>
      <pre>{state.discoveredClues.join("\n")}</pre>
      <h2>已完成谜题</h2>
      <pre>{state.completedPuzzles.join("\n") || "（无）"}</pre>
      <h2>结局</h2>
      <pre>{state.endingUnlocked}</pre>
    </div>
  );
}
