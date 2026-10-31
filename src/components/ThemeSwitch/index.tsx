'use client';
import { useSyncExternalStore } from 'react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';

import { MonitorCheck, Moon, Sun } from 'lucide-react';
import { useReducedMotion } from 'motion/react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

const options = [
  { value: Theme.LIGHT, label: 'Light', icon: Sun },
  { value: Theme.DARK, label: 'Dark', icon: Moon },
  { value: Theme.SYSTEM, label: 'System', icon: MonitorCheck },
];

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  // true after hydration; false during SSR so server and client markup match
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const changeTheme = (next: Theme) => {
    // Cross-fade the whole page when the browser supports view transitions.
    if (reduceMotion || !('startViewTransition' in document)) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          aria-label='Toggle theme'
          className='relative overflow-hidden'
        >
          <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {options.map(({ value, label, icon: ItemIcon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => changeTheme(value)}
            className={cn(
              mounted && theme === value && 'bg-slate-100 dark:bg-slate-800',
            )}
          >
            <ItemIcon className='mr-2 h-4 w-4' /> {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
