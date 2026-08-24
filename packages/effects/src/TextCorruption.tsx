import { useEffect, useState } from "react";
import { useGameStore } from "@psz/game-state";

const GARBLE = "▓▒░█▄▀▌▐╳※#%&@";

function corrupt(text: string, ratio: number): string {
  if (ratio <= 0) return text;
  return text
    .split("")
    .map((ch) => (ch.trim() && Math.random() < ratio ? GARBLE[Math.floor(Math.random() * GARBLE.length)] : ch))
    .join("");
}

export function TextCorruption({
  text,
  interval = 140,
  maxRatio = 0.3,
  trigger = false
}: {
  text: string;
  interval?: number;
  maxRatio?: number;
  trigger?: boolean;
}) {
  const enabled = useGameStore((s) => s.effectsEnabled);
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!enabled || !trigger) {
      setDisplay(text);
      return;
    }
    const timer = setInterval(() => {
      setDisplay(corrupt(text, maxRatio * (0.4 + Math.random() * 0.6)));
    }, interval);
    return () => clearInterval(timer);
  }, [text, interval, maxRatio, trigger, enabled]);

  return <span>{display}</span>;
}
