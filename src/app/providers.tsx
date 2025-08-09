'use client';
import React from 'react';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/Layout/Layout';

type Props = { children: React.ReactNode };

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute='class'
      enableSystem={true}
      defaultTheme='system'
      disableTransitionOnChange
    >
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
};

export default Providers;
