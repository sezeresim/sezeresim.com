import * as React from 'react'

import Seo from '@/components/Seo'

export default function HomePage() {
  return (
    <>
      <Seo templateTitle='Sezer Esim' />
      <main className='flex flex-col items-center justify-center layout min-h-screen'>
        <p className='text-3xl'>
          <strong>Sezer Esim</strong> is a software engineer based in the
          Turkey.🇹🇷
        </p>
      </main>
    </>
  )
}
