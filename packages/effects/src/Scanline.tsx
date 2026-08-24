import { useGameStore } from "@psz/game-state";

export function Scanline() {
  const enabled = useGameStore((s) => s.effectsEnabled);
  if (!enabled) return null;
  return <div className="psz-scanline" aria-hidden="true" />;
}
