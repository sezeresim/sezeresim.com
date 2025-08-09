import { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { PROFILES } from '@/constants';

import Providers from './providers';
import { SHARED_METADATA } from './shared-metadata';

import './globals.css';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${interFont.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/static/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/static/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/static/favicon-16x16.png'
        />
        <link rel='manifest' href='/static/site.webmanifest' />
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta
          name='msapplication-TileImage'
          content='/static/ms-icon-144x144.png'
        />
      </head>
      <body className='min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-50'>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL('https://sezeresim.vercel.app'),
  robots: { index: true, follow: true },
  applicationName: 'Sezer Esim',
  title: {
    template: `%s | ${SHARED_METADATA.title}`,
    default: SHARED_METADATA.title,
  },
  description: SHARED_METADATA.description,
  openGraph: {
    type: 'website',
    siteName: SHARED_METADATA.title,
    description: SHARED_METADATA.description,
    title: {
      template: `%s | ${SHARED_METADATA.title}`,
      default: SHARED_METADATA.title,
    },
    locale: 'en',
    url: '/',
  },
  alternates: { canonical: '/' },
  twitter: {
    card: 'summary_large_image',
    site: `@${PROFILES.twitter.username}`,
    title: {
      template: `%s | ${SHARED_METADATA.title}`,
      default: SHARED_METADATA.title,
    },
    description: SHARED_METADATA.description,
    creator: `@${PROFILES.twitter.username}`,
  },
};
