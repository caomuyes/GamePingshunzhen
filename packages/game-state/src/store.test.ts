import { beforeEach, describe, expect, it } from "vitest";
import { SAVE_KEY, defaultGameState, useGameStore } from "./index";

describe("GameState", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.getState().reset();
  });

  it("has the spec-defined default state", () => {
    const s = useGameStore.getState();
    expect(s.discoveredAyue).toBe(false);
    expect(s.foundDeathNotice).toBe(false);
    expect(s.reconstructedTimeline).toBe(false);
    expect(s.discoveredBearGrandma).toBe(false);
    expect(s.enteredYuanmiShe).toBe(false);
    expect(s.skeletonGameStarted).toBe(false);
    expect(s.ladderObtained).toBe(false);
    expect(s.enteredUnderworld).toBe(false);
    expect(s.decodedUnderworld).toBe(false);
    expect(s.discoveredAyuePlan).toBe(false);
    expect(s.finalPuzzleSolved).toBe(false);
    expect(s.endingUnlocked).toBe("none");
  });

  it("grants clues idempotently", () => {
    const store = useGameStore.getState();
    store.grantClues(["clue_001", "clue_002"]);
    store.grantClues(["clue_002", "clue_003"]);
    const s = useGameStore.getState();
    expect(s.discoveredClues).toHaveLength(3);
    expect(s.discoveredClues).toContain("clue_001");
  });

  it("records visits with counts", () => {
    const store = useGameStore.getState();
    store.recordVisit("/forum");
    store.recordVisit("/forum");
    expect(useGameStore.getState().visits["/forum"]).toBe(2);
  });

  it("persists to localStorage and can be restored", () => {
    const store = useGameStore.getState();
    store.setPlayerName("测试访客");
    store.setFlag("discoveredAyue", true);
    store.grantClues(["clue_001"]);
    store.completePuzzle("puzzle_017");
    store.setEnding("normal");

    const raw = localStorage.getItem(SAVE_KEY);
    expect(raw).toBeTruthy();
    const savedState = JSON.parse(raw!).state;
    expect(savedState.playerName).toBe("测试访客");
    expect(savedState.discoveredAyue).toBe(true);
    expect(savedState.completedPuzzles).toContain("puzzle_017");
    expect(savedState.endingUnlocked).toBe("normal");

    useGameStore.getState().reset();
    expect(useGameStore.getState().playerName).toBe("");
    expect(useGameStore.getState().discoveredAyue).toBe(false);
    const savedAfterReset = JSON.parse(localStorage.getItem(SAVE_KEY)!).state;
    expect(savedAfterReset.playerName).toBe("");
    expect(savedAfterReset.discoveredClues).toEqual([]);
  });

  it("supports hidden ending flags", () => {
    const store = useGameStore.getState();
    store.startHiddenEnding();
    store.setEnding("hidden");
    const s = useGameStore.getState();
    expect(s.hiddenEndingStarted).toBe(true);
    expect(s.endingUnlocked).toBe("hidden");
  });

  it("defaults match the spec interface", () => {
    expect(defaultGameState.endingUnlocked).toBe("none");
    expect(defaultGameState.discoveredClues).toEqual([]);
    expect(defaultGameState.completedPuzzles).toEqual([]);
  });
});
