import { motion } from 'framer-motion';

import Seo from '@/components/Seo';

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
                <span>I am </span>
                <span className='duration-300 text-blue-500 underline'> Sezer Esim</span>
                ,
                <br />
                <span>a software engineer</span>
              </h1>
            </div>
          </motion.div>
          <p className='mb-9 text-justify text-primary dark:text-gray-400'></p>
        </div>
      </div>
    </>
  );
};

export default HomePage;
