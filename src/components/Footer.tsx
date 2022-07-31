import React from 'react'

import { socialAccounts } from '@/constants'

import UnstyledLink from './ui/links/UnstyledLink'

const Footer = () => {
  return (
    <footer>
      <div className='bg-white flex flex-wrap gap-8 h-28 items-center justify-center dark:bg-gray-900 dark:text-gray-100'>
        {socialAccounts.map((el, key) => (
          <UnstyledLink key={key} href={el.url}>
            {el.name}
          </UnstyledLink>
        ))}
      </div>
    </footer>
  )
}

export default Footer
