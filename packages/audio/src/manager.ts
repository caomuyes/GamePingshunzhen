import { Howl, Howler } from "howler";
import { buildSounds, type SoundDef } from "./synth";

class AudioManager {
  private sounds: Map<string, Howl> = new Map();
  private ambient: Howl | null = null;
  private unlocked = false;
  private muted = false;

  unlock() {
    if (this.unlocked) return;
    this.unlocked = true;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    ctx.close();
  }

  private ensure(name: string): Howl | undefined {
    if (!this.sounds.has(name)) {
      const def = this.soundsDef().find((d) => d.name === name);
      if (!def) return undefined;
      this.sounds.set(name, new Howl({ src: [def.uri], loop: def.loop, volume: name === "ambient" ? 0.35 : 0.6 }));
    }
    return this.sounds.get(name);
  }

  private soundsDef(): SoundDef[] {
    if (!this._defs) this._defs = buildSounds();
    return this._defs;
  }
  private _defs: SoundDef[] | null = null;

  play(name: string) {
    if (this.muted) return;
    const sound = this.ensure(name);
    if (sound) sound.play();
  }

  startAmbient(kind: "yuanmishe" | "underworld") {
    if (this.muted) return;
    if (this.ambient) return;
    const name = kind === "underworld" ? "ambient" : "whisper";
    const sound = this.ensure(name);
    if (sound) {
      this.ambient = sound;
      sound.play();
    }
  }

  stopAmbient() {
    if (this.ambient) {
      this.ambient.stop();
      this.ambient = null;
    }
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    Howler.mute(muted);
    if (muted && this.ambient) this.ambient.pause();
    if (!muted && this.ambient && !this.ambient.playing()) this.ambient.play();
  }
}

export const audio = new AudioManager();
