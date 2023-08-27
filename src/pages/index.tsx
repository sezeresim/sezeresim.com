import { motion } from 'framer-motion';
import { cloneElement } from 'react';

import UnstyledLink from '@/components/Links/UnstyledLink';
import Seo from '@/components/Seo';
import { socialAccounts } from '@/constants';

const HomePage = () => {
  return (
    <>
      <Seo templateTitle='Home' />
      <div className='flex flex-col justify-center min-h-main md:flex-row md:items-center md:justify-between'>
        <div className='order-1 w-full md:mr-28'>
          <motion.div
            animate={{ zoom: [0, 1.2, 1] }}
            transition={{ ease: 'easeOut', duration: 2 }}
          >
            <div className='mb-8'>
              <h1 className='font-medium mt-8 text-3xl text-justify text-primary md:leading-snug md:text-5xl dark:text-gray-100'>
                <span className='underline'>Sezer Esim</span>
                <br />
                <div className='inline-flex items-center'>
                  <span>Software Engineer</span>
                </div>
              </h1>
              <div className='flex flex-wrap gap-8 items-center  dark:text-gray-100 mt-4'>
                {socialAccounts.map((el, key) => (
                  <UnstyledLink
                    key={key}
                    href={el.url}
                    className='text-slate-600 dark:text-slate-300'
                    aria-label={el.name}
                  >
                    {cloneElement(<el.icon />, {
                      className: 'h-6 w-6',
                    })}
                  </UnstyledLink>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
