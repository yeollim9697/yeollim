"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { CATEGORIES, type CategoryId } from "@/lib/site";
import { cn } from "@/lib/cn";

type FilterId = "all" | CategoryId;

const SIDEBAR_ITEMS: { id: FilterId; kr: string }[] = [
  { id: "all", kr: "전체" },
  ...CATEGORIES.map((c) => ({ id: c.id, kr: c.kr })),
];

/**
 * 좌측 카테고리 사이드바 (Desktop).
 * - position: sticky 로 뷰포트 상단에 고정
 * - 스크롤 속도에 비례한 translateY 로 "지연되어 따라오는" 듯한 잔상 효과
 *   velocity → smoothVelocity(spring) → translateY [-28, 28]px
 *   스크롤이 멎으면 spring 이 0 으로 부드럽게 복귀
 */
export function CategorySidebar({ active }: { active: FilterId }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, {
    damping: 28,
    stiffness: 180,
    mass: 0.6,
  });
  const y = useTransform(
    smoothVelocity,
    [-2000, 0, 2000],
    [-28, 0, 28],
    { clamp: true },
  );

  return (
    <motion.aside
      aria-label="작업 분야 카테고리"
      style={{ y }}
      className="sticky top-24 hidden self-start border-2 border-graphite will-change-transform md:block"
    >
      <div className="bg-graphite px-6 py-5">
        <h2 className="font-display text-[20px] font-bold tracking-[-0.01em] text-canvas">
          Category
        </h2>
      </div>
      <ul>
        {SIDEBAR_ITEMS.map((item, i) => {
          const isActive = active === item.id;
          const href = item.id === "all" ? "/works" : `/works?category=${item.id}`;
          const isLast = i === SIDEBAR_ITEMS.length - 1;
          return (
            <li key={item.id}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center justify-between gap-3 px-6 py-5 transition-colors duration-200",
                  !isLast && "border-b border-silver",
                  isActive ? "bg-paper" : "hover:bg-paper",
                )}
              >
                <span className="font-body text-[15px] font-bold leading-tight text-graphite">
                  {item.kr}
                </span>
                {isActive ? (
                  <ChevronRight size={18} strokeWidth={2.5} className="text-graphite" />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.aside>
  );
}
