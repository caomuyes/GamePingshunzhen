import { useGameStore } from "@psz/game-state";

export function CRT() {
  const enabled = useGameStore((s) => s.effectsEnabled);
  if (!enabled) return null;
  return <div className="psz-crt" aria-hidden="true" />;
}
