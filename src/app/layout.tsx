import '@/styles/globals.css';

import { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import Providers from './providers';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${interFont.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  applicationName: 'Sezer Esim',
  title: 'Sezer Esim',
  description: 'Sezer Esim',
  robots: 'follow, index',
};
