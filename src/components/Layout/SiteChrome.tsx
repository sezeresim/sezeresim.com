'use client';
import { usePathname } from 'next/navigation';

/** Paths rendered without the site header and footer (e.g. the unlisted CV). */
const BARE_PREFIXES = ['/cv/'];

type Props = { children: React.ReactNode };

/** Renders children (header/footer) unless the current route is a bare page. */
const SiteChrome = ({ children }: Props) => {
  const pathname = usePathname();
  if (BARE_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return <>{children}</>;
};

export default SiteChrome;
