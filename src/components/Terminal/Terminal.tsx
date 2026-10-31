'use client';
import { useEffect, useState } from 'react';

import { useReducedMotion } from 'motion/react';

export type TerminalLine = { cmd: string; out: string[] };

type Props = { lines: TerminalLine[]; title?: string };

/** Fake shell that "types" commands and prints their output one by one. */
const Terminal = ({ lines, title = 'sezer@dev ~' }: Props) => {
  const reduceMotion = useReducedMotion();
  // Number of characters revealed across the whole script.
  const script = lines.flatMap((l) => [`$ ${l.cmd}`, ...l.out]);
  const total = script.join('\n').length;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const text = script.join('\n');
    const tick = () => {
      i += 1;
      setShown(i);
      if (i >= text.length) return;
      // Commands type slowly, outputs print fast, pause at line breaks.
      const ch = text[i - 1];
      const inCommand =
        text.lastIndexOf('$ ', i) > text.lastIndexOf('\n', i - 1);
      const delay = ch === '\n' ? 260 : inCommand ? 55 : 12;
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  const visible = reduceMotion ? total : shown;
  const text = script.join('\n').slice(0, visible);
  const done = visible >= total;

  return (
    <div className='card-surface overflow-hidden font-mono text-[13px] leading-relaxed shadow-xl shadow-slate-900/5 dark:shadow-black/40'>
      <div className='flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/5'>
        <span className='h-3 w-3 rounded-full bg-[#ff5f57]' />
        <span className='h-3 w-3 rounded-full bg-[#febc2e]' />
        <span className='h-3 w-3 rounded-full bg-[#28c840]' />
        <span className='ml-3 text-xs text-slate-500 dark:text-slate-400'>
          {title}
        </span>
      </div>
      <pre
        className='min-h-[16rem] px-4 py-4 whitespace-pre-wrap text-slate-800 dark:text-slate-200'
        aria-live='polite'
      >
        {text.split('\n').map((line, i) => (
          <span key={i} className='block'>
            {line.startsWith('$ ') ? (
              <>
                <span className='text-sky-600 dark:text-sky-400'>$</span>
                <span className='text-slate-900 dark:text-white'>
                  {line.slice(1)}
                </span>
              </>
            ) : (
              <span className='text-slate-600 dark:text-slate-300'>{line}</span>
            )}
          </span>
        ))}
        <span
          aria-hidden
          className={`ml-0.5 inline-block h-[1.1em] w-[0.55em] translate-y-[3px] bg-sky-500 ${done ? 'animate-pulse' : ''}`}
        />
      </pre>
    </div>
  );
};

export default Terminal;
