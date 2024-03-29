import React from 'react';

type Props = {
  title: string;
  subTitle: string;
};

const OgImage = (props: Props) => {
  const { title, subTitle } = props;
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(135deg, rgba(2,6,23,1) 72%, rgba(0,212,255,1) 100%)',
        padding: '32px',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          padding: '64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', marginTop: '80px' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '48px',
              }}
            >
              <span
                style={{
                  fontSize: '96px',
                  color: '#fff',
                  paddingTop: '32px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                }}
              >
                {title}
              </span>
              <span
                style={{
                  fontSize: '24px',
                  color: '#fff',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                {subTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OgImage;
