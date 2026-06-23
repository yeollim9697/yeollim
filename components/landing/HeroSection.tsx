"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { HeroShimmer } from "./HeroShimmer";
import styles from "./HeroSection.module.css";

/**
 * 리디자인된 히어로 섹션 컴포넌트 (텍스트 단순화 및 중앙 배치 버전)
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용
 * - 주석은 한글로 작성
 */
export function HeroSection() {
  return (
    <section className={styles.hero}>
      {/* 배경 이미지 영역 (Next.js Image와 Framer Motion 적용) */}
      <div className={styles.bgImage}>
        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1.0, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full relative"
        >
          <Image
            src="/hero/metal-interior.png"
            alt="열림인테리어 금속 작업 배경"
            fill
            priority
            sizes="100vw"
            className={styles.image}
          />
        </motion.div>
      </div>

      {/* 가독성 증대용 다크 오버레이 및 비네트 */}
      <div className={styles.overlay} />
      <div className={styles.vignette} />

      {/* 메탈 표면 반사광 효과 */}
      <div className={styles.shimmerContainer}>
        <HeroShimmer />
      </div>

      <Container className={styles.container}>
        {/* 중앙 정렬 헤드라인 콘텐츠 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className={styles.centerContent}
        >
          <div className={styles.textBlock}>
            {/* 1행: 안녕하세요 (좌측 정렬) */}
            <div className={styles.line1}>
              안녕하세요
            </div>

            {/* 2행: 자동문 · 도어 · 금속하지 시공 전문 (기준 행, 중앙 배치) */}
            <div className={styles.line2}>
              자동문 · 도어 · 금속하지 시공 전문
            </div>

            {/* 3행: 열림인테리어입니다 (우측 정렬) */}
            <h1 className={styles.line3}>
              <span className={styles.titleHighlight}>열림인테리어입니다</span>
            </h1>
          </div>

          {/* 캡슐형 버튼 두 개 (왼쪽: 작업, 오른쪽: 문의하기) */}
          <div className={styles.buttonGroup}>
            <Link href="/works" className={styles.btnPrimary}>
              작업
            </Link>
            <Link href="/inquiry" className={styles.btnSecondary}>
              문의하기
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
