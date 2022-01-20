import * as React from 'react'

import BlogCard from '@/components/BlogCard'
import NextImage from '@/components/NextImage'
import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <>
      <Seo templateTitle='Home' />
      <main className='min-h-main'>
        {/*  */}
        <div className='flex flex-col justify-center layout mt-8 md:flex-row md:h-96 md:items-center md:justify-between'>
          <div className='order-1 w-full md:mr-28'>
            <div className='mb-10'>
              <h1 className='font-medium mt-8 text-3xl text-center text-primary md:leading-snug md:text-5xl md:text-justify'>
                Hi, I'm Sezer <br />
                Software Engineer
              </h1>
            </div>
            <p className='mb-9 text-center text-primary md:text-justify'>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.
            </p>
          </div>
          <div className='flex justify-center order md:order-1'>
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
        <div className='bg-light-blue pb-8 pt-2 md:h-96'>
          <div className='flex items-center justify-between layout mb-5 mt-5'>
            <div>
              <h3 className='font-normal'>Recent Posts</h3>
            </div>
            <div>
              <a className='text-blue-400 hover:cursor-pointer hover:text-blue-600'>
                View All
              </a>
            </div>
          </div>
          <div className='gap-5 grid layout md:grid-cols-2'>
            {/* Blog Card */}
            {[
              {
                title: 'Making a design system from scratch',
                date: '12 Feb 2020',
                description:
                  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
              },
              {
                title: 'Creating pixel perfect icons in Figma',
                date: '12 Feb 2020',
                description:
                  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
              },
            ].map((item, index) => (
              <BlogCard
                key={index}
                title={item.title}
                date={item.date}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className='layout pb-8 pt-2'>
          <div className='mb-5 mt-5'>
            <h3 className='font-normal'>Recent Posts</h3>
          </div>
          {['', '', ''].map((item, index) => (
            <div key={index} className='border-b flex mb-8 pb-9'>
              card
            </div>
          ))}
        </div>
        {/* Works */}
      </main>
    </>
  )
}
