import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CreatosGlob - AI Trend Engine for Content Creators",
  description: "Discover viral trends, get AI-written scripts, generate thumbnails for YouTube, Instagram and TikTok. Free AI tool for content creators.",
  keywords: "content creator trends, AI script writer, YouTube trends, Instagram trends, viral content, thumbnail generator",
  openGraph: {
    title: "CreatosGlob - AI Trend Engine for Content Creators",
    description: "Discover viral trends, get AI scripts & thumbnails for free!",
    url: "https://creatorsglob.com",
    siteName: "CreatosGlob",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <meta name="google-adsense-account" content="ca-pub-2228002566511711"/>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2228002566511711"
          crossOrigin="anonymous"
        />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QYVZE3LHPN"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QYVZE3LHPN');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}