import { HeroSection } from "@/components/landing/HeroSection";
import { CategoryCards } from "@/components/landing/CategoryCards";
import { PhilosophySection } from "@/components/landing/PhilosophySection";
import styles from "./Landing.module.css";

/**
 * 랜딩 페이지 — 열림인테리어 홈.
 * - 히어로 섹션 (HeroSection) 컴포넌트 탑재
 * - 히어로 섹션에 걸쳐진 작업 분야 카드 (CategoryCards) 탑재
 * - 하단 핵심 가치 철학 섹션 (PhilosophySection) 탑재
 */
export default function LandingPage() {
  return (
    <>
      {/* 리디자인된 금속 인테리어 테마 히어로 섹션 */}
      <HeroSection />

      {/* 히어로 아래 은빛 패브릭 텍스처 배경 영역 */}
      <div className={styles.mainContent}>
        {/* 히어로 섹션 하단에 살짝 걸쳐진 카테고리 카드 그리드 */}
        <CategoryCards />

        {/* 핵심 가치 약속 박스 섹션 (여백 확보 및 브랜딩 강화) */}
        <PhilosophySection />
      </div>
    </>
  );
}
