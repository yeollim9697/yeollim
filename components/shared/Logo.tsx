import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  variant?: "wordmark" | "symbol-dark" | "symbol-light";
  className?: string;
  /** 헤더에서는 width 140~160, 푸터에서는 더 크게 등 자유 조정 */
  width?: number;
  height?: number;
  withLink?: boolean;
};

/**
 * 워드마크: /logo/Logo.png (검정 워드마크 + 좌측 심볼, 흰 배경 의도)
 * 다크 배경 위에 사용하려면 `invert` 클래스 옵션 사용 — 다크 테마에선 invert 필수.
 */
const SRC = {
  "wordmark":     "/logo/Logo.png",
  "symbol-dark":  "/logo/symbol_dark.png",
  "symbol-light": "/logo/symbol_light.png",
} as const;

export function Logo({
  variant = "wordmark",
  className,
  width = 140,
  height = 32,
  withLink = true,
}: LogoProps) {
  const img = (
    <Image
      src={SRC[variant]}
      alt="열림인테리어 / Yeollim Interior"
      width={width}
      height={height}
      priority
      className={cn("h-auto w-auto select-none", className)}
    />
  );
  if (!withLink) return img;
  return (
    <Link href="/" aria-label="열림인테리어 홈" className="inline-flex items-center">
      {img}
    </Link>
  );
}
