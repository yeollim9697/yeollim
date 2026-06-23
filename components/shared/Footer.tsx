import Image from "next/image";
import { SITE } from "@/lib/site";
import { Container } from "./Container";
import styles from "./Footer.module.css";

/**
 * Footer — 중앙 정렬 미니멀 wordmark 패턴.
 * 상단 border-line + 흰 캔버스 + 큰 한글 브랜드 + 연락처/사업자정보 stacked.
 * 좌측 하단: 카카오톡 아이콘. 우측 하단: copyright.
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용 (Footer.module.css)
 * - 주석은 한글로 작성
 */
export function Footer() {
  const phoneHref = SITE.contact.phone
    ? `tel:${SITE.contact.phone.replace(/[^0-9+]/g, "")}`
    : "#";

  return (
    <footer className={styles.footer}>
      <Container className={styles.mainContainer}>
        {/* Brand wordmark — 심볼 마크 + 한글 타이틀 */}
        <div className={styles.brand}>
          <Image
            src="/logo/symbol_dark.png"
            alt=""
            width={64}
            height={64}
            className={styles.logo}
          />
          <h2 className={styles.brandTitle}>
            열림인테리어
          </h2>
        </div>
        <p className={styles.brandSub}>
          Yeollim Interior
        </p>

        {/* 본문 정보 2열 레이아웃 */}
        <div className={styles.infoGrid}>
          {/* Contact stack — 본문 폰트사이즈 줄임 적용 */}
          <div className={styles.contactStack}>
            {SITE.contact.email ? (
              <p>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className={styles.contactLink}
                >
                  {SITE.contact.email}
                </a>
              </p>
            ) : null}
            {SITE.contact.phone ? (
              <p>
                <a href={phoneHref} className={styles.contactLink}>
                  Tel: {SITE.contact.phone}
                </a>
              </p>
            ) : null}
            <p>{SITE.business.address}</p>
          </div>

          {/* Business info — 본문 폰트사이즈 줄임 적용 */}
          <div className={styles.businessInfo}>
            <p>대표 {SITE.business.owner}</p>
            <p>사업자등록번호 {SITE.business.regNumber}</p>
            <p>상담 {SITE.business.hours}</p>
          </div>
        </div>

        {/* 바로가기 2열 — 좌: 네이버 블로그, 우: 인스타그램 */}
        <div className={styles.ctaGrid}>
          {SITE.contact.blog ? (
            <a
              href={SITE.contact.blog}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="열림인테리어 네이버 블로그로 이동"
              className={styles.cta}
            >
              <NaverBlogIcon className={styles.ctaIcon} />
              <span className={styles.ctaTextWrap}>
                <span className={styles.ctaSub}>열림인테리어 작업 기록</span>
                <span className={styles.ctaTitle}>네이버 블로그</span>
              </span>
            </a>
          ) : null}

          <span className={styles.ctaDivider} aria-hidden />

          {SITE.contact.instagram ? (
            <a
              href={SITE.contact.instagram}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="열림인테리어 인스타그램으로 이동"
              className={styles.cta}
            >
              <InstagramIcon className={styles.ctaIcon} />
              <span className={styles.ctaTextWrap}>
                <span className={styles.ctaSub}>열림인테리어 인스타그램</span>
                <span className={styles.ctaTitle}>인스타그램</span>
              </span>
            </a>
          ) : null}
        </div>
      </Container>

      {/* Bottom row — 좌측 카카오톡, 우측 카피라이트 */}
      <Container className={styles.bottomRow}>
        {SITE.contact.kakao ? (
          <a
            href={SITE.contact.kakao}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="카카오톡 오픈채팅"
            className={styles.kakaoLink}
          >
            <KakaoIcon className={styles.kakaoIcon} />
          </a>
        ) : (
          <span aria-hidden />
        )}
        <p className={styles.copyright}>
          © 2026 Yeollim Interior
        </p>
      </Container>
    </footer>
  );
}

function KakaoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 3C6.477 3 2 6.477 2 10.764c0 2.808 1.872 5.292 4.703 6.692-.205.792-.747 2.872-.855 3.319-.135.557.205.55.43.4.176-.118 2.808-1.907 3.939-2.677.6.087 1.21.131 1.823.131 5.523 0 10-3.477 10-7.765C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

/**
 * 네이버 블로그 공식 아이콘 — 녹색 라운드 스퀘어 + 흰 "blog" 텍스트.
 * Naver brand green: #03C75A.
 */
function NaverBlogIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <rect width="32" height="32" rx="5" fill="#03C75A" />
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif"
        fontSize="11"
        fontWeight="900"
        letterSpacing="-0.5"
        fill="#FFFFFF"
      >
        blog
      </text>
    </svg>
  );
}

/**
 * 인스타그램 아이콘 — 배경 타일 없이, 카메라 아웃라인 글리프에
 * 공식 그라데이션(노랑→오렌지→핑크→보라)을 입힌 형태.
 */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <defs>
        <radialGradient id="ig-gradient" cx="30%" cy="107%" r="135%">
          <stop offset="0%" stopColor="#FDF497" />
          <stop offset="5%" stopColor="#FDF497" />
          <stop offset="45%" stopColor="#FD5949" />
          <stop offset="60%" stopColor="#D6249F" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      {/* 카메라 외곽 라운드 스퀘어 */}
      <rect
        x="3.3"
        y="3.3"
        width="25.4"
        height="25.4"
        rx="8"
        fill="none"
        stroke="url(#ig-gradient)"
        strokeWidth="2.6"
      />
      {/* 렌즈 */}
      <circle
        cx="16"
        cy="16"
        r="6.4"
        fill="none"
        stroke="url(#ig-gradient)"
        strokeWidth="2.6"
      />
      {/* 플래시 점 */}
      <circle cx="23.2" cy="8.8" r="1.8" fill="url(#ig-gradient)" />
    </svg>
  );
}
