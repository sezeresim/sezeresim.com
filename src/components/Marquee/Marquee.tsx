import { cn } from '@/lib/utils';

type Props = {
  items: string[];
  className?: string;
};

/** Infinite horizontal scroller. Pauses on hover and under reduced motion. */
const Marquee = ({ items, className }: Props) => {
  const row = [...items, ...items];
  return (
    <div
      className={cn(
        'group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]',
        className,
      )}
      aria-label={items.join(', ')}
    >
      <ul className='flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]'>
        {row.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length}
            className='rounded-full border border-slate-200 bg-white/70 px-4 py-1.5 font-mono text-xs whitespace-nowrap text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Marquee;
