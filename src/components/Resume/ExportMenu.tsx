'use client';
import { useState } from 'react';

import { Check, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { toMarkdown, toPlainText, toVCard } from './export';

const download = (name: string, content: string, type: string) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

/** Copy as text/Markdown, download a vCard, open JSON/TXT representations. */
const ExportMenu = () => {
  const [done, setDone] = useState<string | null>(null);

  const copy = async (label: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(label);
      setTimeout(() => setDone(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' aria-label='Export options'>
          {done ? (
            <Check className='mr-2 h-4 w-4 text-ribbon' aria-hidden />
          ) : (
            <Download className='mr-2 h-4 w-4' aria-hidden />
          )}
          {done ? 'Copied' : 'Export'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='font-mono text-xs'>
        <DropdownMenuItem onClick={() => copy('text', toPlainText())}>
          Copy as plain text
          <kbd className='keycap-sm ml-auto'>C</kbd>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => copy('markdown', toMarkdown())}>
          Copy as Markdown
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => download('sezer-esim.vcf', toVCard(), 'text/vcard')}
        >
          Add to contacts (.vcf)
          <kbd className='keycap-sm ml-auto'>V</kbd>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href='resume.json' target='_blank' rel='noreferrer'>
            resume.json
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href='resume.txt' target='_blank' rel='noreferrer'>
            resume.txt
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ExportMenu;
