import { useEffect, useRef } from "react";
import { grantCluesAndFlags } from "@psz/puzzle-engine";

export function ClueGrabber({ clues, flags, extras }: { clues?: string[]; flags?: string[]; extras?: string[] }) {
  const granted = useRef<string | null>(null);
  const signature = JSON.stringify([clues, flags, extras]);
  useEffect(() => {
    if (granted.current === signature) return;
    granted.current = signature;
    grantCluesAndFlags([...(clues ?? []), ...(extras ?? [])], flags);
  }, [signature]);
  return null;
}
