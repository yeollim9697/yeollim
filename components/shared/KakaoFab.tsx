import { SITE } from "@/lib/site";

/**
 * 우측 하단 고정 카카오톡 오픈채팅 버튼 (FAB).
 * - 카카오 옐로우 #FEE500 + 갈색 말풍선 (브랜드 표준)
 * - position: fixed 로 모든 페이지에서 항상 노출
 * - kakao URL 미수신 시 미렌더 (lib/site.ts 의 fallback 사용)
 */
export function KakaoFab() {
  if (!SITE.contact.kakao) return null;

  return (
    <a
      href={SITE.contact.kakao}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="카카오톡 오픈채팅으로 문의하기"
      data-kakao-fab
      className="group fixed bottom-6 right-6 z-[60] flex flex-col items-center md:bottom-8 md:right-8"
    >
      {/* 카카오 옐로우 원형 버튼 */}
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-graphite bg-[#FEE500] transition-colors duration-200 group-hover:bg-[#FFE000] md:h-16 md:w-16">
        <KakaoBubbleIcon className="h-7 w-7 text-[#3C1E1E] md:h-8 md:w-8" />
      </span>
      {/* 하단 캡슐 라벨 — 보더 두께는 원형 버튼과 동일(2px), 음수 마진으로 원과 살짝 겹침 */}
      <span className="relative -mt-2 rounded-full border-2 border-graphite bg-canvas px-3 py-1 text-[11px] font-medium leading-none text-graphite transition-colors duration-200 group-hover:border-silver-deep md:text-xs">
        카카오톡 문의
      </span>
      <span className="sr-only">카카오톡 오픈채팅 열기</span>
    </a>
  );
}

function KakaoBubbleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 3C6.477 3 2 6.477 2 10.764c0 2.808 1.872 5.292 4.703 6.692-.205.792-.747 2.872-.855 3.319-.135.557.205.55.43.4.176-.118 2.808-1.907 3.939-2.677.6.087 1.21.131 1.823.131 5.523 0 10-3.477 10-7.765C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}
