"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { NAV, SITE } from "@/lib/site";
import { Container } from "./Container";
import styles from "./Header.module.css";

/**
 * Header — 3등분 레이아웃 + 다크 반전 톤.
 * - 좌측: 심볼 마크 + 한글 워드마크
 * - 중앙(데스크탑): 소개 / 작업 (텍스트 nav)
 * - 우측(데스크탑): 문의하기 버튼 + 전화 아이콘
 * - 모바일: 우측 햄버거 → 풀스크린 오버레이
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 모바일 메뉴 열렸을 때: 스크롤 잠금 + body data 속성 토글 (FAB 등 외부 요소가 감지용)
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      document.body.dataset.menuOpen = "true";
    } else {
      delete document.body.dataset.menuOpen;
    }
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.menuOpen;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // 중앙 텍스트 nav에 노출할 항목 (문의하기는 우측 CTA 버튼으로 분리)
  const centerNav = NAV.filter((n) => n.href !== "/inquiry");
  const inquiryNav = NAV.find((n) => n.href === "/inquiry")!;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full isolate",
          "border-b border-iron",
          "bg-graphite",
        )}
      >
        {/* Brushed metal texture — 색에 영향 없는 미세 질감 (mix-blend-overlay) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 mix-blend-overlay"
          style={{ backgroundImage: "url('/hero/brushed-metal.jpg')" }}
        />
        <Container className="relative flex items-center justify-between py-2.5 md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 md:py-3">
          {/* 좌측: 심볼 + 한글 워드마크 */}
          <Link
            href="/"
            aria-label="열림인테리어 홈"
            className="inline-flex items-center gap-3 justify-self-start shrink-0"
          >
            <Image
              src="/logo/symbol_dark.png"
              alt="열림인테리어 / Yeollim Interior"
              width={48}
              height={48}
              priority
              className="h-8 w-auto select-none invert md:h-9"
            />
            <span className="font-display text-[17px] font-bold tracking-[-0.01em] text-canvas whitespace-nowrap md:text-[18px]">
              열림인테리어
            </span>
          </Link>

          {/* 중앙: 소개 / 작업 (데스크탑) — true page center */}
          <nav
            className="hidden items-stretch justify-center gap-12 self-stretch md:flex"
            aria-label="주 메뉴"
          >
            {centerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center"
              >
                <span
                  className={cn(
                    "font-body text-[15px] font-semibold leading-none transition-colors duration-200",
                    isActive(item.href) ? "text-canvas" : "text-silver group-hover:text-canvas",
                  )}
                >
                  {item.kr}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -bottom-[10px] left-0 right-0 h-0.5 bg-canvas transition-opacity duration-200 md:-bottom-[12px]",
                    isActive(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-30",
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* 우측 (데스크탑): 문의하기 버튼 (히어로 캡슐 버튼 스타일 적용) */}
          <div className="hidden items-center gap-3 justify-self-end md:flex">
            <Link
              href={inquiryNav.href}
              className={cn(
                styles.inquiryBtn,
                isActive(inquiryNav.href)
                  ? styles.inquiryBtnActive
                  : styles.inquiryBtnNormal
              )}
            >
              {inquiryNav.kr}
            </Link>
          </div>

          {/* 모바일 토글 */}
          <button
            type="button"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={styles.mobileToggle}
          >
            {open ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </Container>
      </header>

      {/* 모바일 오버레이 메뉴 */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-graphite/98 backdrop-blur-xl md:hidden",
          "transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <Container className="flex h-full flex-col justify-center pb-24 pt-24">
          <ul className="flex flex-col gap-10">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-display text-[40px] font-medium leading-none tracking-[-0.02em] transition-colors",
                    isActive(item.href) ? "text-canvas" : "text-silver-deep",
                  )}
                >
                  {item.kr}
                </Link>
              </li>
            ))}
          </ul>

          {SITE.contact.phone ? (
            <div className="mt-16 border-t border-iron pt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-silver-deep">
                — 즉시 통화
              </p>
              <a
                href={`tel:${SITE.contact.phone.replace(/[^0-9+]/g, "")}`}
                className={styles.phoneLink}
              >
                <Phone size={20} strokeWidth={1.5} className="text-silver" />
                {SITE.contact.phone}
              </a>
            </div>
          ) : null}
        </Container>
      </div>
    </>
  );
}
