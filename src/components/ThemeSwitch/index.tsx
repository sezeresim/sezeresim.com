import { useTheme } from 'next-themes';

import { MonitorCheck, Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}

const ThemeSwitch = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme(Theme.LIGHT)}>
          <Sun className='mr-2 h-4 w-4' /> Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.DARK)}>
          <Moon className='mr-2 h-4 w-4' /> Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(Theme.SYSTEM)}>
          <MonitorCheck className='mr-2 h-4 w-4' /> System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSwitch;
