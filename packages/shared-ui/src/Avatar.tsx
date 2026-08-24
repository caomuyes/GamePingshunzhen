import type { CSSProperties } from "react";
import type { AvatarSpec } from "@psz/shared-data";

export function Avatar({ spec, size = 40 }: { spec: AvatarSpec; size?: number }) {
  const style: CSSProperties = {
    width: size,
    height: size,
    background: spec.bg,
    color: spec.fg,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: size * 0.42,
    fontWeight: 700,
    overflow: "hidden",
    borderRadius: size >= 44 ? "50%" : 4
  };

  if (spec.kind === "broken") {
    return (
      <span style={style} className="avatar-broken">
        <span style={{ opacity: 0.35 }}>{spec.text ?? "×"}</span>
      </span>
    );
  }

  if (spec.kind === "silhouette") {
    return (
      <span style={{ ...style, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            bottom: 4,
            width: "60%",
            height: "45%",
            borderRadius: "50% 50% 0 0",
            background: spec.fg,
            opacity: 0.5
          }}
        />
        <span style={{ position: "absolute", top: 6, width: "38%", height: "38%", borderRadius: "50%", background: spec.fg, opacity: 0.5 }} />
      </span>
    );
  }

  if (spec.kind === "skeleton") {
    return (
      <span style={{ ...style, borderRadius: "50%" }}>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <span style={{ width: size * 0.38, height: size * 0.38, borderRadius: "50%", border: `2px solid ${spec.fg}` }} />
          <span style={{ width: size * 0.5, height: size * 0.16, border: `2px solid ${spec.fg}`, borderTop: "none" }} />
        </span>
      </span>
    );
  }

  if (spec.kind === "moon") {
    return (
      <span style={{ ...style, borderRadius: "50%" }}>
        <span style={{ position: "relative", width: size * 0.5, height: size * 0.5 }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: spec.fg, opacity: 0.9 }} />
          <span style={{ position: "absolute", right: -size * 0.08, top: -size * 0.04, width: size * 0.42, height: size * 0.42, borderRadius: "50%", background: spec.bg }} />
        </span>
      </span>
    );
  }

  if (spec.kind === "flower") {
    return (
      <span style={{ ...style, borderRadius: "50%" }}>
        <span style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ width: size * 0.3, height: size * 0.3, borderRadius: "50% 50% 50% 50%", background: spec.fg, opacity: 0.75, transform: `rotate(${i * 45}deg)` }} />
          ))}
        </span>
      </span>
    );
  }

  return <span style={style}>{spec.text ?? "?"}</span>;
}
