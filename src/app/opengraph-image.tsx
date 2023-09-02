import { ImageResponse } from 'next/server';

import { SHARED_METADATA } from './shared-metadata';

export const runtime = 'edge';

export const alt = SHARED_METADATA.title;
export const size = {
  width: SHARED_METADATA.image.width,
  height: SHARED_METADATA.image.height,
};

export const contentType = 'image/png';

export const getInterSemiBoldFont = async () => {
  const response = await fetch(
    new URL('@/assets/Inter-SemiBold.ttf', import.meta.url),
  );
  const font = await response.arrayBuffer();
  return font;
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <h1>{SHARED_METADATA.title}</h1>
        <p>{SHARED_METADATA.description}</p>
      </div>
    ),
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
