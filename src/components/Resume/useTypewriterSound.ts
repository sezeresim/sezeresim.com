'use client';
import { useCallback, useRef, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'cv-sound';

/* Tiny external store over localStorage so the preference is hydration-safe. */
const listeners = new Set<() => void>();
const read = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};
const write = (value: boolean) => {
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l());
};
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener('storage', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('storage', cb);
  };
};

/**
 * Opt-in typewriter sounds synthesized with the Web Audio API (no files).
 * The AudioContext is only created inside a user gesture.
 */
export const useTypewriterSound = () => {
  const enabled = useSyncExternalStore(subscribe, read, () => false);
  const ctx = useRef<AudioContext | null>(null);

  const ensure = () => {
    if (!ctx.current) ctx.current = new AudioContext();
    if (ctx.current.state === 'suspended') void ctx.current.resume();
    return ctx.current;
  };

  /** Short filtered noise burst: a type bar hitting the platen. */
  const tick = useCallback((at = 0, gain = 0.25) => {
    if (!read()) return;
    const ac = ensure();
    const t = ac.currentTime + at;
    const len = Math.floor(ac.sampleRate * 0.03);
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++)
      data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const filter = ac.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2200 + Math.random() * 600;
    filter.Q.value = 1.2;
    const g = ac.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    src.connect(filter).connect(g).connect(ac.destination);
    src.start(t);
  }, []);

  /** The margin bell. */
  const ding = useCallback((at = 0) => {
    if (!read()) return;
    const ac = ensure();
    const t = ac.currentTime + at;
    const osc = ac.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1760;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.18, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    osc.connect(g).connect(ac.destination);
    osc.start(t);
    osc.stop(t + 0.5);
  }, []);

  const toggle = () => {
    const next = !enabled;
    write(next);
    if (next) ensure();
    return next;
  };

  return { enabled, toggle, tick, ding };
};
