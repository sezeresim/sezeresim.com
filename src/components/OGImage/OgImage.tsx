import React from 'react';

type Props = {
  title: string;
  description?: string;
};

const OgImage = (props: Props) => {
  return (
    <div
      style={{
        fontSize: 128,
        background: 'white',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
      }}
    >
      {props.title}
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
        }}
      >
        {props.description}
      </div>
    </div>
  );
};

export default OgImage;
