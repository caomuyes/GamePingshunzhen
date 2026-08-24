import { useState } from "react";
import { getHint } from "@psz/puzzle-engine";

export function HintPanel({ puzzleId }: { puzzleId: string }) {
  const [level, setLevel] = useState(0);
  if (level === 0) {
    return (
      <button className="psz-hint-btn" onClick={() => setLevel(1)}>
        需要提示？
      </button>
    );
  }
  return (
    <div className="psz-hint-panel">
      <div className="psz-hint-text">{getHint(puzzleId, level as 1 | 2 | 3)}</div>
      {level < 3 ? (
        <button className="psz-hint-btn" onClick={() => setLevel(level + 1)}>
          再提示一点（{level}/3）
        </button>
      ) : (
        <span className="psz-hint-done">这已经是最大提示了</span>
      )}
    </div>
  );
}
