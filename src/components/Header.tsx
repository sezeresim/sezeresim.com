import Link from 'next/link';

import ThemeSwitch from './ThemeSwitch';

const links = [
  { href: '/posts', label: 'Posts' },
  { href: '/projects', label: 'Projects' },
  {
    href: '/gym-logs',
    label: 'GymLog',
  },
];

const Header = () => {
  return (
    <header className='flex h-20 items-center'>
      <div className='flex items-center justify-between layout'>
        <Link
          href='/'
          className='font-bold dark:text-gray-100 hover:dark:text-blue-500 hover:text-blue-500'
        >
          Home
        </Link>
        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className='inline-flex items-center'>
                <Link
                  href={href}
                  className='dark:text-gray-100 hover:dark:text-blue-500 hover:text-blue-500'
                >
                  {label}
                </Link>
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
};

export default Header;
