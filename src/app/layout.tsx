// Office Wrapped - Root Layout with SEO
// v1.0.0

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Load custom fonts
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

// SEO Metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://office-wrapped.vercel.app'),
  title: 'Office Wrapped 2024 | Your Year in Corporate Survival',
  description:
    'Generate your satirical Office Wrapped stats! See how many meetings, emails, and coffee breaks defined your year in corporate survival. Share your results on social media.',
  keywords: [
    'office wrapped',
    'spotify wrapped parody',
    'corporate humor',
    'work statistics',
    'meeting stats',
    'email stats',
    'office satire',
    'year in review',
    'corporate life',
    'work wrapped',
  ],
  authors: [{ name: 'Office Wrapped' }],
  creator: 'Office Wrapped',
  publisher: 'Office Wrapped',
  robots: {
    index: true,
    follow: true,
  },
  // Open Graph for social sharing
  // Note: OG images are generated dynamically via opengraph-image.tsx
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://office-wrapped.vercel.app',
    siteName: 'Office Wrapped',
    title: 'Office Wrapped 2024 | Your Year in Corporate Survival',
    description:
      'Generate your satirical Office Wrapped stats! See how many meetings, emails, and coffee breaks defined your year in corporate survival.',
  },
  // Twitter Card
  // Note: Twitter images are generated dynamically via twitter-image.tsx
  twitter: {
    card: 'summary_large_image',
    title: 'Office Wrapped 2024 | Your Year in Corporate Survival',
    description:
      'Generate your satirical Office Wrapped stats! See how many meetings, emails, and coffee breaks defined your year.',
    creator: '@officewrapped',
  },
  // Additional meta
  category: 'entertainment',
  classification: 'Satire',
};

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Office Wrapped',
              description:
                'Generate your satirical Office Wrapped stats and share them on social media.',
              url: 'https://office-wrapped.vercel.app',
              applicationCategory: 'Entertainment',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
