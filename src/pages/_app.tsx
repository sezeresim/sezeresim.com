import { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'

import Layout from '@/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' enableSystem={false} defaultTheme='dark'>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
