'use client';
import { useEffect, useRef } from 'react';

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  /^(input|textarea|select)$/i.test(target.tagName);

/** Calls `onMatch` when the user types `sequence` anywhere on the page. */
export const useKeySequence = (sequence: string, onMatch: () => void) => {
  const buffer = useRef('');
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
      if (e.key.length !== 1) return;
      buffer.current = (buffer.current + e.key.toLowerCase()).slice(
        -sequence.length,
      );
      if (buffer.current === sequence) {
        buffer.current = '';
        onMatch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sequence, onMatch]);
};
