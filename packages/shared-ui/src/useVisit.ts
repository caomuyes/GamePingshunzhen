import { useEffect, useRef } from "react";
import { useGameStore } from "@psz/game-state";

export function useVisit(path: string): number {
  const recorded = useRef(false);
  const count = useGameStore((s) => s.visits[path] ?? 0);

  useEffect(() => {
    if (recorded.current) return;
    recorded.current = true;
    useGameStore.getState().recordVisit(path);
  }, [path]);

  return count;
}

export function useVisitOnce(path: string): number {
  const count = useGameStore((s) => s.visits[path] ?? 0);
  useEffect(() => {
    useGameStore.getState().recordVisit(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  return count;
}
