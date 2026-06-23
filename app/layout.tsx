import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { KakaoFab } from "@/components/shared/KakaoFab";
import { JsonLd } from "@/components/shared/JsonLd";
import { SITE } from "@/lib/site";
import "./globals.css";

// OG 공유 이미지 (1200×630) — public/og.png
const OG_IMAGE = "/og.png";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["200", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "열림인테리어 / Yeollim Interior",
    template: "%s — 열림인테리어",
  },
  description:
    "금속 인테리어 전문 — 자동문·도어·금속 하지 제작·시공. 작업이 곧 자기 소개.",
  metadataBase: new URL(SITE.url),
  alternates: { canonical: "/" },
  keywords: [
    "열림인테리어",
    "파주 자동문",
    "자동문 설치",
    "자동문 수리",
    "방화 자동문",
    "금속작업",
    "금속 하지",
    "용접 수리",
    "강화도어",
    "방화문",
    "들창",
    "폴드업창",
    "파주 인테리어",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "열림인테리어",
    url: SITE.url,
    title: "열림인테리어 / Yeollim Interior",
    description:
      "금속 인테리어 전문 — 자동문·도어·금속 하지 제작·시공. 작업이 곧 자기 소개.",
    images: [
      { url: OG_IMAGE, width: 1200, height: 630, alt: "열림인테리어" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "열림인테리어 / Yeollim Interior",
    description:
      "금속 인테리어 전문 — 자동문·도어·금속 하지 제작·시공.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body
        className="relative flex min-h-screen flex-col bg-canvas text-graphite"
        suppressHydrationWarning
      >
        <JsonLd />
        <Header />
        <main className="relative z-[2] flex-1">{children}</main>
        <Footer />
        <KakaoFab />
      </body>
    </html>
  );
}
