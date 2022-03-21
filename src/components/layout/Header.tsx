import * as React from 'react'

import useDarkMode from '@/hooks/useDarkMode'

import UnstyledLink from '@/components/links/UnstyledLink'

import { Moon, Sun } from '../icons'

const links = [{ href: '/blog', label: 'Blog' }]

export default function Header() {
  const { isDarkMode, darkModeToogle } = useDarkMode()
  return (
    <header className='py-10'>
      <div className='flex h-14 items-center justify-between layout'>
        <UnstyledLink
          href='/'
          className='font-bold dark:text-gray-100 hover:text-gray-600'
        >
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className='inline-flex items-center'>
                <UnstyledLink
                  href={href}
                  className='dark:text-gray-100 hover:text-gray-600'
                >
                  {label}
                </UnstyledLink>
              </li>
            ))}
            <li className='inline-flex items-center'>
              <button
                onClick={darkModeToogle}
                className='text-2xl dark:text-gray-100'
              >
                {isDarkMode ? <Sun /> : <Moon />}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
