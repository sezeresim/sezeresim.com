import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';
import { notFound } from 'next/navigation';

import { format } from 'date-fns';

import Resume from '@/components/Resume/Resume';
import { RESUME } from '@/constants/resume';

/**
 * Unlisted resume page. The path segment must equal the CV_TOKEN env var, so
 * the URL is only known to people it is shared with. Not linked anywhere,
 * excluded from the sitemap and marked noindex.
 */
const token = process.env.CV_TOKEN;

const courier = Courier_Prime({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-courier',
  display: 'swap',
});

export const dynamicParams = false;

export const generateStaticParams = async () => (token ? [{ token }] : []);

export const metadata: Metadata = {
  title: `${RESUME.name} – CV`,
  description: `Resume of ${RESUME.name}, ${RESUME.role}.`,
  robots: { index: false, follow: false, nocache: true },
  alternates: { canonical: null },
};

export default async function CvPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token: requested } = await params;
  if (!token || requested !== token) notFound();

  // Static page: this is the build date, so "updated" can never go stale.
  const updated = format(new Date(), 'yyyy-MM-dd');

  return (
    <div className={courier.variable}>
      <Resume updated={updated} />
    </div>
  );
}
