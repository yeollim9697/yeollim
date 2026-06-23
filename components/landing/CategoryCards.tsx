"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/site";
import styles from "./CategoryCards.module.css";

// 개별 카드의 페이드인 + 업 애니메이션
const cardVariants = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
};

// 자식 카드들이 스크롤 영역 진입 시 차례대로 등장하도록 딜레이 조절
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * 작업 분야 카테고리를 렌더링하는 컴포넌트
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용 (CategoryCards.module.css)
 * - 주석은 한글로 작성
 * - [피드백 반영]: 모바일에서는 단 하나의 큰 카드 박스 속에 텍스트 형태로만 4열 컬럼 리스트로 정렬, 데스크톱에서는 4개의 개별 보더라인 카드로 정렬
 */
export function CategoryCards() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        
        {/* 1. 모바일 전용: 단 하나의 통합된 카드 컨테이너 속 가로 4열 플랫 텍스트 레이아웃 */}
        <div className={styles.mobileUnifiedContainer}>
          <div className={styles.mobileUnifiedCard}>
            {/* 통합 카드 헤더 (우측 상단 자세히 보기) */}
            <div className={styles.mobileCardHeader}>
              <span className={styles.mobileCardHeaderLabel}>— 시공 종류</span>
              <Link href="/works" className={styles.mobileMoreLink}>
                자세히 보기 →
              </Link>
            </div>
            
            <div className={styles.mobileGrid}>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.id}
                  href={`/works?category=${c.id}`}
                  className={styles.mobileColumn}
                >
                  <h3 className={styles.mobileTitle}>{c.kr}</h3>
                  <div className={styles.mobileDivider} />
                  <ul className={styles.mobileItemList}>
                    {c.items.map((item) => (
                      <li key={item} className={styles.mobileItem}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* 2. 데스크톱 전용: 4개의 독립된 프리미엄 보더라인 카드 레이아웃 */}
        <div className={styles.desktopContainer}>
          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className={styles.desktopGrid}
          >
            {CATEGORIES.map((c) => (
              <motion.div
                key={c.id}
                variants={cardVariants}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={styles.desktopCardWrapper}
              >
                <Link href={`/works?category=${c.id}`} className={styles.desktopCard}>
                  {/* 카드 헤더 (우측 상단 화살표 아이콘) */}
                  <div className={styles.desktopCardHeader}>
                    <ArrowUpRight size={18} className={styles.desktopArrow} />
                  </div>
                  
                  {/* 제목 및 영문명 */}
                  <h3 className={styles.desktopTitle}>
                    {c.kr}
                  </h3>
                  <span className={styles.desktopSubtitle}>
                    {c.en}
                  </span>
                  
                  {/* 카드 내부 구분선 */}
                  <div className={styles.desktopDivider} />
                  
                  {/* 세부 작업 목록 */}
                  <ul className={styles.desktopItemList}>
                    {c.items.map((item) => (
                      <li key={item} className={styles.desktopItem}>
                        <span aria-hidden className={styles.desktopBullet}>—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
