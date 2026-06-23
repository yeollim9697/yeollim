import { cn } from "@/lib/cn";

type PageHeaderProps = {
  num?: string;         // "01" "02" "03" — 생략 시 넘버 라벨 미노출
  titleKr: string;      // "소개"
  /** @deprecated 미니멀 헤더에선 렌더 안 됨. 호환성 유지용으로만 인자 받음 */
  titleEn?: string;
  /** @deprecated 미니멀 헤더에선 렌더 안 됨 */
  intro?: string;
  className?: string;
};

/**
 * PageHeader — 미니멀 페이지 마커.
 * 단일 row: "ㅡ 02. 작업" 형태. 영문/intro 미노출.
 * 캔버스 화이트 + graphite 텍스트 + 하단 굵은 라인 separator.
 */
export function PageHeader({ num, titleKr, className }: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-baseline gap-4 py-6 md:gap-5 md:py-8",
        className,
      )}
    >
      {num ? (
        <span className="font-mono text-[12px] font-bold tracking-[0.14em] text-silver-deep md:text-[13px]">
          — {num}.
        </span>
      ) : null}
      <h1 className="font-display text-[22px] font-bold leading-none tracking-[-0.01em] text-graphite md:text-[26px]">
        {titleKr}
      </h1>
    </header>
  );
}
