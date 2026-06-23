"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/shared/Container";
import styles from "./PhilosophySection.module.css";

/**
 * 랜딩 페이지 하단 핵심 가치 박스 섹션 컴포넌트
 * - 좌측: 철학 메시지 박스, 우측: 용접 시공 현장 사진 (2열, 맞붙은 캡슐 형태)
 * - 스크롤로 섹션에 도달하면 가운데 이음새(중앙 직선)에서 좌우 패널이
 *   슬라이드로 빠져나오며 드러나는 진입 애니메이션 (clip-path 와이프, 늘어남 없이 원본 비율 유지).
 *   좌측 박스는 왼쪽으로, 우측 이미지는 오른쪽으로 드러남. 모션은 1초 미만, 1회만 재생.
 * - 부모(grid)에 단일 whileInView observer 를 걸고 자식은 variants 로 구동.
 *   (형제 motion 요소가 각자 whileInView 를 가지면 한쪽 observer 가 안 켜지는 문제를 우회 —
 *    CategoryCards 와 동일하게 검증된 패턴.)
 * - 모션 감소(prefers-reduced-motion) 설정 시 애니메이션 없이 즉시 표시.
 */
export function PhilosophySection() {
  const reduceMotion = useReducedMotion();

  // 부드러운 ease-out 곡선 (브랜드 모션 토큰과 동일), 1초 미만
  const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const };

  // 좌측 박스: 중앙 이음새(오른쪽)에서 왼쪽으로 슬라이드되며 드러남
  const boxVariants: Variants = {
    hidden: { clipPath: "inset(0% 0% 0% 100%)" },
    visible: { clipPath: "inset(0% 0% 0% 0%)", transition },
  };
  // 우측 이미지: 중앙 이음새(왼쪽)에서 오른쪽으로 슬라이드되며 드러남
  const imageVariants: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    visible: { clipPath: "inset(0% 0% 0% 0%)", transition },
  };

  return (
    <section className={styles.section}>
      <Container>
        <motion.div
          className={styles.grid}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* 좌측: 철학 메시지 박스 */}
          <motion.div className={styles.box} variants={boxVariants}>
            <p className={styles.text}>
              빠르고 친절하게, 그리고 무엇보다 꼼꼼하게 작업하여
              작업 한 건 한 건이 다음 의뢰의 이유가 되도록 깊은 신뢰와 완성도 높은 결과물을 만들고 있습니다.
            </p>
          </motion.div>

          {/* 우측: 실제 용접 작업 이미지 프레임 */}
          <motion.div className={styles.imageWrapper} variants={imageVariants}>
            <Image
              src="/about/profile.png"
              alt="열림인테리어 금속 용접 작업 현장"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className={styles.image}
              priority
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
