'use client';
import { useRef } from 'react';

import { cn } from '@/lib/utils';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

/** Card whose border and surface light up around the cursor. */
const SpotlightCard = ({ children, className, ...rest }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn('spotlight card-surface', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
