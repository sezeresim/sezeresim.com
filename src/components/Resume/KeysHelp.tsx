'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const KEYS: [string, string][] = [
  ['P', 'print / save as PDF'],
  ['T', 'toggle theme'],
  ['L', 'git log view'],
  ['C', 'copy as plain text'],
  ['V', 'download vCard'],
  ['S', 'typewriter sound'],
  ['F', 'fold into a paper plane'],
  ['Esc', 'back to normal view'],
];

const KeysHelp = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant='outline' size='icon' aria-label='Keyboard shortcuts'>
        <kbd className='text-sm font-semibold'>?</kbd>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align='end' className='w-56 p-3 font-mono text-xs'>
      <p className='mb-2 text-[10px] tracking-wider text-slate-500 uppercase'>
        Keys
      </p>
      <dl className='space-y-1.5'>
        {KEYS.map(([k, label]) => (
          <div key={k} className='flex items-center gap-3'>
            <dt>
              <kbd className='keycap-sm'>{k}</kbd>
            </dt>
            <dd className='text-slate-600 dark:text-slate-300'>{label}</dd>
          </div>
        ))}
      </dl>
      <p className='mt-3 text-[10px] text-slate-500'>
        Tip: type <span className='text-ribbon'>git log</span> anywhere.
      </p>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default KeysHelp;
