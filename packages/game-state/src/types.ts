export type EndingState = "none" | "normal" | "hidden";

export interface GameState {
  playerName: string;

  discoveredAyue: boolean;
  discoveredXiaoyu: boolean;

  foundDeathNotice: boolean;
  foundForumEvidence: boolean;
  foundSchoolEvidence: boolean;

  reconstructedTimeline: boolean;

  discoveredBearGrandma: boolean;

  enteredYuanmiShe: boolean;
  yuanmisheAuthed: boolean;

  skeletonGameStarted: boolean;
  skeletonGameWon: boolean;

  ladderObtained: boolean;

  enteredUnderworld: boolean;
  decodedUnderworld: boolean;

  discoveredAyuePlan: boolean;

  finalPuzzleSolved: boolean;

  endingUnlocked: EndingState;
  hiddenEndingStarted: boolean;

  discoveredClues: string[];
  completedPuzzles: string[];
  visits: Record<string, number>;

  extra: Record<string, boolean>;

  muted: boolean;
  effectsEnabled: boolean;
}

export const defaultGameState: GameState = {
  playerName: "",

  discoveredAyue: false,
  discoveredXiaoyu: false,

  foundDeathNotice: false,
  foundForumEvidence: false,
  foundSchoolEvidence: false,

  reconstructedTimeline: false,

  discoveredBearGrandma: false,

  enteredYuanmiShe: false,
  yuanmisheAuthed: false,

  skeletonGameStarted: false,
  skeletonGameWon: false,

  ladderObtained: false,

  enteredUnderworld: false,
  decodedUnderworld: false,

  discoveredAyuePlan: false,

  finalPuzzleSolved: false,

  endingUnlocked: "none",
  hiddenEndingStarted: false,

  discoveredClues: [],
  completedPuzzles: [],
  visits: {},

  extra: {},

  muted: false,
  effectsEnabled: true
};
