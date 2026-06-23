# 열림인테리어 / Yeollim Interior — PRD

> **Product Requirements Document**
> Version 0.1 — 2026.05
> Status: Draft

---

## 0. Document Meta

| 항목 | 내용 |
|---|---|
| **Project Name** | 열림인테리어 공식 웹사이트 |
| **Brand** | 열림인테리어 / Yeollim Interior |
| **Domain (TBD)** | yeollim.co.kr / yeollim-interior.com 등 검토 |
| **Document Owner** | (작성자) |
| **Last Updated** | 2026.05 |

---

## 1. Executive Summary

### 1-1. 제품 한 줄 정의
> **"금속 인테리어 전문 업체의 작업 레퍼런스를 보여주고, 외주 문의를 받기 위한 4페이지 구조의 포트폴리오 웹사이트."**

### 1-2. 왜 만드는가 (Background)
열림인테리어는 자동문 신설·수리에서 출발해 수동문 수리(힌지 교체), 골드 도어 등 고급 도어 신설, 들창·폴드업창 등 특수 창문 설치, 금속 하지 제작·시공까지 영역을 확장해 온 금속 인테리어 전문 업체. 현재까지 축적된 작업 레퍼런스가 **잠재 고객 입장에서 검증 가능한 형태로 노출되어 있지 않다.** 카톡·전화 문의가 들어와도 "어떤 작업을 하는 업체인지"를 사전에 보여줄 채널이 없어 응대 효율이 떨어진다.

### 1-3. 목표 (Goals)
| 구분 | 목표 |
|---|---|
| **Primary** | 잠재 고객이 작업 분야와 레퍼런스를 30초 내에 파악하고 문의 채널(폼·카톡·전화·메일) 중 하나로 이탈 없이 연결되도록 한다. |
| **Secondary** | 견적 문의 시 필요한 기본 정보(작업 종류, 위치, 규모, 일정)를 폼 단계에서 미리 수집하여 응대 시간을 단축한다. |
| **Tertiary** | 추후 작업 분야가 추가될 때 레퍼런스를 손쉽게 업로드·관리할 수 있는 구조를 마련한다. |

### 1-4. Non-Goals
- ❌ 온라인 결제·견적 계산기 기능 (모든 견적은 사람이 직접 응대)
- ❌ 회원가입·로그인 시스템
- ❌ 블로그/콘텐츠 마케팅 페이지 (Phase 1 범위 밖)
- ❌ 다국어 지원 (한국어 only)

---

## 2. Target Audience

### 2-1. 1차 타겟
- **연령:** 40대 이상 (주 고객층)
- **역할:** 상업 공간(상가/사무실/매장) 인테리어 의사결정자, 자영업자, 인테리어 시공사 PM, 건축주
- **기기:** 모바일 70% / 데스크탑 30% (추정)
- **유입 경로:** 지인 추천 → 직접 URL 입력 / 네이버 검색 / 카카오톡 공유 링크

### 2-2. 페르소나
| 페르소나 | 상황 | 니즈 |
|---|---|---|
| **A. 상가 임대인 (50대)** | 임대 매장의 자동문이 고장. 빠른 출장 수리 업체 필요. | 전화 한 통으로 즉시 연결 |
| **B. 인테리어 PM (40대)** | 진행 중인 현장에 금속 하지 시공이 필요. 협력 가능한 업체 풀 확장 중. | 작업 레퍼런스로 시공 품질 검증, 외주 폼으로 일괄 전달 |
| **C. 신규 매장 오픈 자영업자 (40대)** | 골드 도어 등 고급 도어 시공을 알아보는 중. | 레퍼런스 사진으로 결과물 미리 보기, 카톡 상담 |

### 2-3. UX 고려사항
- **글자 크기:** 본문 16px 이상 (40대+ 가독성)
- **터치 영역:** 모바일 버튼 최소 44×44px
- **명도 대비:** WCAG AA 이상 — 다크 테마이지만 본문 텍스트는 회색이 아닌 거의 흰색 사용
- **이탈 방지:** 외부 링크로 빠지는 도중에도 다시 돌아올 수 있게 모든 페이지 하단에 연락처 노출

---

## 3. 핵심 가치 / 메시지

> 사용자께서 "핵심 가치까지는 잘 모르겠다, 빠르고 친절하고 꼼꼼하게"라고 말씀하신 부분을 카피로 정제했습니다. **자가 수식어("최고의", "혁신적인")는 사용하지 않고**, 작업 태도를 그대로 노출하는 톤을 권장합니다.

### 3-1. 브랜드 보이스
> **"광고하지 않습니다. 보여드립니다."**
> 사진과 작업 분야 리스트가 곧 자기 소개. 카피는 짧고 사실 위주.

### 3-2. 메시지 위계
| 레벨 | 카피 (안) |
|---|---|
| **Hero Headline (한 줄)** | "금속으로 여는 공간." / "여는 일을 합니다." 등 |
| **Hero Sublabel** | "자동문 · 도어 · 금속 하지 — 인테리어 전문" |
| **Section Lede** | "10년간 쌓인 작업, 그대로 보여드립니다." |
| **Footer** | 사업자번호 / 주소 / 연락처 (수식 없음) |

---

## 4. 사이트 구조 (Information Architecture)

### 4-1. 페이지 맵
**4페이지 분리 구조.** 공통 헤더(로고·내비)·푸터는 `app/layout.tsx`에서 관리. Next.js App Router의 path 기반 라우팅, SSG.

```
/                  — 랜딩 페이지
├── Hero              — 대표 작업 사진 + 핵심 카피
├── 작업 분야 요약       — 5개 분야 카드 (각 카드 → /works)
└── 1차 CTA           — "문의하기" / "작업 보기"

/about             — 소개 페이지
├── 회사 소개          — 작업 영역 확장 스토리 (3-4문단)
├── 핵심 가치 / 작업 태도
└── 보조 사진          — 대표 작업 클로즈업 1-2장

/works             — 작업분야 및 레퍼런스 페이지
├── 작업 분야 5개       — auto-door / manual-door / premium-door / special-window / metal-frame
├── 카테고리 필터       — `?category=<id>` query param
└── 레퍼런스 그리드     — 카드 클릭 시 라이트박스 열림

/inquiry           — 신청 페이지
├── 외주 신청 폼        — Resend 발송
└── 직접 연락 채널     — 카톡 / 전화 / 메일 (폼과 동등 비중)

공통 (layout.tsx)
├── Header           — 로고, 네비게이션 (소개·작업·신청), 우측 전화 아이콘
└── Footer           — 사업자 정보, 연락처, 영업시간
```

> **방식 결정:** **멀티페이지 (4-page) 구조.** 섹션 앵커(`/#services` 등) 기반 단일 페이지 방식은 폐기. 페이지 간 이동은 Next.js `<Link>` (prefetch), 페이지 내 보조 스크롤만 `scroll-behavior: smooth` 사용.

### 4-2. URL 구조
| Path | 용도 |
|---|---|
| `/` | 랜딩 페이지 |
| `/about` | 소개 페이지 |
| `/works` | 작업분야 + 레퍼런스 페이지 |
| `/works?category=<id>` | 카테고리 필터 (auto-door / manual-door / premium-door / special-window / metal-frame) |
| `/inquiry` | 신청 페이지 |
| `/api/inquiry` | (Backend) Resend 이메일 발송 엔드포인트 |

---

## 5. 페이지별 상세 요구사항

### 5-1. Landing Page (`/`)
**목적:** 첫인상으로 "금속 인테리어 전문" 정체성 전달, 곧바로 작업 또는 문의 페이지로 연결.

**페이지 구성:**

1. **Hero (풀스크린)**
   - 좌상단: 로고 (열림인테리어 워드마크 — `images/Logo.png` 사용)
   - 우상단: 네비게이션 (소개 / 작업 / 신청) + 전화 아이콘
   - 중앙: 풀스크린 배경 이미지 (대표 작업 사진 1장, 어둡게 처리)
   - 헤드라인 + 짧은 sublabel
   - 1차 CTA: "작업 보기" → `/works`
   - 보조 CTA: "문의하기" → `/inquiry`

2. **작업 분야 요약** (선택 — Phase 0에서 포함 여부 결정)
   - 5개 분야 카드 (한글명 + 영문 보조 + 1줄 설명)
   - 각 카드 클릭 → `/works?category=<id>`

3. **하단 CTA 영역**
   - "문의하기" 큰 버튼 + 전화번호 즉시 노출

**인터랙션:**
- 페이지 로드 시 배경 이미지 zoom-in fade (1.2s)
- 헤드라인 staggered reveal (각 단어 80ms delay)
- 스크롤 시 헤로 배경 약간 parallax (`transform: translateY`)

**모바일:**
- 헤드라인 폰트 크기 줄임 (`clamp` 사용)
- 네비게이션은 우상단 햄버거 아이콘으로 collapse

### 5-2. About Page (`/about`)
**목적:** 신뢰감 확보를 위한 회사 자기 소개. 짧지만 전체 한 페이지를 가진다.

**구성:**
- 페이지 헤더: "소개" / "About" (한·영 stacked label)
- 본문 3-4문단 (작업 영역의 확장 스토리)
- 핵심 키워드 강조 (자동문 · 수동문 · 고급 도어 · 특수 창문 · 금속 하지)
- 보조 이미지 1-2장 (작업 클로즈업 또는 작업 중 사진)
- 페이지 하단 CTA: "작업 보기" → `/works`, "문의하기" → `/inquiry`

**카피 예시 (안):**
> "열림인테리어는 자동문 신설과 수리에서 시작해, 수동문 힌지 교체, 골드 도어 등 고급 도어 신설, 들창·폴드업창 같은 특수 창문 설치, 금속 하지 제작 및 시공까지 분야를 넓혀 왔습니다.
> 빠르게, 친절하게, 꼼꼼하게 — 작업 한 건 한 건이 다음 의뢰의 이유가 되도록 일합니다."

### 5-3. Works Page (`/works`) — 작업분야 + 레퍼런스
**목적:** 작업 분야 5개 카테고리와 모든 레퍼런스를 한 페이지에 통합 노출. 필터링과 라이트박스 지원.

**🔴 UX 패턴 — Phase 0 결정 필요 (3개 후보)**

| 후보 | 설명 | 장점 | 단점 |
|---|---|---|---|
| **A) 섹션 헤더 + 그리드** | 작업 분야 5개를 큰 섹션 헤더로 두고, 각 헤더 아래 해당 분야 그리드를 바로 표시 | 분야별 작업량 한눈에 보임. 스크롤만으로 전체 탐색 | 페이지 길어짐. 특정 분야만 보고 싶은 사용자 불편 |
| **B) 상단 필터 칩 + 단일 그리드** ★ 권장 | 상단에 `전체 / 자동문 / 수동문 / 고급 도어 / 특수 창문 / 금속 하지` 필터 칩. 그 아래 단일 그리드. 칩 클릭 시 필터링 | 직관적. URL query로 공유 가능. 40대+에 친화적 | 분야별 작업량 동시 비교 어려움 |
| **C) 좌측 사이드바 + 우측 그리드** | 좌측 고정 카테고리 리스트, 우측 그리드 | 데스크탑에서 효과적. 분야 전환 빠름 | 모바일에서는 상단 칩으로 fallback 필요 → 두 패턴 유지보수 |

**작업 분야 5개 (변경 금지):**

| ID | 한글명 | 영문 보조 | 설명 (1줄) |
|---|---|---|---|
| `auto-door` | 자동문 신설·수리 | Automatic Door | 매장·사무실 자동문 신규 설치 및 수리 |
| `manual-door` | 수동문 수리 | Manual Door Repair | 힌지 교체, 손잡이 수리 등 |
| `premium-door` | 고급 도어 신설 | Premium Door | 골드 도어 등 고급 마감 도어 시공 |
| `special-window` | 특수 창문 설치 | Special Window | 들창, 폴드업창 등 특수 창호 |
| `metal-frame` | 금속 하지 제작·시공 | Metal Framework | 인테리어 금속 하지 제작 및 현장 시공 |

**그리드 사양:**
- 데스크탑 3-column / 태블릿 2-column / 모바일 1-column
- 각 카드: 이미지 + 카테고리 라벨(한·영) + 작업명 + 시공 연도
- Hover: border 색상만 silver tone으로 변경 (scale/translate 금지)
- 카드 클릭 → 라이트박스 (좌우 스와이프, ESC/배경 클릭으로 닫기)

**카드 데이터 구조 (per item):**
```typescript
type ReferenceItem = {
  id: string;
  category: 'auto-door' | 'manual-door' | 'premium-door' | 'special-window' | 'metal-frame';
  title: string;          // 예: "강남 OO빌딩 자동문 신설"
  location?: string;      // 예: "서울 강남"
  year: number;           // 예: 2025
  images: string[];       // 이미지 URL 배열 (1개 이상)
  description?: string;   // 짧은 설명 (선택)
};
```

**필터링:**
- URL query param 기반: `/works?category=auto-door`
- Next.js `searchParams` prop으로 SSR 시 읽음
- 칩 클릭 시 `router.push` (얕은 라우팅)
- 빈 결과 시: "해당 분야의 레퍼런스가 곧 추가됩니다."

**관리 방안 (Phase 1):**
- JSON 파일 정적 관리 (`/data/references.json`)
- 이미지: `/public/references/` 디렉토리 직접 업로드 (Phase 1) → Vercel Blob (Phase 2 확장 시)
- Phase 2에서 간단한 어드민 또는 Notion API 연동 검토

### 5-4. Inquiry Page (`/inquiry`)

**목적:** 견적/외주 문의를 폼·카톡·전화·메일 4가지 채널로 받는다.

**좌측: 웹 폼 (Resend 이메일 발송)**

| 필드 | 유형 | 필수 | 비고 |
|---|---|---|---|
| 이름 | text | ✓ | 최대 30자 |
| 연락처 | tel | ✓ | 패턴 검증 (`010-XXXX-XXXX`) |
| 이메일 | email | — | 회신 받을 이메일 (선택) |
| 작업 종류 | select (multi) | ✓ | 5개 작업 분야 중 다중 선택 |
| 작업 위치 | text | — | "서울 강남구" 등 자유 입력 |
| 작업 규모 | select | — | "소규모 (1-2일)" / "중규모 (3-7일)" / "대규모 (1주 이상)" / "잘 모르겠음" |
| 희망 시기 | select | — | "최대한 빨리" / "이번 달 내" / "다음 달" / "협의" |
| 상세 내용 | textarea | ✓ | 최대 1000자 |
| 사진 첨부 | file | — | 최대 5장, jpg/png, 각 5MB 이하 (Phase 2 검토) |
| 개인정보 동의 | checkbox | ✓ | 필수 체크 |

**제출 동작:**
1. 클라이언트에서 입력값 검증
2. `/api/inquiry` POST 요청
3. 서버에서 Resend API로 사장님 이메일에 발송
4. 성공 시 화면에 "접수되었습니다. 빠르게 연락드리겠습니다." 모달
5. 실패 시 "전송 실패. 카톡 또는 전화로 연락주세요." 메시지와 함께 대체 연락처 노출

**우측: 직접 연락 채널 (3개 버튼)**
- 카카오톡 오픈채팅 링크 (새 창)
- 전화 걸기 (`tel:` 링크 — 모바일 즉시 통화)
- 이메일 보내기 (`mailto:` 링크)

> 사용자가 "웹 폼 + 카톡/전화/메일 버튼 모두 노출"을 선택하셨으므로 폼과 직접 연락 채널을 **동등한 비중으로 좌·우 배치**합니다.

### 5-5. Common (Header + Footer)

**Header (모든 페이지 공통, `app/layout.tsx`)**
- 좌측: 로고 (`images/Logo.png` — 다크 배경용 워드마크)
- 우측: 네비게이션 (소개 · 작업 · 신청) + 전화 아이콘 (모바일에서 tap-to-call)
- 모바일: 햄버거 아이콘 collapse
- 스크롤 시 배경 살짝 어두워짐 (`rgba(22,22,22,0.85)` + `backdrop-filter: blur(20px)`)
- 현재 페이지 표시: 활성 링크에 silver 색상 underline

**Footer (모든 페이지 공통)**
- 좌측: 로고 (워드마크 reverse 또는 다크용)
- 중앙: 사업자 정보 (사업자번호 / 대표자 / 주소 / 영업시간)
- 우측: 연락처 다시 노출 (전화 / 이메일 / 카톡)
- 하단: Copyright

---

## 6. 기술 스택 (Technical Stack)

> COMMIT / 명운에서 사용 중인 스택과 일관되게 정리. Yunje님 작업 흐름에 맞춤.

### 6-1. Frontend
| 영역 | 선택 | 이유 |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSR/SSG로 SEO 유리, 정적 페이지 중심 사이트에 적합 |
| Language | **TypeScript** | 타입 안정성 |
| Styling | **Tailwind CSS** | 빠른 프로토타이핑, 커스텀 토큰 적용 용이 |
| UI Components | **Shadcn UI** | Accordion, Dialog, Form 등 즉시 활용 |
| Animation | **Framer Motion** | Hero parallax, staggered reveal, accordion 애니메이션 |
| Icons | **Lucide React** | 1.5px stroke, 미니멀 아이콘 |
| Form | **React Hook Form + Zod** | 폼 검증 |
| Image | **next/image** | 자동 최적화, lazy loading |

### 6-2. Backend / Infra
| 영역 | 선택 | 이유 |
|---|---|---|
| Hosting | **Vercel** | Next.js 최적, 한국 엣지 지원 |
| Email | **Resend** | 사용자 요청. React Email로 템플릿 작성 |
| Image Storage | **Vercel Blob** 또는 정적 파일 | 레퍼런스 이미지 호스팅 |
| Form Backend | **Next.js API Route (`/api/inquiry`)** | Resend 호출 래퍼 |
| Spam 방지 | **Cloudflare Turnstile** 또는 honeypot field | 폼 어뷰즈 차단 |
| Analytics | **Vercel Analytics + GA4** (선택) | 트래픽 측정 |

### 6-3. 도메인 / DNS
- 도메인 구입 후 Vercel 연결
- Resend의 SPF/DKIM/DMARC 레코드 추가 (메일 발송 도메인 검증)

---

## 7. 기능 명세 (Feature Spec)

### 7-1. 외주 신청 폼 (Resend 연동)

**API Route:** `app/api/inquiry/route.ts`

**요청 (Client → Server):**
```typescript
POST /api/inquiry
Content-Type: application/json

{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "email": "hong@example.com",      // optional
  "categories": ["auto-door", "metal-frame"],
  "location": "서울 강남구",
  "scale": "medium",                 // small | medium | large | unknown
  "timeline": "this-month",          // asap | this-month | next-month | flexible
  "message": "...",
  "agreement": true
}
```

**응답:**
```typescript
// Success
{ "success": true, "id": "inq_xxx" }

// Failure
{ "success": false, "error": "VALIDATION_ERROR" | "EMAIL_FAILED" }
```

**메일 템플릿 (Resend로 발송될 이메일):**
- 받는 사람: 사장님 이메일 (env에서 관리)
- 제목: `[열림인테리어] 새 문의 — {이름} / {작업종류}`
- 본문: 폼 입력값을 정리된 HTML 테이블로 (React Email)
- Reply-To: 고객 이메일 (입력한 경우)

**환경 변수:**
```
RESEND_API_KEY=re_xxx
INQUIRY_TO_EMAIL=owner@yeollim.co.kr
INQUIRY_FROM_EMAIL=noreply@yeollim.co.kr  # Resend 도메인 검증 후
```

### 7-2. 레퍼런스 필터링 (`/works`)
- URL query param 기반: `/works?category=auto-door`
- Next.js `searchParams` prop으로 SSR 시 읽음 (SEO·공유 우호적)
- 필터 변경 시 부드러운 fade-in/out 애니메이션
- 빈 결과 시 "해당 분야의 레퍼런스가 곧 추가됩니다" 메시지

### 7-3. 레퍼런스 라이트박스
- Headless UI 또는 자체 구현
- 좌우 화살표 / 키보드 ← → 지원
- 모바일 터치 스와이프
- Esc로 닫기 / 배경 클릭으로 닫기

### 7-4. 페이지 전환 (Navigation)
- 네비게이션 메뉴 클릭 시 Next.js `<Link>`로 페이지 이동 (default prefetch로 즉각 반응)
- 페이지 내 보조 스크롤(예: 필터 칩 → 그리드, "맨 위로" 등)에만 CSS `scroll-behavior: smooth` 적용
- 페이지 전환 fade 트랜지션 — Phase 0 결정 필요 (Framer Motion `AnimatePresence` 또는 미적용)

---

## 8. 디자인 시스템 (Design Direction)

> 별도 `BrandKit.html`에 풀버전이 있습니다. 여기서는 PRD 관점의 요약만.

### 8-1. 톤
- **모던 · 미니멀 · 차가운 분위기**
- 다크 베이스 + 메탈릭 실버 액센트
- 풀스크린 작업 사진을 주연으로, UI는 조연

### 8-2. 컬러 토큰 (요약)

| Token | HEX | 용도 |
|---|---|---|
| `--bg-primary` | `#161616` | 메인 배경 |
| `--bg-elevated` | `#1F1F1F` | 카드, 섹션 분리 배경 |
| `--bg-surface` | `#232323` | 인풋, 호버 영역 |
| `--text-primary` | `#F4F4F5` | 본문 텍스트 (40대+ 가독성 고려) |
| `--text-secondary` | `#A1A1AA` | 보조 텍스트 |
| `--accent-silver` | `#C4C7CC` | 메탈릭 실버 액센트 |
| `--accent-steel` | `#8B8F96` | 스틸 톤 액센트 |
| `--border` | `#2E2E2E` | 1px 보더 |

### 8-3. 타이포그래피
- **Display:** Pretendard Variable (한글) + Inter (영문 보조 라벨)
- **Body:** Pretendard Variable
- **Mono:** JetBrains Mono (작업 ID, 연도 등)
- **본문 최소 크기:** 16px (40대+ 고객 가독성)

### 8-4. 컴포넌트 원칙
- Border-radius: 0~4px (직각에 가까움)
- Shadow: 거의 없음 (다크 테마에서는 border + 미세한 elevated bg)
- Hover: scale(1.02) 같은 transform 없이 border 색상만 변경
- 모션: 1초 이내, ease-out 위주

### 8-5. 이미지 가이드
- 작업 사진은 채도 -10~20% 보정
- 그레인 텍스처 약하게 오버레이 (선택)
- 라이트박스 배경: `rgba(10, 10, 10, 0.92)`

---

## 9. 콘텐츠 요구사항 (Content)

### 9-1. 사장님이 제공해야 할 자료
- [ ] 로고 파일 (있는 경우 SVG, 없으면 디자인 필요)
- [ ] 회사 소개 문구 최종본 (PRD에 1차 안 작성됨, 사장님 검토 필요)
- [ ] 작업 레퍼런스 사진 (분야별 최소 5장씩, 총 25장+ 권장)
  - 각 사진의 작업명, 위치, 시공 연도
- [ ] 사업자등록증 정보 (사업자번호, 대표자명, 주소)
- [ ] 카카오톡 오픈채팅 링크
- [ ] 사장님 전화번호 (대표 연락처)
- [ ] 수신용 이메일 주소
- [ ] 영업시간 / 휴무일 정보

### 9-2. 카피라이팅 (1차 안 → 사장님 검토 필요)
- Hero headline / sublabel
- About 섹션 본문
- 각 작업 분야 1줄 설명
- 문의 폼 안내 문구
- 빈 상태/에러 상태 메시지

---

## 10. 마일스톤 (Timeline)

> Yunje님 5일 빌드 패턴에 맞춘 가정. 실제 일정은 콘텐츠 확보 속도에 따라 조정.

| Phase | 기간 | 산출물 |
|---|---|---|
| **Phase 0 — Discovery** | Day 0 | PRD 확정, 사장님 콘텐츠 수령 |
| **Phase 1 — Design** | Day 1 | 디자인 시스템 확정, 메인 페이지 시안 |
| **Phase 2 — Build (Frontend)** | Day 2-3 | Next.js 셋업, 모든 섹션 구현, 레퍼런스 갤러리 |
| **Phase 3 — Build (Backend)** | Day 4 | Resend 연동, 폼 검증, 도메인 / DNS / SPF 설정 |
| **Phase 4 — QA & Polish** | Day 5 | 모바일 테스트, 접근성 점검, 카피 다듬기 |
| **Phase 5 — Launch** | Day 5-6 | 배포, Analytics 설정, 사장님께 인수인계 |

---

## 11. 성공 지표 (Success Metrics)

### 11-1. 정량 지표 (배포 후 3개월)
- 월 평균 사이트 방문 100+ (지인 추천·검색 합산)
- 외주 신청 폼 제출 월 5건 이상
- 모바일 페이지 로드 시간 2.5초 이내 (LCP)
- Inquiry CTA 클릭률 (방문자 대비) 10% 이상

### 11-2. 정성 지표
- 사장님 응대 시간 단축 ("어떤 작업이세요?" 같은 1차 질문이 폼에서 해결됨)
- 고객이 사이트의 레퍼런스를 보고 문의했다고 언급하는 비율

---

## 12. 리스크 & 가정 (Risks & Assumptions)

### 12-1. 리스크
| 리스크 | 영향 | 완화 방안 |
|---|---|---|
| 레퍼런스 사진의 일관성 부족 (조명·화질 편차) | 디자인 통일감 저하 | 일괄 후보정(채도/명도 통일), 가능하면 신규 작업은 일정한 가이드로 촬영 |
| Resend 이메일 발송 실패 시 문의 누락 | 비즈니스 손실 직결 | 폼 실패 시 카톡/전화 안내 백업, 서버 로그 모니터링 |
| 도메인 검증 전 메일이 스팸 처리 | 사장님이 문의를 못 봄 | 출시 전 Gmail/Naver 메일로 테스트, SPF/DKIM/DMARC 완료 후 배포 |
| 40대+ 고객이 다크 테마 가독성 불편 | 이탈률 증가 | 본문은 거의 흰색(#F4F4F5)에 16px+ 사용, 라이브 사용성 테스트 |
| 모바일에서 카톡 오픈채팅 링크가 인앱 브라우저에서 차단 | 문의 채널 손실 | 카톡 외 전화·메일 백업 항상 노출 |

### 12-2. 가정
- 사장님이 콘텐츠(사진·문구·연락처)를 적시에 제공한다.
- 작업 분야는 현재 5개로 고정 (추가 시 IA 재검토 필요).
- 결제·계약 같은 트랜잭션은 사이트 밖에서 진행한다.
- 사이트의 트래픽은 Vercel Hobby 플랜 범위 내 (월 100GB 대역폭).

---

## 13. Out of Scope (이번에는 안 합니다)

- 회원가입 / 마이페이지 / 로그인
- 다국어 (한국어만)
- 블로그 / 콘텐츠 / SEO 글
- 결제 / 견적 자동 계산
- 실시간 채팅 위젯 (채널톡 등) — 카톡 오픈채팅으로 대체
- 어드민 페이지 (Phase 1은 코드 푸시로 레퍼런스 추가)

---

## 14. 부록 (Appendix)

### 14-1. 참조 사이트 (영감)
- 일본·유럽의 금속 공방 / 인테리어 스튜디오 포트폴리오 사이트
- 다크 톤 + 풀스크린 사진 + 미니멀 타이포 조합

### 14-2. 환경 변수 목록 (최종)
```bash
# Resend
RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=

# Site
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_KAKAO_OPEN_CHAT_URL=
NEXT_PUBLIC_PHONE_NUMBER=
NEXT_PUBLIC_OWNER_EMAIL=

# Analytics (optional)
NEXT_PUBLIC_GA_ID=
```

### 14-3. 파일 구조 (제안)
```
yeollim-interior/
├── app/
│   ├── layout.tsx                  # 공통 헤더·푸터
│   ├── page.tsx                    # 랜딩 (/)
│   ├── about/
│   │   └── page.tsx                # 소개 (/about)
│   ├── works/
│   │   └── page.tsx                # 작업분야 + 레퍼런스 (/works)
│   ├── inquiry/
│   │   └── page.tsx                # 신청 (/inquiry)
│   ├── api/
│   │   └── inquiry/
│   │       └── route.ts            # Resend 발송 엔드포인트
│   └── globals.css
├── components/
│   ├── landing/
│   │   ├── Hero.tsx
│   │   └── ServiceSummary.tsx
│   ├── about/
│   │   └── AboutContent.tsx
│   ├── works/
│   │   ├── CategoryFilter.tsx
│   │   ├── WorksGrid.tsx
│   │   ├── ReferenceCard.tsx
│   │   └── Lightbox.tsx
│   ├── inquiry/
│   │   ├── InquiryForm.tsx
│   │   └── ContactChannels.tsx
│   ├── shared/
│   │   ├── Logo.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                          # Shadcn 컴포넌트
├── data/
│   └── references.json
├── public/
│   ├── logo/                        # Logo.png, symbol_dark.png, symbol_light.png
│   └── references/                  # 작업 사진
├── lib/
│   ├── email-template.tsx           # React Email 템플릿
│   └── validators.ts                # Zod 스키마
├── CLAUDE.md                        # 작업 가이드
├── BrandKit.html                    # 디자인 시스템 문서
├── PRD.md                           # 이 문서
└── README.md
```

---

*이 문서는 v0.1 초안입니다. 사장님 콘텐츠 수령과 톤 검토 후 v1.0으로 확정합니다.*
