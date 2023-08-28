import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 | Page not found',
  description: 'Page not found',
};

export default function NotFoundPage() {
  return (
    <section>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          <h1 className='flex items-center mt-3 text-2xl font-semibold text-slate-800 dark:text-white md:text-3xl'>
            Page not found
          </h1>
        </div>
      </div>
    </section>
  );
}
