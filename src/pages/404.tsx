import { Ban } from 'lucide-react';
import * as React from 'react';

import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />
      <section>
        <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
          <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
            <h1 className='flex items-center mt-3 text-2xl font-semibold text-slate-800 dark:text-white md:text-3xl'>
              <Ban className='mr-2 h-6' /> Page not found
            </h1>
          </div>
        </div>
      </section>
    </>
  );
}
