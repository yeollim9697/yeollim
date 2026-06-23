"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import styles from "@/app/inquiry/Inquiry.module.css";

/**
 * 클릭 시 이메일을 클립보드에 복사하는 채널 버튼.
 * - 일반 ChannelButton 과 동일한 borderline 스타일
 * - 복사 성공 시 아이콘이 Check 로 바뀌고 라벨이 "복사됨"으로 2초간 표시
 * - clipboard API 실패 시 fallback 없음 — 이메일 텍스트가 항상 노출돼 있어 수동 선택 가능
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용 (Inquiry.module.css)
 * - 주석은 한글로 작성
 */
export function EmailCopyButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 사용자가 직접 텍스트 선택해 복사할 수 있도록 텍스트가 항상 노출됨
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "이메일이 복사되었습니다" : "이메일 주소 복사하기"}
      className={styles.channelBtn}
    >
      <span className={styles.channelIcon}>
        {copied ? (
          <Check size={18} strokeWidth={2} />
        ) : (
          <Mail size={18} strokeWidth={1.5} />
        )}
      </span>
      <span className={styles.channelContent}>
        <span className={styles.channelLabel}>
          {copied ? "복사됨" : "이메일 (클릭하여 복사)"}
        </span>
        <span className={styles.channelValue}>{email}</span>
      </span>
    </button>
  );
}
