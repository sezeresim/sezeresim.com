import React from 'react';

type Props = {
  title: string;
  description?: string;
};

const OgImage = (props: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to right, #e8cbc0, #636fa4)',
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
                  color: '#222',
                  paddingTop: '32px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                }}
              >
                {props.title}
              </span>
              <span
                style={{
                  fontSize: '48px',
                  color: '#222',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                }}
              >
                Software Engineer
              </span>
            </div>
          </div>
          {/* <span
            style={{
              fontSize: '18px',
              color: '#222',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            {props.description}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default OgImage;
