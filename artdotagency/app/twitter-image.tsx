import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Artdotagency | Cultural Strategy & Community Engagement';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const fontData = await fetch(
    new URL('./fonts/Kamerik105Cyrillic-Book.woff', import.meta.url)
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#010101', // bg-void
          position: 'relative',
          fontFamily: 'Kamerick', 
          padding: '60px',
        }}
      >
        {/* BACKGROUND GRAPHIC (Massive Ultraviolet Circle acting like a blur) */}
        <div
            style={{
                position: 'absolute',
                top: '-20%',
                right: '-10%',
                width: '800px',
                height: '800px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(110,0,255,0.4) 0%, rgba(110,0,255,0) 70%)',
                zIndex: 0,
            }}
        />

        {/* TOP METADATA */}
        <div style={{ display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
            <span style={{ color: '#CCFF00', fontSize: 24, letterSpacing: '0.2em', textTransform: 'lowercase' }}>
                associate network
            </span>
            <span style={{ color: '#666', fontSize: 24, letterSpacing: '0.2em' }}>
                // BHM - LDN
            </span>
        </div>

        {/* MASSIVE CENTER TYPOGRAPHY */}
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
             <span
                style={{
                    fontSize: 160,
                    fontWeight: 900, 
                    color: '#F5F5F7',
                    lineHeight: 0.8,
                    letterSpacing: '-0.05em',
                }}
            >
                artdotagency<span style={{ color: '#6E00FF' }}>.</span>
            </span>
        </div>

        {/* BOTTOM CIVIC MESSAGING */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ color: '#F5F5F7', fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase' }}>
                    cultural strategy for places
                </span>
                <span style={{ color: '#F5F5F7', fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase' }}>
                    community engagement & co-design
                </span>
                <span style={{ color: '#F5F5F7', fontSize: 32, letterSpacing: '-0.02em', textTransform: 'lowercase' }}>
                    public realm curation
                </span>
            </div>
            
            <div
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#CCFF00',
                    display: 'flex',
                }}
            />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Kamerick',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}