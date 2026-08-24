export interface EncodedText {
  id: string;
  label: string;
  original: string;
}

export const encodedTexts: EncodedText[] = [
  { id: "poem", label: "乱码档案 001", original: "漆炬迎新人，幽圹萤扰扰" }
];

const gbkDecoder = new TextDecoder("gbk");
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder("utf-8");

export function garbledFor(original: string): string {
  return gbkDecoder.decode(utf8Encoder.encode(original));
}

export function hexBytesFor(original: string): string {
  return Array.from(utf8Encoder.encode(original))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function normalizeHex(hex: string): string {
  return hex.replace(/[\s:：,，\-]/g, "").toLowerCase();
}

export function decodeHex(hex: string, encoding: "utf-8" | "gbk" | "gb2312"): {
  ok: boolean;
  text: string;
  note?: string;
  error?: string;
} {
  const cleaned = normalizeHex(hex);
  if (cleaned.length === 0) {
    return { ok: false, text: "", error: "请输入字节序列" };
  }
  if (cleaned.length % 2 !== 0) {
    return { ok: false, text: "", error: "字节序列长度必须为偶数" };
  }
  if (!/^[0-9a-f]+$/.test(cleaned)) {
    return { ok: false, text: "", error: "字节序列只能包含十六进制字符（0-9, a-f）" };
  }
  try {
    const bytes = new Uint8Array(cleaned.match(/../g)!.map((h) => parseInt(h, 16)));
    const decoder = new TextDecoder(encoding, { fatal: false });
    const text = decoder.decode(bytes);
    if (encoding === "utf-8" && text.includes("\uFFFD")) {
      return { ok: false, text, error: "按 UTF-8 解码出现无法识别字符——这些字节不是（或不仅是）UTF-8 内容" };
    }
    return { ok: true, text };
  } catch (e) {
    return { ok: false, text: "", error: e instanceof Error ? e.message : String(e) };
  }
}

export function isPoem(text: string): boolean {
  return text.trim() === encodedTexts[0].original;
}
