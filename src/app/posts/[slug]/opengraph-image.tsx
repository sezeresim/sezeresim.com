import { ImageResponse } from 'next/og';

import { allPosts } from 'contentlayer/generated';

import { SHARED_METADATA } from '@/app/shared-metadata';
import OgImage from '@/components/OGImage/OgImage';
import { getInterSemiBoldFont } from '@/components/OGImage/utils';
import { SITE } from '@/constants';

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post.slug }));

export const alt = SHARED_METADATA.title;
export const size = {
  width: SHARED_METADATA.image.width,
  height: SHARED_METADATA.image.height,
};
export const contentType = SHARED_METADATA.image.type;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);

  return new ImageResponse(
    <OgImage
      title={post?.title ?? SITE.name}
      subTitle={SITE.name}
      siteUrl={SITE.url.replace(/^https?:\/\//, '')}
    />,
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await getInterSemiBoldFont(),
          style: 'normal',
          weight: 600,
        },
      ],
    },
  );
}
