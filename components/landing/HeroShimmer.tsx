"use client";

import { motion } from "framer-motion";

/**
 * Hero 라이트 스윕 — 럭셔리/메탈릭 효과.
 * - 1.6초 사선 스윕 후 4초 정지 후 반복
 * - mix-blend-screen 으로 베이스 텍스처/색상에 가산되어 메탈 표면이 빛 받는 듯
 * - 110deg 그라디언트 → 사선 라이트 라인
 */
export function HeroShimmer() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary sweep — 강한 하이라이트 */}
      <motion.div
        initial={{ x: "-60%" }}
        animate={{ x: "160%" }}
        transition={{
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
          repeatDelay: 4,
        }}
        className="absolute inset-y-0 w-[55%] mix-blend-screen will-change-transform"
        style={{
          background:
            "linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.18) 47%, rgba(255,255,255,0.62) 50%, rgba(255,255,255,0.18) 53%, transparent 60%)",
        }}
      />
      {/* Secondary trailing sweep — 잔향, 살짝 늦게 따라옴 */}
      <motion.div
        initial={{ x: "-60%" }}
        animate={{ x: "160%" }}
        transition={{
          duration: 2.4,
          ease: [0.22, 1, 0.36, 1],
          repeat: Infinity,
          repeatDelay: 3.2,
          delay: 0.25,
        }}
        className="absolute inset-y-0 w-[70%] mix-blend-screen will-change-transform"
        style={{
          background:
            "linear-gradient(110deg, transparent 42%, rgba(229,231,235,0.08) 48%, rgba(229,231,235,0.22) 50%, rgba(229,231,235,0.08) 52%, transparent 58%)",
        }}
      />
    </div>
  );
}
