import { getPuzzle, timelineSolutions } from "@psz/shared-data";
import { hasClues, useGameStore, type GameState } from "@psz/game-state";

export type CheckResult =
  | { ok: true; puzzleId: string; rewards: string[] }
  | { ok: false; puzzleId: string; reason: "locked" | "wrong" | "not-found" };

function normalize(answer: string): string {
  return answer.trim().replace(/\s+/g, "");
}

export function requirementsMet(state: Pick<GameState, "discoveredClues" | "completedPuzzles" | "extra">, requirementIds: string[]): boolean {
  return requirementIds.every((id) => {
    if (id.startsWith("clue_")) return state.discoveredClues.includes(id);
    if (id.startsWith("puzzle_")) return state.completedPuzzles.includes(id);
    if (id.startsWith("extra:")) return state.extra[id.slice(6)] === true;
    return (state as unknown as Record<string, boolean>)[id] === true;
  });
}

export function checkPassword(puzzleId: string, answer: string): CheckResult {
  const puzzle = getPuzzle(puzzleId);
  if (!puzzle) return { ok: false, puzzleId, reason: "not-found" };

  const state = useGameStore.getState();
  if (!requirementsMet(state, puzzle.requirements)) {
    return { ok: false, puzzleId, reason: "locked" };
  }

  const matched = puzzle.solution.some((s) => normalize(s.toLowerCase()) === normalize(answer.toLowerCase()));
  if (!matched) return { ok: false, puzzleId, reason: "wrong" };

  applyRewards(puzzle.rewards);
  useGameStore.getState().completePuzzle(puzzleId);
  return { ok: true, puzzleId, rewards: puzzle.rewards };
}

export function applyRewards(rewards: string[]): void {
  const store = useGameStore.getState();
  rewards.forEach((reward) => {
    if (reward === "yuanmisheAuthed") store.setExtra("yuanmisheAuthed", true);
    else if (reward === "ladderObtained") store.setFlag("ladderObtained", true);
    else if (reward === "enteredUnderworld") store.setFlag("enteredUnderworld", true);
    else if (reward === "decodedUnderworld") store.setFlag("decodedUnderworld", true);
    else if (reward === "reconstructedTimeline") store.setFlag("reconstructedTimeline", true);
    else if (reward === "skeletonGameWon") store.setFlag("skeletonGameWon", true);
    else if (reward === "finalPuzzleSolved") store.setFlag("finalPuzzleSolved", true);
    else store.setExtra(reward, true);
  });
}

export function completePuzzle(puzzleId: string): void {
  useGameStore.getState().completePuzzle(puzzleId);
}

export function checkTimeline(answers: Record<string, string>): { ok: boolean; wrong: string[] } {
  const wrong: string[] = [];
  for (const [eventId, solution] of Object.entries(timelineSolutions)) {
    if (!answers[eventId] || answers[eventId] !== solution) {
      wrong.push(eventId);
    }
  }
  return { ok: wrong.length === 0, wrong };
}

export function getHint(puzzleId: string, level: 1 | 2 | 3): string {
  const puzzle = getPuzzle(puzzleId);
  if (!puzzle) return "";
  return puzzle.hints[level - 1];
}

export function grantClues(ids: string[]): void {
  if (ids.length === 0) return;
  useGameStore.getState().grantClues(ids);
}

export function grantCluesAndFlags(clues: string[] | undefined, flags: string[] | undefined): void {
  if (clues && clues.length) grantClues(clues);
  if (flags && flags.length) {
    const store = useGameStore.getState();
    flags.forEach((f) => {
      const known: (keyof GameState)[] = [
        "foundDeathNotice",
        "foundForumEvidence",
        "foundSchoolEvidence",
        "discoveredAyue",
        "discoveredXiaoyu",
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
      if ((known as string[]).includes(f)) store.setFlag(f as keyof GameState, true);
      else store.setExtra(f, true);
    });
  }
  syncDerivedFlags();
}

export function syncDerivedFlags(): void {
  const s = useGameStore.getState();
  if (hasClues(s, ["clue_001", "clue_002", "clue_003"])) {
    s.setFlag("foundForumEvidence", true);
  }
  if (s.foundSchoolEvidence && s.discoveredBearGrandma && hasClues(s, ["clue_005", "clue_006"])) {
    s.setExtra("readyForYuanmiShe", true);
  }
}

export function checkFinalQuiz(answers: Record<string, string>): { ok: boolean; wrong: string[] } {
  const wrong: string[] = [];
  if (!["design", "plan", "active"].includes(answers.q1)) wrong.push("q1");
  if (answers.q2 !== "bear_grandma") wrong.push("q2");
  if (!["leave_route", "inherit"].includes(answers.q3)) wrong.push("q3");
  return { ok: wrong.length === 0, wrong };
}

export function isClueDiscovered(clueId: string): boolean {
  return useGameStore.getState().discoveredClues.includes(clueId);
}

export { hasClues };
