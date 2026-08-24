import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultGameState, type GameState } from "./types";

export const SAVE_KEY = "pingshun-save-v1";

export interface GameStore extends GameState {
  setPlayerName: (name: string) => void;
  grantClues: (ids: string[]) => void;
  setFlag: (key: keyof GameState, value: boolean) => void;
  setExtra: (key: string, value: boolean) => void;
  recordVisit: (url: string) => void;
  completePuzzle: (id: string) => void;
  setEnding: (ending: GameState["endingUnlocked"]) => void;
  startHiddenEnding: () => void;
  toggleMuted: () => void;
  toggleEffects: () => void;
  hydrate: (patch: Partial<GameState>) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...defaultGameState,

      setPlayerName: (name) => set({ playerName: name.trim() }),

      grantClues: (ids) =>
        set((state) => {
          const next = new Set(state.discoveredClues);
          ids.forEach((id) => next.add(id));
          return { discoveredClues: Array.from(next) };
        }),

      setFlag: (key, value) => set({ [key]: value } as Partial<GameState>),

      setExtra: (key, value) =>
        set((state) => ({ extra: { ...state.extra, [key]: value } })),

      recordVisit: (url) =>
        set((state) => ({
          visits: { ...state.visits, [url]: (state.visits[url] ?? 0) + 1 }
        })),

      completePuzzle: (id) =>
        set((state) => {
          if (state.completedPuzzles.includes(id)) return state;
          return { completedPuzzles: [...state.completedPuzzles, id] };
        }),

      setEnding: (ending) => set({ endingUnlocked: ending }),

      startHiddenEnding: () => set({ hiddenEndingStarted: true }),

      toggleMuted: () => set((state) => ({ muted: !state.muted })),
      toggleEffects: () =>
        set((state) => ({ effectsEnabled: !state.effectsEnabled })),

      hydrate: (patch) => set(patch),

      reset: () => {
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem(SAVE_KEY);
        }
        set({ ...defaultGameState });
      }
    }),
    {
      name: SAVE_KEY,
      version: 1
    }
  )
);

export function hasClues(state: Pick<GameState, "discoveredClues">, ids: string[]): boolean {
  return ids.every((id) => state.discoveredClues.includes(id));
}

export function visitCount(state: Pick<GameState, "visits">, url: string): number {
  return state.visits[url] ?? 0;
}
