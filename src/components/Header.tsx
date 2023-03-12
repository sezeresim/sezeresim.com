import * as React from 'react';

import UnstyledLink from '@/components/Links/UnstyledLink';

import ThemeSwitch from './ThemeSwitch';

const links = [
  { href: '/posts', label: 'Posts' },
  { href: '/projects', label: 'Projects' },
];

export default function Header() {
  return (
    <header className='flex h-20 items-center'>
      <div className='flex items-center justify-between layout'>
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
  );
}
