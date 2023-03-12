import Head from 'next/head';
import { useRouter } from 'next/router';
import { FC } from 'react';

const defaultMeta = {
  applicationName: 'Sezer Esim',
  title: 'Sezer Esim',
  siteName: 'Sezer Esim',
  description: 'Sezer Esim',
  url: 'https://sezeresim.vercel.app',
  type: 'website',
  robots: 'follow, index',
  image:
    'https://s.vercel.app/api?url=https://sezeresim.vercel.app/&width=1280&height=720',
};

type SeoProps = {
  date?: string;
  templateTitle?: string;
} & Partial<typeof defaultMeta>;

const Seo: FC<SeoProps> = (props) => {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta['title'] = props.templateTitle
    ? `${props.templateTitle} | ${meta.applicationName}`
    : meta.title;

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name='robots' content={meta.robots} />
      <meta content={meta.description} name='description' />
      <meta property='og:url' content={`${meta.url}${router.asPath}`} />
      <link rel='canonical' href={`${meta.url}${router.asPath}`} />

      {/* Open Graph */}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content={meta.siteName} />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta name='image' property='og:image' content={meta.image} />

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@th_clarence' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
      {meta.date && (
        <>
          <meta property='article:published_time' content={meta.date} />
          <meta name='publish_date' property='og:publish_date' content={meta.date} />
          <meta name='author' property='article:author' content='Theodorus Clarence' />
        </>
      )}

      {/* Favicons */}
      <link rel='apple-touch-icon' sizes='180x180' href='/static/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/static/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/static/favicon-16x16.png' />
      <link rel='manifest' href='/static/site.webmanifest' />

      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/static/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />
    </Head>
  );
};

export default Seo;
