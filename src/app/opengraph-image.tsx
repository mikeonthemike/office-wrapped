// Office Wrapped - Dynamic Open Graph Image
// v1.1.0 - Updated to 2025

import { ImageResponse } from 'next/og';

// Image metadata
export const runtime = 'edge';
export const alt = 'Office Wrapped 2025 - Your Year in Corporate Survival';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

// Generate the OG image
export default async function Image() {
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
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            display: 'flex',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: 'rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
            }}
          >
            📅
          </div>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: 'rgba(168, 85, 247, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
            }}
          >
            📧
          </div>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 12,
              background: 'rgba(34, 197, 94, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 30,
            }}
          >
            ☕
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 100,
              marginBottom: 20,
            }}
          >
            🏢
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: 'white',
              textAlign: 'center',
              marginBottom: 16,
              letterSpacing: '-2px',
            }}
          >
            Office Wrapped
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: 24,
            }}
          >
            2025
          </div>
          <div
            style={{
              fontSize: 28,
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: 700,
            }}
          >
            Your Year in Corporate Survival
          </div>
        </div>

        {/* Bottom stats preview */}
        <div
          style={{
            position: 'absolute',
            bottom: 50,
            display: 'flex',
            gap: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, color: '#3b82f6' }}>1,452</div>
            <div style={{ fontSize: 16, color: '#64748b' }}>Meetings</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, color: '#a855f7' }}>12,456</div>
            <div style={{ fontSize: 16, color: '#64748b' }}>Emails</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <div style={{ fontSize: 36, fontWeight: 700, color: '#22c55e' }}>412</div>
            <div style={{ fontSize: 16, color: '#64748b' }}>Coffee Breaks</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
