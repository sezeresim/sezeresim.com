import '@/styles/globals.css';

import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import Layout from '@/components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' enableSystem={true} defaultTheme='dark'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
