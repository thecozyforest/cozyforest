import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/content";

// 커스텀 도메인을 붙이면 이 주소만 바꾸면 됩니다.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cozyforest.vercel.app";

// 검색에서는 실명이 먼저 잡혀야 하므로 브랜드명이 아니라 사람 이름으로 시작합니다.
const title = site.meta.seoTitle;
const { personName, alternateName, siteName } = site.meta;

/** 값이 비어 있으면 태그를 아예 붙이지 않습니다. */
const verification = () => {
  const { google, naver } = site.meta.verification;
  const out: Metadata["verification"] = {};
  if (google) out.google = google;
  if (naver) out.other = { "naver-site-verification": naver };
  return Object.keys(out).length > 0 ? out : undefined;
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.meta.description,
  keywords: site.meta.keywords,
  applicationName: siteName,
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  publisher: personName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: verification(),
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  openGraph: {
    title,
    description: site.meta.description,
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName,
    images: [
      {
        url: site.meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${personName}(${alternateName}) · ${siteName}`
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

/** 검색엔진이 "기경민 = 도치쌤 = 이 사이트"로 묶을 수 있게 해 주는 구조화 데이터. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: personName,
      alternateName: [alternateName, "보드라운고슴도치"],
      jobTitle: "고등학교 국어교사",
      description: site.meta.description,
      url: siteUrl,
      image: `${siteUrl}${site.profile.image}`,
      sameAs: site.meta.sameAs,
      knowsAbout: [
        "국어교육",
        "진학지도",
        "학교생활기록부",
        "학급운영",
        "교사 연수",
        "생성형 AI 활용 교육"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      alternateName: [`${personName} 포트폴리오`, site.speaking.brand],
      description: site.meta.description,
      url: siteUrl,
      inLanguage: "ko-KR",
      author: { "@id": `${siteUrl}/#person` },
      publisher: { "@id": `${siteUrl}/#person` }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
