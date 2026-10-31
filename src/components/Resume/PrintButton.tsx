'use client';
import { Printer } from 'lucide-react';

import { Button } from '@/components/ui/button';

/** Lifts the sheet out of the machine, then opens the print dialog. */
export const printSheet = () => {
  const root = document.documentElement;
  root.dataset.printing = '1';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  setTimeout(
    () => {
      window.print();
      delete root.dataset.printing;
    },
    reduce ? 0 : 220,
  );
};

const PrintButton = () => (
  <Button
    variant='outline'
    size='sm'
    onClick={printSheet}
    className='shrink-0 whitespace-nowrap print:hidden'
  >
    <Printer className='mr-2 h-4 w-4' aria-hidden />
    Save as PDF
  </Button>
);

export default PrintButton;
