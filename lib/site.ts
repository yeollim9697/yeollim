/**
 * 사이트 전역 상수. placeholder 값은 사장님 콘텐츠 수령 후 교체.
 * 일부는 환경변수에서 읽음 (NEXT_PUBLIC_* — .env.local).
 */

export const SITE = {
  // 사이트 절대 URL — sitemap·robots·canonical·OG·JSON-LD 의 단일 출처.
  // 도메인 확정값 yeollim.org. 변경 시 .env 의 NEXT_PUBLIC_SITE_URL 만 교체.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yeollim.org",
  brand: {
    kr: "열림인테리어",
    en: "Yeollim Interior",
    tagline: "자동문 · 도어 · 금속 하지를 다루는 인테리어 전문 업체",
  },
  contact: {
    phone:     process.env.NEXT_PUBLIC_PHONE_NUMBER ?? "02-356-7908",
    email:     process.env.NEXT_PUBLIC_OWNER_EMAIL ?? "sungmin7908@naver.com",
    kakao:     process.env.NEXT_PUBLIC_KAKAO_OPEN_CHAT_URL ?? "https://open.kakao.com/o/sHAbutDh",
    blog:      "https://m.blog.naver.com/yeolrim9697",
    instagram: "https://www.instagram.com/yeollim_9697",
  },
  business: {
    name:       "열림인테리어",
    owner:      "임성민",
    regNumber:  "423-55-01099",
    address:    "파주시 월롱면 덕은리 엘지로 204 1층",
    hours:      "08:00–20:00 상담 가능",
  },
} as const;

export const NAV = [
  { href: "/about",   kr: "소개",     en: "ABOUT" },
  { href: "/works",   kr: "작업",     en: "WORKS" },
  { href: "/inquiry", kr: "문의하기", en: "INQUIRY" },
] as const;

export const CATEGORIES = [
  {
    id: "metal-work",
    kr: "금속작업",
    en: "Metal Work",
    items: [
      "세면대 하지",
      "선반 하지",
      "벤치 하지",
      "파티션 하지",
      "세탁기 하지",
      "용접 수리 (알곤·피복아크)",
    ],
  },
  {
    id: "auto-door",
    kr: "자동문",
    en: "Automatic Door",
    items: [
      "일반 자동문 신설",
      "일반 자동문 수리",
      "방화 자동문 신설·수리",
      "프레임 신설",
    ],
  },
  {
    id: "door",
    kr: "도어",
    en: "Door",
    items: [
      "힌지",
      "도어체크",
      "강화도어",
      "방화 강화도어",
      "가마찌도어",
      "방화문",
    ],
  },
  {
    id: "window",
    kr: "창문",
    en: "Window",
    items: [
      "들창",
      "폴드업창",
    ],
  },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

/**
 * 작업명(items[] 원소) → 레퍼런스 이미지 경로.
 * - 사장님 제공 사진(17장)을 카테고리 세부 작업에 매핑 (전 작업 사진 보유)
 * - 누락된 작업은 entry 없음 → ReferenceCard 가 placeholder 폴백
 * - 일부 작업은 단일 사진을 공유 (예: 세면대 하지 / 선반 하지)
 */
export const WORK_IMAGES: Record<string, string> = {
  // 금속작업
  "세면대 하지": "/references/01_metal-sink-shelf.png",
  "선반 하지":   "/references/01_metal-sink-shelf.png",
  "벤치 하지":   "/references/02_metal-bench.png",
  "파티션 하지": "/references/03_metal-partition.png",
  "세탁기 하지": "/references/04_metal-washer.png",
  "용접 수리 (알곤·피복아크)": "/references/05_metal-welding.png",

  // 자동문
  "일반 자동문 신설": "/references/06_autodoor-new.png",
  "일반 자동문 수리": "/references/07_autodoor-repair.png",
  "방화 자동문 신설·수리": "/references/08_autodoor-fire.png",
  "프레임 신설": "/references/16_autodoor-frame.png",

  // 도어
  "힌지":         "/references/09_hinge.png",
  "도어체크":     "/references/17_door-check.png",
  "강화도어":     "/references/12_door-tempered.png",
  "방화 강화도어": "/references/10_door-fire-tempered.png",
  "가마찌도어":   "/references/11_door-kamachi.png",
  "방화문":       "/references/13_door-fire.png",

  // 창문
  "들창":         "/references/14_window-hopper.png",
  "폴드업창":     "/references/15_window-foldup.png",
};
