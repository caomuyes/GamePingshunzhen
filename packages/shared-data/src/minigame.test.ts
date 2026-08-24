import { describe, expect, it } from "vitest";
import { getEventAtScore, minigameConfig } from "./minigame";

describe("minigame config", () => {
  it("fires the ghost event at 666", () => {
    expect(getEventAtScore(666)?.event).toBe("ghost_appears");
  });

  it("shows Ayue's shadow at 1314", () => {
    expect(getEventAtScore(1314)?.event).toBe("ayue_shadow");
  });

  it("makes the bet available at 2000 and wins the ladder at 3000", () => {
    expect(getEventAtScore(2000)?.event).toBe("betting_available");
    expect(getEventAtScore(3000)?.event).toBe("ladder_win");
    expect(minigameConfig.betTarget).toBe(3000);
  });
});
