import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { CategorySidebar } from "@/components/works/CategorySidebar";
import { CATEGORIES, WORK_IMAGES, type CategoryId } from "@/lib/site";
import { cn } from "@/lib/cn";
import styles from "./Works.module.css";

export const metadata: Metadata = {
  title: "작업",
  description:
    "열림인테리어 작업 분야 — 금속작업·자동문·도어·창문. 시공 레퍼런스.",
  alternates: { canonical: "/works" },
  openGraph: {
    title: "작업 — 열림인테리어",
    description:
      "열림인테리어 작업 분야 — 금속작업·자동문·도어·창문. 시공 레퍼런스.",
    url: "/works",
  },
};

type FilterId = "all" | CategoryId;

const SIDEBAR_ITEMS: { id: FilterId; kr: string }[] = [
  { id: "all", kr: "전체" },
  ...CATEGORIES.map((c) => ({ id: c.id, kr: c.kr })),
];

type SearchParams = { category?: string };

export default async function WorksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const active: FilterId =
    sp.category && CATEGORIES.some((c) => c.id === sp.category)
      ? (sp.category as CategoryId)
      : "all";

  return (
    <>
      <Container as="section">
        <PageHeader titleKr="작업 레퍼런스" />
      </Container>

      <Container as="section" className="pb-12 md:pb-24">
        <div className="grid gap-4 md:grid-cols-[260px_1fr] md:gap-12">
          {/* 좌측 사이드바 (Desktop) */}
          <CategorySidebar active={active} />

          {/* 모바일 가로 스크롤 카테고리 row */}
          <MobileCategoryRow active={active} />

          {/* 우측 콘텐츠 영역 */}
          <div>
            {/* 그리드 — 모바일 1열, 데스크톱 2열 배치로 여백 채움 */}
            <div className={styles.grid}>
              {getWorkItems(active).map((w, i) => (
                <ReferenceCard
                  key={`${w.categoryId}-${w.itemName}`}
                  idx={i + 1}
                  workName={w.itemName}
                  categoryKr={w.categoryKr}
                  image={w.image}
                />
              ))}
            </div>


          </div>
        </div>
      </Container>
    </>
  );
}

/* ─────────── Helpers ─────────── */

type WorkEntry = {
  categoryId: CategoryId;
  categoryKr: string;
  itemName: string;
  image: string | undefined;
};

function getWorkItems(active: FilterId): WorkEntry[] {
  const cats = active === "all"
    ? CATEGORIES
    : CATEGORIES.filter((c) => c.id === active);
  return cats.flatMap((c) =>
    c.items.map((itemName) => ({
      categoryId: c.id,
      categoryKr: c.kr,
      itemName,
      image: WORK_IMAGES[itemName],
    })),
  );
}

/* ─────────── Subcomponents ─────────── */

function MobileCategoryRow({ active }: { active: FilterId }) {
  return (
    <nav
      aria-label="작업 분야 카테고리 (모바일)"
      className={styles.mobileCategoryRow}
    >
      {SIDEBAR_ITEMS.map((item, i) => {
        const isActive = active === item.id;
        const href = item.id === "all" ? "/works" : `/works?category=${item.id}`;
        const isLast = i === SIDEBAR_ITEMS.length - 1;
        return (
          <Link
            key={item.id}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              styles.mobileCategoryLink,
              !isLast && styles.mobileCategoryLinkBorder,
              isActive ? styles.mobileCategoryLinkActive : styles.mobileCategoryLinkInactive
            )}
          >
            {item.kr}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * 세로형 카드 구조로 리디자인된 ReferenceCard 컴포넌트
 * - 가로로 텅 비어 보이던 문제를 세로 컴팩트 비율과 2열 그리드로 해결
 * - 스타일링은 CSS Modules 사용 (Works.module.css)
 */
function ReferenceCard({
  idx,
  workName,
  categoryKr,
  image,
}: {
  idx: number;
  workName: string;
  categoryKr: string;
  image: string | undefined;
}) {
  return (
    <article className={styles.card}>
      {/* 카드 이미지 영역 (4:3 비율 고정 및 호버 시 미세 줌인) */}
      <div className={styles.imageArea}>
        {image ? (
          <Image
            src={image}
            alt={`${workName} 작업 사진`}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>
            <span className={styles.noImageText}>
              시공 사진 준비 중
            </span>
          </div>
        )}
      </div>

      {/* 본문 정보 영역 */}
      <div className={styles.content}>
        <h3 className={styles.title}>
          {workName}
        </h3>

        {/* 점선 구분선 */}
        <hr className={styles.divider} />

        {/* 메타 데이터 (분야) */}
        <dl className={styles.meta}>
          <dt className={styles.metaLabel}>
            분야
          </dt>
          <dd className={styles.metaValue}>{categoryKr}</dd>
        </dl>
      </div>
    </article>
  );
}
