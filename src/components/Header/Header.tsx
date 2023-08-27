import { BrainCircuit } from 'lucide-react';
import Link from 'next/link';

import ThemeSwitch from '@/components/ThemeSwitch';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

const links = [
  { href: '/posts', label: 'Posts' },
  { href: '/projects', label: 'Projects' },
];

const Header = () => {
  return (
    <header className='flex h-20 items-center'>
      <div className='flex items-center justify-between layout'>
        <Link
          href='/'
          className='mr-6 flex items-center space-x-2'
          aria-label='Home Page'
        >
          <BrainCircuit className='m-2' />
          <span className='class="hidden font-bold sm:inline-block"'>
            Sezer Esim
          </span>
        </Link>
        <div className='flex items-center space-x-1'>
          <NavigationMenu>
            <NavigationMenuList>
              {links.map(({ href, label }) => (
                <NavigationMenuItem key={`${href}${label}`}>
                  <Link
                    href={href}
                    legacyBehavior
                    passHref
                    aria-label={label + ' page'}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
