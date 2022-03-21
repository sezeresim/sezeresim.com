import * as React from 'react'

import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <>
      <Seo templateTitle='Home' />
      <main className='min-h-main'>
        <div className='flex flex-col justify-center layout mt-8 md:flex-row md:h-96 md:items-center md:justify-between'>
          <div className='order-1 w-full md:mr-28'>
            <div className='mb-10'>
              <h1 className='font-medium mt-8 text-3xl text-center text-primary md:leading-snug md:text-5xl md:text-justify dark:text-gray-100'>
                Hi,<span className='text-blue-500 underline'>I'm Sezer</span>{' '}
                <br />
                Software Engineer
              </h1>
            </div>
            <p className='mb-9 text-center text-primary md:text-justify dark:text-gray-400'>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
        </div>
        {/* Works */}
      </main>
    </>
  )
}
