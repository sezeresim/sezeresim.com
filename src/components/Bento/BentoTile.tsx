import SpotlightCard from '@/components/Spotlight/SpotlightCard';
import { cn } from '@/lib/utils';

type Props = {
  children: React.ReactNode;
  className?: string;
};

/** One cell of the bento grid: spotlight card with consistent padding. */
const BentoTile = ({ children, className }: Props) => (
  <SpotlightCard
    className={cn('flex card-glow flex-col overflow-hidden p-6', className)}
  >
    {children}
  </SpotlightCard>
);

export default BentoTile;
