import { useGameStore } from "@psz/game-state";
import type { ReactNode } from "react";

export function Flicker({ children }: { children: ReactNode }) {
  const enabled = useGameStore((s) => s.effectsEnabled);
  if (!enabled) return <>{children}</>;
  return <span className="psz-flicker">{children}</span>;
}
