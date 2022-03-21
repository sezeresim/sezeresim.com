import React from 'react'

import UnstyledLink from '../links/UnstyledLink'

const Footer = () => {
  const socialAccounts = [
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/sezeresim/',
    },
    {
      name: 'Github',
      url: 'www.github.com/sezeresim',
    },
    {
      name: 'Twitter',
      url: 'www.twitter.com/sezereesim',
    },
    {
      name: 'Instagram',
      url: 'www.instagram.com/sezereesim',
    },
  ]
  return (
    <footer>
      <div className='bg-white flex gap-8 h-28 items-center justify-center dark:bg-gray-900 dark:text-gray-100'>
        {socialAccounts.map(({ name, url }, key) => (
          <UnstyledLink key={key} href={url}>
            {name}
          </UnstyledLink>
        ))}
      </div>
    </footer>
  )
}

export default Footer
