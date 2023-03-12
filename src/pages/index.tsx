import { motion, useMotionValue, useTransform } from 'framer-motion';

import Seo from '@/components/Seo';
export default function HomePage() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 150], [1.5, 0.5]);
  const rotate = useTransform(x, [-150, 150], [-90, 90]);
  return (
    <>
      <Seo templateTitle='Home' />
      <div className='flex flex-col justify-center min-h-main md:flex-row md:items-center md:justify-between'>
        <div className='order-1 w-full md:mr-28'>
          <motion.div
            style={{
              x: x,
              scale: scale,
              rotate: rotate,
              cursor: 'grab',
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            whileTap={{ cursor: 'grabbing' }}
          >
            <div className='mb-8'>
              <h1 className='font-medium mt-8 text-3xl text-justify text-primary md:leading-snug md:text-5xl dark:text-gray-100'>
                <span>I am </span>
                <span className='animate-pulse cursor-pointer duration-300 text-blue-500 transition-all underline hover:no-underline hover:text-purple-600'>
                  Sezer Esim
                </span>
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
}
