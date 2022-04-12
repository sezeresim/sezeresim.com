import * as React from 'react'

import UnstyledLink from '@/components/ui/links/UnstyledLink'

import ThemeSwitch from '../ThemeSwitch'

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
]

export default function Header() {
  return (
    <header className='py-10'>
      <div className='flex h-14 items-center justify-between layout'>
        <UnstyledLink
          href='/'
          className='font-bold dark:text-gray-100 hover:dark:text-blue-500 hover:text-blue-500'
        >
          Home
        </UnstyledLink>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className='inline-flex items-center'>
                <UnstyledLink
                  href={href}
                  className='dark:text-gray-100 hover:dark:text-blue-500 hover:text-blue-500'
                >
                  {label}
                </UnstyledLink>
              </li>
            ))}
            <li className='inline-flex items-center'>
              <ThemeSwitch />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
