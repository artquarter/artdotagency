import { ImageResponse } from 'next/og';

// 1. Configuration
export const runtime = 'edge';
export const alt = 'Artdotagency | Strategic Creative Solutions';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  // 2. LOAD THE FONT
  // This looks for the font file relative to THIS file. 
  // Make sure the font file is in the same folder or update the path.
  // Ideally: Copy 'Kamerik105Cyrillic-Book.woff' into your 'app' folder or 'public/fonts'
  
  // OPTION A: If font is in public/fonts (Recommended for simplicity)
  // We use the deployment URL or a relative fetch. 
  // However, for Edge generation, importing the file as an ArrayBuffer is safest.
  
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
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          position: 'relative',
          // APPLY FONT GLOBALLY HERE
          fontFamily: 'Kamerick', 
        }}
      >
        {/* BACKGROUND NOISE */}
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.1) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.1) 2%, transparent 0%)',
                backgroundSize: '100px 100px',
                opacity: 0.1,
            }}
        />

        {/* LOGO AREA */}
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '20px' }}>
             <span
                style={{
                    fontSize: 130,
                    fontWeight: 900, // Ensure your font supports this weight or change to 400
                    color: 'white',
                    lineHeight: 0.8,
                    letterSpacing: '-0.05em',
                }}
            >
                artdotagency
            </span>
        
        </div>

        {/* SUBTEXT */}
        <div
            style={{
                fontSize: 32,
                color: '#FFB800',
                letterSpacing: '0.2em',
                textTransform: 'lowercase',
                marginTop: 20,
            }}
        >
            Strategy • Culture • Impact
        </div>

        {/* BORDER DECORATION */}
        <div
            style={{
                position: 'absolute',
                bottom: 40,
                width: '80%',
                height: 1,
                backgroundColor: 'rgba(255,255,255,0.1)',
            }}
        />
      </div>
    ),
    {
      ...size,
      // 3. INJECT THE FONT HERE
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