import { ImageResponse } from 'next/og';

import { SHARED_METADATA } from '@/app/shared-metadata';
import OgImage from '@/components/OGImage/OgImage';
import { getInterSemiBoldFont } from '@/components/OGImage/utils';
import { SITE } from '@/constants';

export const alt = SHARED_METADATA.title;
export const size = {
  width: SHARED_METADATA.image.width,
  height: SHARED_METADATA.image.height,
};
export const contentType = SHARED_METADATA.image.type;

export default async function Image() {
  return new ImageResponse(
    <OgImage
      title={SITE.name}
      subTitle={SITE.role}
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
