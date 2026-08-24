import { useGameStore } from "@psz/game-state";
import type { ReactNode } from "react";

export function Glitch({ children, intensity = 0.4 }: { children: ReactNode; intensity?: number }) {
  const enabled = useGameStore((s) => s.effectsEnabled);
  if (!enabled) return <>{children}</>;
  return <div className={`psz-glitch ${intensity > 0.7 ? "strong" : ""}`}>{children}</div>;
}
