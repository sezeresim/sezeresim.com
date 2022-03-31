import * as React from 'react'

import Footer from './Footer'
import Header from './Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-white dark:bg-gray-900'>
      <Header />
      <main className='layout min-h-main'>{children}</main>
      <Footer />
    </div>
  )
}
