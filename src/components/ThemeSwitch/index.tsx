import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Moon, Sun } from '@/components/Icons';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='duration-200 text-2xl transition-all dark:text-gray-100 hover:dark:text-blue-500 hover:text-blue-500'
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
};

export default ThemeSwitch;
