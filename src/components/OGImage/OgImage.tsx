type Props = {
  title: string;
  subTitle: string;
  siteUrl?: string;
};

const OgImage = ({ title, subTitle, siteUrl }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(135deg, #020617 0%, #0f172a 60%, #0ea5e9 160%)',
        color: '#fff',
        fontFamily: 'Inter',
        padding: '64px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          border: '2px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          padding: '56px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '28px',
            color: '#7dd3fc',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '999px',
              background: '#38bdf8',
            }}
          />
          {subTitle}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 40 ? '64px' : '84px',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: '24px', color: '#94a3b8' }}>
          {siteUrl ?? ''}
        </div>
      </div>
    </div>
  );
};

export default OgImage;
