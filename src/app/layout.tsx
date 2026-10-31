import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import SiteChrome from '@/components/Layout/SiteChrome';
import { PROFILES, SITE } from '@/constants';

import Providers from './providers';
import { SHARED_METADATA } from './shared-metadata';

import './globals.css';

const interFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  robots: { index: true, follow: true },
  applicationName: SITE.name,
  title: {
    template: `%s | ${SHARED_METADATA.title}`,
    default: SHARED_METADATA.title,
  },
  description: SHARED_METADATA.description,
  icons: {
    icon: [
      { url: '/static/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/static/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/static/favicon.ico',
    apple: '/static/apple-touch-icon.png',
  },
  manifest: '/static/site.webmanifest',
  openGraph: {
    type: 'website',
    siteName: SHARED_METADATA.title,
    description: SHARED_METADATA.description,
    title: {
      template: `%s | ${SHARED_METADATA.title}`,
      default: SHARED_METADATA.title,
    },
    locale: SITE.locale,
    url: '/',
  },
  alternates: { canonical: '/' },
  twitter: {
    card: 'summary_large_image',
    site: `@${PROFILES.twitter.username}`,
    creator: `@${PROFILES.twitter.username}`,
    title: {
      template: `%s | ${SHARED_METADATA.title}`,
      default: SHARED_METADATA.title,
    },
    description: SHARED_METADATA.description,
  },
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
      className={`${interFont.variable} ${jetbrainsMono.variable} font-sans`}
    >
      <body className='flex min-h-screen flex-col'>
        <Providers>
          <SiteChrome>
            <Header />
          </SiteChrome>
          <main className='layout flex-1'>{children}</main>
          <SiteChrome>
            <Footer />
          </SiteChrome>
        </Providers>
      </body>
    </html>
  );
}
