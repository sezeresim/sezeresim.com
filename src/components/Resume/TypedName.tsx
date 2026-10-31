'use client';
import { type CSSProperties, useEffect, useState } from 'react';

type Props = { text: string; className?: string };

/**
 * Types the text with a pure CSS steps() animation. The full text is in the
 * DOM from the first byte (SSR, print, screen readers); only the visible width
 * animates. Any key press, click or scroll completes it immediately.
 */
const TypedName = ({ text, className }: Props) => {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const finish = () => setDone(true);
    const opts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener('keydown', finish, opts);
    window.addEventListener('pointerdown', finish, opts);
    window.addEventListener('wheel', finish, opts);
    window.addEventListener('touchmove', finish, opts);
    return () => {
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
      window.removeEventListener('wheel', finish);
      window.removeEventListener('touchmove', finish);
    };
  }, []);

  return (
    <span
      className={`typed ${done ? 'typed-done' : ''} ${className ?? ''}`}
      style={{ '--n': text.length } as CSSProperties}
    >
      {text}
    </span>
  );
};

export default TypedName;
