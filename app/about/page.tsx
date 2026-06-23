import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import styles from "./About.module.css";

export const metadata: Metadata = {
  title: "소개",
  description: "열림인테리어 — 자동문에서 시작해 금속 하지까지.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "소개 — 열림인테리어",
    description: "열림인테리어 — 자동문에서 시작해 금속 하지까지.",
    url: "/about",
  },
};

/**
 * 리디자인 및 강화된 소개(About) 페이지 컴포넌트
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용 (About.module.css)
 * - 주석은 한글로 작성
 * - 불필요한 배너나 가치 카드를 배제하고 기존 요소(본문 2열 레이아웃, 이미지, 작업 분야)를 정교하게 강화
 */
export default function AboutPage() {
  return (
    <>
      {/* 기존에 있던 상단 마커 복구 */}
      <Container as="section">
        <PageHeader titleKr="소개" />
      </Container>

      <Container as="section" className={styles.aboutContainer}>
        {/* 에디토리얼 그리드 (소개글 본문 & 대표 작업 이미지) */}
        <div className={styles.editorialGrid}>
          
          {/* 브랜드 스토리 소개글 */}
          <article className={styles.article}>
            <p className={styles.leadText}>
              열림인테리어는 하지 · 자동문 · 도어 시공을 아우르는 금속 인테리어 전문 업체입니다.
            </p>
            <p className={styles.bodyText}>
              자동문 신설 및 수리에서 출발하여 수동문 수리(힌지 교체), 골드 도어 등 고급 도어 신설, 
              들창과 폴드업창 등 특수 창문 설치, 그리고 건축과 인테리어의 뼈대가 되는 금속 하지 제작 및 시공에 이르기까지 
              금속을 다루는 모든 영역으로 시공 분야를 넓혀 가고 있습니다.
            </p>
            <p className={styles.bodyText}>
              빠르고 친절하게, 그리고 무엇보다 꼼꼼하게 작업하여 
              작업 한 건 한 건이 다음 의뢰의 이유가 되도록 깊은 신뢰와 완성도 높은 결과물을 만들고 있습니다.
            </p>

            {/* 소개 하단 액션 버튼 그룹 (기존 요소 강화) */}
            <div className={styles.buttonGroup}>
              <Link href="/works" className={styles.btnPrimary}>
                작업 보기
                <ArrowRight size={16} strokeWidth={2} />
              </Link>
              <Link href="/inquiry" className={styles.btnSecondary}>
                문의하기
              </Link>
            </div>
          </article>

          {/* 오른쪽 보조 이미지 사이드바 (모바일은 숨김, 데스크톱에서만 복원) */}
          <aside aria-label="대표 작업 이미지" className={styles.imageSidebar}>
            <div className={styles.imageWrapper}>
              <Image
                src="/about/profile.png"
                alt="대표 작업 클로즈업"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className={styles.image}
                priority
              />
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
