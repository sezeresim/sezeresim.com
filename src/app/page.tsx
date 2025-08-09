'use client';
import { cloneElement } from 'react';

import { motion } from 'framer-motion';

import UnstyledLink from '@/components/Links/UnstyledLink';
import { socialAccounts } from '@/constants';

export default function Home() {
  return (
    <div className='flex flex-col justify-center md:flex-row md:items-center md:justify-between min-h-main'>
      <div className='order-1 w-full md:mr-28'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className='mb-8 text-center md:text-left'>
            <h1 className='font-medium mt-8 text-3xl md:leading-snug md:text-5xl text-primary dark:text-gray-100'>
              <span className='underline decoration-2 underline-offset-4 hover:text-sky-500 transition-colors duration-200'>
                Sezer Esim
              </span>
              <br />
              <span className='opacity-90 font-light'>Software Engineer</span>
            </h1>

            <div className='flex flex-wrap gap-4 sm:gap-8 items-center dark:text-gray-100 mt-6 justify-center md:justify-start'>
              {socialAccounts.map((el, key) => (
                <UnstyledLink
                  key={key}
                  href={el.url}
                  className='text-slate-600 dark:text-slate-300'
                  aria-label={el.name}
                >
                  {cloneElement(<el.icon />, {
                    className:
                      'h-6 w-6 transition-transform duration-200 hover:scale-110 hover:text-sky-500',
                  })}
                </UnstyledLink>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
