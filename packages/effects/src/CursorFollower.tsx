import { useEffect, useRef } from "react";
import { useGameStore } from "@psz/game-state";

export function CursorFollower() {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useGameStore((s) => s.effectsEnabled);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.transform = `translate(${x - 110}px, ${y - 110}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={ref} className="psz-cursor-glow" aria-hidden="true" />;
}
