import UnstyledLink from '@/components/Links/UnstyledLink';
import { SITE, socialAccounts } from '@/constants';

const Footer = () => {
  return (
    <footer className='mt-16 border-t border-slate-200 dark:border-white/10 print:hidden'>
      <div className='layout flex flex-col items-center justify-between gap-4 py-8 text-sm text-slate-500 sm:flex-row dark:text-slate-400'>
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <ul className='flex items-center gap-4'>
          {socialAccounts.map(({ name, url, icon: Icon }) => (
            <li key={name}>
              <UnstyledLink
                href={url}
                aria-label={name}
                className='inline-flex rounded-md p-1 transition-colors hover:text-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:outline-none'
              >
                <Icon className='h-5 w-5' aria-hidden />
              </UnstyledLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
