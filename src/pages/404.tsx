import * as React from 'react';

import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />
      <main className='flex items-center justify-center min-h-main'>
        <h1 className='text-4xl md:text-6xl dark:text-gray-500'>Page Not Found</h1>
      </main>
    </>
  );
}
