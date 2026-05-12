import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qC0s.woff'
  ).then((res) => res.arrayBuffer())

  const baseUrl = new URL(request.url).origin
  const imageUrl = `${baseUrl}/og-image.jpg`

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: 1200,
          height: 630,
          background: '#4a5d3c',
        }}
      >
        {/* Left: crisp text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 80px',
            width: 660,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontFamily: 'Playfair',
              fontStyle: 'italic',
              fontSize: 88,
              color: '#c4cbbf',
              lineHeight: 1,
            }}
          >
            Cosas que sí
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Playfair',
              fontStyle: 'italic',
              fontSize: 22,
              color: 'rgba(196, 203, 191, 0.65)',
              marginTop: 24,
              lineHeight: 1.6,
            }}
          >
            La vida es demasiado corta como para no rodearse de cosas bonitas
          </div>
        </div>

        {/* Right: illustration (right half of the JPEG, no baked-in text) */}
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            flex: 1,
          }}
        >
          <img
            src={imageUrl}
            style={{
              height: 630,
              width: 1200,
              marginLeft: -660,
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Playfair',
          data: fontData,
          style: 'italic',
          weight: 400,
        },
      ],
    }
  )
}
