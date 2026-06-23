# 열림인테리어 / Yeollim Interior

> 금속 인테리어 전문 업체(자동문·도어·금속 하지)의 **4페이지 멀티페이지** 포트폴리오 + 외주 문의 사이트.
> **현재 단계:** 기획 진행 중 — 미완 항목 있음. 코드 작성 전에 아래 "열린 결정" 섹션을 먼저 확인할 것.

---

## 정본 문서 (Source of Truth)

- **[PRD.md](PRD.md)** — 제품 요구사항 v0.1 (Draft)
- **[BrandKit.html](BrandKit.html)** — 브랜드 비주얼 시스템 v0.1 (Draft, 브라우저로 열어볼 것)

두 문서가 충돌하면 **BrandKit이 비주얼/톤의 정본**, **PRD가 기능/IA의 정본**. 둘 다 v0.1 Draft 상태이므로, 사장님 콘텐츠 수령 후 v1.0으로 확정될 예정.

---

## 프로젝트 핵심 한 줄

> "광고하지 않습니다. **보여드립니다.**" — 작업이 곧 자기 소개. 카피는 짧고 사실 위주.

자기 수식어("최고의", "혁신적인", "프리미엄") 금지. 톤: **Modern · Minimal · Cool · Metallic**. 약속: **빠르게 · 친절하게 · 꼼꼼하게**.

---

## 작업 분야 4개 (사장님 확정 — 2026-05-16, 임의 변경 금지)

| ID | 한글 | 영문 | 세부 작업 |
|---|---|---|---|
| `metal-work` | 금속작업 | Metal Work | 세면대 하지 · 선반 하지 · 벤치 하지 · 파티션 하지 · 세탁기 하지 · 용접 수리(알곤·피복아크) |
| `auto-door` | 자동문 | Automatic Door | 일반 자동문 신설 · 일반 자동문 수리 · 방화 자동문 신설·수리 · 프레임 신설 |
| `door` | 도어 | Door | 힌지 · 도어체크 · 강화도어 · 방화 강화도어 · 가마찌도어 · 방화문 |
| `window` | 창문 | Window | 들창 · 폴드업창 |

세부 작업은 `lib/site.ts` 의 `CATEGORIES[i].items` 에 배열로 저장. 추가/축소 시 IA·필터·이메일 카테고리·About 페이지 전부 재검토 필요.

---

## 절대 원칙 (Brand Non-Negotiables)

BrandKit § 07 Do's & Don'ts 기반. 위반 시 톤이 깨짐.

> **구현 캔버스 결정 (2026-05):** 사이트는 **화이트 캔버스(#FFFFFF) + borderline 박스** 방향으로 구현. BrandKit doc 자체는 다크 모드로 작성돼 있지만, 실제 사이트는 흰 캔버스에 BrandKit 팔레트(graphite/silver-deep/silver-bright 등)를 텍스트·보더·액센트로 사용. 다크 블록은 최소화하고 thin border로 박스 구분. Hero CTA 등 강조 요소만 graphite 솔리드 블록 사용.

**Do**
- 캔버스 흰색 + **borderline 박스** (border `silver-bright`/`silver`/`silver-deep`)
- 본문 텍스트 `graphite #161616` (19:1 AAA on white)
- 보조 텍스트 `ghost #52525B` (8.1:1 AAA), 캡션 `silver-deep #8B8F96` (5.0:1 AA)
- 액센트는 메탈릭 실버 톤만 (그라파이트 대비)
- 본문 **최소 16px · 행간 1.65 이상** (40대+ 가독성)
- 작업 사진이 주연, UI는 조연
- Border-radius `0~4px` (직각 우선)
- 한글 위 / 영문 아래 stacked label

**Don't**
- 실버/그라파이트 외 액센트(블루·골드·레드) 추가
- Drop shadow · glassmorphism · neumorphism
- Hover 시 `scale` / `translate` transform — **border 색상만 변경**
- 흰 캔버스에 silver(#C4C7CC) 본문 텍스트 — 대비 부족, 장식·라벨에만 사용
- "최고의·혁신적인·프리미엄" 같은 자기 수식
- 이모지 · 느낌표 · ALL CAPS 과용
- 모서리 8px 이상 둥글림
- 1초 넘는 모션

---

## 디자인 토큰 (실제 구현 = 라이트 캔버스 / 정본 doc은 BrandKit)

Tailwind v4 `@theme`로 매핑. 토큰명은 Tailwind 클래스에 그대로 노출 (`bg-canvas`, `text-graphite`, `border-silver`, `text-silver-deep` 등). 정본 hex 값은 BrandKit과 동일.

```css
/* Canvas (라이트) */
--color-canvas: #FFFFFF;   /* ★ Body BG */
--color-paper:  #FAFAFA;   /* 미세 elevated 표면 */

/* Dark surfaces — Hero CTA 등 강조 블록에만 사용 */
--color-obsidian: #0E0E0E;
--color-graphite: #161616; /* ★ 본문 텍스트 색 / Active CTA fill */
--color-charcoal: #1F1F1F;
--color-smoke:    #232323;
--color-iron:     #2A2A2A;

/* Text on white (대비 명시) */
text-graphite:    #161616  /* 19.0:1 AAA — 본문·헤딩 */
text-ghost:       #52525B  /*  8.1:1 AAA — 보조 본문 */
text-silver-deep: #8B8F96  /*  5.0:1 AA  — 캡션·라벨 */
text-silver:      #C4C7CC  /*  3.4:1     — 장식·큰 글자만 */

/* Borders on white (계층 명시) */
border-silver-bright: #E5E7EB   /* 가장 섬세 — 페이지/섹션 구분 */
border-silver:        #C4C7CC   /* 기본 — 카드·입력칸 */
border-silver-deep:   #8B8F96   /* 강조 — Hover·Active */

/* Legacy on-dark (다크 블록 안에서만) */
text-ink: #F4F4F5,  text-mute: #A1A1AA,  text-faint: #71717A

/* Fonts (var는 layout.tsx의 next/font가 주입) */
--font-display: var(--font-inter), "Pretendard Variable", sans-serif;
--font-body:    "Pretendard Variable", var(--font-inter), sans-serif;
--font-mono:    var(--font-jetbrains), "JetBrains Mono", monospace;
```

색 비율 가이드 (라이트 캔버스 기준): **Canvas 80% · 본문(graphite) 10% · Silver tones 8% · Graphite 강조 블록 2%**.

---

## 기술 스택 (확정)

- **Next.js 15 (App Router) + TypeScript** — SSG 중심
- **Tailwind CSS + Shadcn UI** — Accordion·Dialog·Form 사용
- **Framer Motion** — Hero parallax, staggered reveal, accordion
- **React Hook Form + Zod** — 폼 검증
- **Resend (+ React Email)** — 외주 문의 메일 발송
- **Vercel** — 호스팅 + Analytics
- 스팸 방지: Cloudflare Turnstile 또는 honeypot

상세 파일 구조는 PRD § 14-3 참조.

---

## 환경 변수

```bash
RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=          # Resend 도메인 검증 후

NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_KAKAO_OPEN_CHAT_URL=
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_OWNER_EMAIL=

NEXT_PUBLIC_GA_ID=           # optional
```

---

## 사이트 IA (4페이지 멀티페이지)

```
/          — 랜딩 (Hero + 작업분야 요약 + 1차 CTA)
/about     — 소개
/works     — 작업분야 + 레퍼런스 그리드  (필터: ?category=<id>)
/inquiry   — 신청 (폼 + 카톡·전화·메일)
```

- 공통 헤더·푸터는 `app/layout.tsx`에서 관리
- Next.js App Router의 path 기반 라우팅, SSG
- 페이지 간 이동은 `<Link>` (prefetch), 페이지 내 보조 스크롤만 smooth-scroll 사용
- 상세는 PRD § 4–5

---

## 🔴 열린 결정 (Open Questions — 코드 작성 전 사장님/Yunje 확인 필요)

기획이 끝나지 않은 항목. 임의로 결정하지 말 것.

### A. 콘텐츠 미수령 (PRD § 9-1)
- [ ] **로고 파일** — 현재 BrandKit의 SVG는 임시안. 실제 로고 SVG 필요
- [ ] **회사 소개 문구** 최종본 (PRD에 1차 안만 있음)
- [ ] **레퍼런스 사진** 분야별 5장+, 총 25장+ — 각 사진의 작업명·위치·시공 연도
- [ ] **사업자 정보** — 사업자번호, 대표자명, 주소
- [ ] **카카오톡 오픈채팅 링크**
- [ ] **대표 전화번호** / **수신 이메일**
- [ ] **영업시간 / 휴무일**

### B. 도메인 (PRD § 0)
- [ ] `yeollim.co.kr` vs `yeollim-interior.com` — 미확정

### C. 기능 디테일 (PRD 내부 TBD)
- [ ] **`/works` 페이지 UX 패턴**: A) 섹션 헤더 + 그리드 / B) 상단 필터 칩 + 단일 그리드 / C) 좌측 사이드바 + 우측 그리드 — PRD § 5-3 참조. **B 권장**
- [ ] **사진 첨부 기능** (Inquiry 폼): Phase 1 포함 여부 — PRD § 5-4에 "Phase 2 검토"
- [ ] **카피 1차 안** 사장님 검토 — Hero headline 후보 ("금속으로 여는 공간." vs "여는 일을 합니다." vs BrandKit "Cold steel, warm craft.")
- [ ] **라우트 명명**: 현재 `/about` `/works` `/inquiry`로 가정. `/projects` `/portfolio` `/contact` 등 대안 검토 필요

### D. 레퍼런스 관리 방식
- [ ] Phase 1: `/data/references.json` 정적 관리 (PRD 권장)
- [ ] 이미지 저장: Vercel Blob vs `/public/references/` — 미확정

---

## 핵심 워크플로 규칙

1. **계획 우선** — 비자명한 작업은 plan mode부터. 위 "열린 결정" 중 하나라도 걸리면 작성 중단하고 확인.
2. **콘텐츠 없이 모킹 금지** — 사장님 미제공 사진/문구 자리에는 placeholder 명시. 가짜 사장님 멘트·가짜 사업자번호 만들지 말 것.
3. **40대+ 사용자 우선** — 본문 16px 미만, 회색 본문, 44px 미만 터치 영역은 즉시 반려.
4. **모바일 70% 가정** — 데스크탑부터 그리고 mobile-first 둘 다 가능하지만 모바일 빌드 안 보고 끝내지 말 것.
5. **Resend 메일은 출시 전 SPF/DKIM/DMARC 검증 필수** — 미검증 상태 배포 시 사장님이 문의를 못 봄 (PRD § 12-1 리스크).

---

## 파일 구조 현재 상태

```
yeolrim/
├── .git/
├── .gitignore
├── BrandKit.html      ← 비주얼 시스템 v0.1
├── PRD.md             ← 제품 요구사항 v0.1
├── README.md          ← 거의 비어 있음
└── CLAUDE.md          ← (이 파일)
```

Next.js 프로젝트는 **아직 셋업 안 됨**. `npm create next-app` 또는 수동 셋업은 위 "열린 결정 D"(레퍼런스 관리 방식)까지 정해진 후 진행 권장.
