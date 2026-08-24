const SAMPLE_RATE = 22050;

function toWavUri(samples: Float32Array): string {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);
  const writeStr = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + samples.length * 2, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, SAMPLE_RATE, true);
  view.setUint32(28, SAMPLE_RATE * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, samples.length * 2, true);
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(44 + i * 2, s * 32767, true);
  }
  const bytes = new Uint8Array(buffer);
  let bin = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return "data:audio/wav;base64," + btoa(bin);
}

function noise(duration: number): Float32Array {
  const n = Math.floor(duration * SAMPLE_RATE);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) out[i] = Math.random() * 2 - 1;
  return out;
}

function tone(duration: number, freq: number, type: OscillatorType = "sine", decay = 0.001): Float32Array {
  const n = Math.floor(duration * SAMPLE_RATE);
  const out = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SAMPLE_RATE;
    const env = Math.exp(-decay * t * SAMPLE_RATE);
    out[i] = Math.sin(2 * Math.PI * freq * t) * env;
  }
  return out;
}

function sweep(duration: number, from: number, to: number, type: OscillatorType = "square", decay = 0.002): Float32Array {
  const n = Math.floor(duration * SAMPLE_RATE);
  const out = new Float32Array(n);
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / duration;
    const freq = from + (to - from) * t;
    phase += (2 * Math.PI * freq) / SAMPLE_RATE;
    const env = Math.exp(-decay * i);
    out[i] = Math.sin(phase) * env * 0.5;
  }
  return out;
}

function mix(...parts: (Float32Array | { buf: Float32Array; gain: number })[]): Float32Array {
  const len = Math.max(...parts.map((p) => ("buf" in p ? p.buf.length : p.length)));
  const out = new Float32Array(len);
  for (const p of parts) {
    const buf = "buf" in p ? p.buf : p;
    const gain = "buf" in p ? p.gain : 1;
    for (let i = 0; i < buf.length; i++) out[i] += buf[i] * gain;
  }
  return out;
}

export interface SoundDef {
  name: string;
  uri: string;
  loop?: boolean;
}

export function buildSounds(): SoundDef[] {
  const click = toWavUri(tone(0.06, 880, "square", 0.03));
  const glitch = toWavUri(mix({ buf: noise(0.18), gain: 0.7 }));
  const whisper = toWavUri(mix({ buf: noise(1.4), gain: 0.5 }, { buf: tone(1.4, 180, "sine", 0.0008), gain: 0.25 }));
  const droneA = tone(8, 55, "sine", 0.00004);
  const droneB = tone(8, 55.8, "sine", 0.00004);
  const ambient = toWavUri(mix({ buf: droneA, gain: 0.5 }, { buf: droneB, gain: 0.5 }, { buf: noise(8), gain: 0.05 }));
  const jump = toWavUri(sweep(0.09, 300, 900, "square", 0.01));
  const death = toWavUri(sweep(0.5, 400, 60, "sawtooth", 0.002));
  const win = toWavUri(
    mix(
      { buf: tone(0.18, 523, "triangle", 0.008), gain: 0.7 },
      { buf: tone(0.18, 659, "triangle", 0.008), gain: 0.7 },
      { buf: tone(0.3, 784, "triangle", 0.006), gain: 0.7 }
    )
  );
  const enter = toWavUri(mix({ buf: tone(2.2, 41, "sine", 0.0005), gain: 0.6 }, { buf: noise(2.2), gain: 0.08 }));
  const footstep = toWavUri(tone(0.05, 120, "sine", 0.02));

  return [
    { name: "ui.click", uri: click },
    { name: "glitch", uri: glitch },
    { name: "whisper", uri: whisper, loop: true },
    { name: "ambient", uri: ambient, loop: true },
    { name: "minigame.jump", uri: jump },
    { name: "minigame.death", uri: death },
    { name: "minigame.win", uri: win },
    { name: "underworld.enter", uri: enter },
    { name: "footsteps", uri: footstep }
  ];
}
