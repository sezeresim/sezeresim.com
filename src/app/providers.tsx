'use client';
import { ThemeProvider } from 'next-themes';
import React from 'react';

import Layout from '@/components/Layout/Layout';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider attribute='class' enableSystem={true} defaultTheme='dark'>
      <Layout>{children}</Layout>
    </ThemeProvider>
  );
};

export default Providers;
