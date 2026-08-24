export function TextBlock({ text, className }: { text: string; className?: string }) {
  const paragraphs = text.split("\n").filter((p) => p.trim().length > 0);
  return (
    <div className={className}>
      {paragraphs.map((p, i) => (
        <p key={i} style={{ margin: "0.35em 0", whiteSpace: "pre-wrap" }}>
          {p}
        </p>
      ))}
    </div>
  );
}
