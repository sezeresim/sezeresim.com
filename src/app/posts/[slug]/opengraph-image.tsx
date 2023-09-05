import { allPosts } from 'contentlayer/generated';
import { ImageResponse } from 'next/server';

import { SHARED_METADATA } from '@/app/shared-metadata';
import OgImage from '@/components/OGImage/OgImage';
import { getInterSemiBoldFont } from '@/components/OGImage/utils';

export const runtime = 'edge';

export const alt = SHARED_METADATA.title;
export const size = {
  width: SHARED_METADATA.image.width,
  height: SHARED_METADATA.image.height,
};

export const contentType = SHARED_METADATA.image.type;

export default async function Image({ params }: { params: { slug: string } }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  return new ImageResponse(
    <OgImage title={SHARED_METADATA.title} description={post?.title} />,
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: await getInterSemiBoldFont(),
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
