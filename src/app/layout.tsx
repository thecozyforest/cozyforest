import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = `${site.meta.siteName} · ${site.meta.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.meta.description,
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title,
    description: site.meta.description,
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: site.meta.siteName,
    images: [
      {
        url: site.meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${site.meta.siteName} 공유 이미지`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.meta.description,
    images: [site.meta.ogImage]
  }
};

export const viewport: Viewport = {
  themeColor: "#241a18"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
