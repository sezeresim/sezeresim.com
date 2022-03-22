import * as React from 'react'

import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <>
      <Seo templateTitle='Home' />
      <div className='flex flex-col justify-center md:flex-row md:h-96 md:items-center md:justify-between'>
        <div className='order-1 w-full md:mr-28'>
          <div className='mb-8'>
            <h1 className='font-medium mt-8 text-3xl text-justify text-primary md:leading-snug md:text-5xl dark:text-gray-100'>
              <span className='text-blue-500 underline'>Sezer Esim</span>
              <br />
              Software Engineer
            </h1>
          </div>
          <p className='mb-9 text-justify text-primary dark:text-gray-400'>
            An engineer who continues to learn and improve.
          </p>
        </div>
      </div>
    </>
  )
}
