import * as React from 'react'

import NextImage from '@/components/NextImage'
import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <>
      <Seo templateTitle='Home' />
      <main className='min-h-main'>
        {/*  */}
        <div className='flex h-96 justify-between layout mt-36'>
          <div className='mr-28'>
            <div className='mb-10'>
              <h1 className='font-bold leading-normal text-5xl text-primary'>
                Hi, I'm Sezer <br />
                Software Engineer
              </h1>
            </div>
            <p className='text-primary'>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
          <div>
            <NextImage
              height='243'
              width='243'
              alt='Logo'
              imgClassName='rounded-full'
              src='https://media-exp1.licdn.com/dms/image/C5603AQEIbzxYcf5zpw/profile-displayphoto-shrink_400_400/0/1642148399270?e=1648080000&v=beta&t=3TRAWDDOov02W4_puxEJndiyX3ANjMuHAqXE4cxYAD4'
            />
          </div>
        </div>
        {/* Blog */}
        <div className='bg-light-blue h-96 py-8'>
          <div className='layout'>Recent posts</div>
        </div>
        {/* Works */}
      </main>
    </>
  )
}
