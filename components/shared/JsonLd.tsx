import { SITE, CATEGORIES } from "@/lib/site";

/**
 * LocalBusiness 구조화 데이터 (JSON-LD).
 * - 지역 시공업체 SEO 의 핵심 — 상호·주소·전화·영업시간·서비스를
 *   검색엔진이 구조적으로 이해해 지식패널/지도에 연결.
 * - 모든 값은 lib/site.ts 의 실제 사업자 정보(SITE.business / SITE.contact)에서 읽음.
 *   가짜 데이터 금지 — 미확보 정보(좌표 등)는 의도적으로 생략.
 * - 서버 컴포넌트에서 <script type="application/ld+json"> 로 직접 렌더.
 */
export function JsonLd() {
  const { business, contact, brand, url } = SITE;

  const data = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${url}/#business`,
    name: business.name,
    alternateName: brand.en,
    description: brand.tagline,
    url,
    telephone: contact.phone,
    email: contact.email,
    founder: { "@type": "Person", name: business.owner },
    image: `${url}/og.png`,
    logo: `${url}/logo/Logo.png`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "KR",
      addressRegion: "경기도",
      addressLocality: "파주시",
      streetAddress: "월롱면 덕은리 엘지로 204 1층",
    },
    // 영업시간: "08:00–20:00 상담 가능" → 매일 08:00-20:00
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "08:00",
      closes: "20:00",
    },
    areaServed: { "@type": "AdministrativeArea", name: "경기도 파주시 및 인근" },
    // 작업 분야 4종 → 서비스 카탈로그
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "작업 분야",
      itemListElement: CATEGORIES.map((c) => ({
        "@type": "OfferCatalog",
        name: `${c.kr} (${c.en})`,
        itemListElement: c.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      })),
    },
    sameAs: [contact.instagram, contact.blog, contact.kakao].filter(Boolean),
  };

  return (
    <script
      type="application/ld+json"
      // 신뢰된 정적 데이터(외부 입력 없음) — XSS 위험 없음.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
