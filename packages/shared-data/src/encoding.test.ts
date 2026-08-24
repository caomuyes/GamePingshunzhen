import { describe, expect, it } from "vitest";
import { decodeHex, encodedTexts, garbledFor, hexBytesFor, isPoem } from "./encoding";

describe("encoding puzzle", () => {
  const text = encodedTexts[0].original;

  it("produces mojibake that differs from the original", () => {
    const garbled = garbledFor(text);
    expect(garbled).not.toBe(text);
    expect(garbled).toContain("�");
  });

  it("recovers the poem by decoding the hex bytes as UTF-8", () => {
    const hex = hexBytesFor(text);
    const res = decodeHex(hex, "utf-8");
    expect(res.ok).toBe(true);
    expect(res.text).toBe("漆炬迎新人，幽圹萤扰扰");
    expect(isPoem(res.text)).toBe(true);
  });

  it("shows the same mojibake when reading bytes as GBK", () => {
    const hex = hexBytesFor(text);
    const res = decodeHex(hex, "gbk");
    expect(res.ok).toBe(true);
    expect(res.text).toBe(garbledFor(text));
  });

  it("rejects invalid hex input", () => {
    expect(decodeHex("zz", "utf-8").ok).toBe(false);
    expect(decodeHex("abc", "utf-8").ok).toBe(false);
  });
});
