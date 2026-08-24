import type { MinigameConfig } from "./types";

export const minigameConfig: MinigameConfig = {
  gravity: 0.62,
  jumpVelocity: 12.4,
  baseSpeed: 5.4,
  maxSpeed: 11,
  speedStep: 0.004,
  obstacleGapMin: 170,
  obstacleGapMax: 330,
  betTarget: 3000,
  events: [
    { score: 666, event: "ghost_appears", label: "背景开始变化……" },
    { score: 1314, event: "ayue_shadow", label: "山路尽头站着一个女孩。" },
    { score: 2000, event: "betting_available", label: "小骨出现了。" },
    { score: 3000, event: "ladder_win", label: "小骨输了。" }
  ]
};

export function getEventAtScore(score: number): MinigameConfig["events"][number] | undefined {
  return minigameConfig.events.find((e) => e.score === score);
}
