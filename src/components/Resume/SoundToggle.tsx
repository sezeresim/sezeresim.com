'use client';
import { Volume2, VolumeX } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = { enabled: boolean; onToggle: () => void };

const SoundToggle = ({ enabled, onToggle }: Props) => (
  <Button
    variant='outline'
    size='icon'
    onClick={onToggle}
    aria-pressed={enabled}
    aria-label={
      enabled ? 'Turn typewriter sound off' : 'Turn typewriter sound on'
    }
    title='Typewriter sound (S)'
  >
    {enabled ? (
      <Volume2 className='h-4 w-4 text-ribbon' aria-hidden />
    ) : (
      <VolumeX className='h-4 w-4' aria-hidden />
    )}
  </Button>
);

export default SoundToggle;
