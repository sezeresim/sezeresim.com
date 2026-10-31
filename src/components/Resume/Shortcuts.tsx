'use client';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { toPlainText, toVCard } from './export';
import { printSheet } from './PrintButton';

type Props = {
  onToggleLog: () => void;
  onEscape: () => void;
  onToggleSound: () => void;
  onFly: () => void;
};

const isTyping = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  /^(input|textarea|select)$/i.test(target.tagName);

/** P print · T theme · L git log · C copy · V vCard · S sound · F plane · Esc */
const Shortcuts = ({ onToggleLog, onEscape, onToggleSound, onFly }: Props) => {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return;
      if (isTyping(e.target)) return;
      switch (e.key.toLowerCase()) {
        case 'p':
          e.preventDefault();
          printSheet();
          break;
        case 't':
          setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
          break;
        case 'l':
          onToggleLog();
          break;
        case 'c':
          void navigator.clipboard?.writeText(toPlainText());
          break;
        case 'v': {
          const url = URL.createObjectURL(
            new Blob([toVCard()], { type: 'text/vcard' }),
          );
          const a = document.createElement('a');
          a.href = url;
          a.download = 'sezer-esim.vcf';
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 1000);
          break;
        }
        case 's':
          onToggleSound();
          break;
        case 'f':
          onFly();
          break;
        case 'escape':
          onEscape();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resolvedTheme, setTheme, onToggleLog, onEscape, onToggleSound, onFly]);

  return null;
};

export default Shortcuts;
