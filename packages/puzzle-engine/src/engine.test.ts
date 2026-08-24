import { beforeEach, describe, expect, it } from "vitest";
import { useGameStore } from "@psz/game-state";
import { timelineAnswers } from "@psz/shared-data";
import { checkFinalQuiz, checkPassword, checkTimeline, getHint, requirementsMet } from "./index";

describe("PuzzleEngine", () => {
  beforeEach(() => {
    localStorage.clear();
    useGameStore.getState().reset();
  });

  it("rejects a password when requirements are missing", () => {
    const res = checkPassword("puzzle_017", "yuxiaoyu101727");
    expect(res).toEqual({ ok: false, puzzleId: "puzzle_017", reason: "locked" });
  });

  it("accepts the cross-site password when all clues are found", () => {
    const store = useGameStore.getState();
    store.grantClues(["clue_username", "clue_birthday", "clue_school_27"]);
    const res = checkPassword("puzzle_017", "yuxiaoyu101727");
    expect(res.ok).toBe(true);
    expect(useGameStore.getState().extra.yuanmisheAuthed).toBe(true);
    expect(useGameStore.getState().completedPuzzles).toContain("puzzle_017");
  });

  it("rejects wrong passwords", () => {
    const store = useGameStore.getState();
    store.grantClues(["clue_username", "clue_birthday", "clue_school_27"]);
    const res = checkPassword("puzzle_017", "wrongpass");
    expect(res).toEqual({ ok: false, puzzleId: "puzzle_017", reason: "wrong" });
    expect(useGameStore.getState().extra.yuanmisheAuthed).toBeFalsy();
  });

  it("validates the timeline puzzle", () => {
    const answers: Record<string, string> = {};
    for (const [eventId, options] of Object.entries(timelineAnswers)) {
      answers[eventId] = options[0];
    }
    expect(checkTimeline(answers).ok).toBe(true);
    expect(checkTimeline({ ...answers, timeline_007: "2023-11-02" }).wrong).toContain("timeline_007");
  });

  it("provides three levels of hints", () => {
    expect(getHint("puzzle_017", 1)).toBeTruthy();
    expect(getHint("puzzle_017", 2)).toBeTruthy();
    expect(getHint("puzzle_017", 3)).toContain("yuxiaoyu101727");
  });

  it("checks requirements against flags and clues", () => {
    const store = useGameStore.getState();
    store.setFlag("ladderObtained", true);
    store.grantClues(["clue_001"]);
    expect(requirementsMet(useGameStore.getState(), ["ladderObtained"])).toBe(true);
    expect(requirementsMet(useGameStore.getState(), ["clue_001"])).toBe(true);
    expect(requirementsMet(useGameStore.getState(), ["clue_002"])).toBe(false);
  });

  it("validates the final quiz", () => {
    expect(checkFinalQuiz({ q1: "design", q2: "bear_grandma", q3: "leave_route" }).ok).toBe(true);
    expect(checkFinalQuiz({ q1: "despair", q2: "bear_grandma", q3: "leave_route" }).wrong).toContain("q1");
  });
});
