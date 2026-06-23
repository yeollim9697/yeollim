import type { Metadata } from "next";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmailCopyButton } from "@/components/inquiry/EmailCopyButton";
import { InquiryForm } from "./InquiryForm";
import { SITE } from "@/lib/site";
import styles from "./Inquiry.module.css";

export const metadata: Metadata = {
  title: "신청",
  description: "외주 / 견적 문의. 폼 또는 카톡·전화·메일로 연락주세요.",
  alternates: { canonical: "/inquiry" },
  openGraph: {
    title: "문의하기 — 열림인테리어",
    description: "외주 / 견적 문의. 폼 또는 카톡·전화·메일로 연락주세요.",
    url: "/inquiry",
  },
};

/**
 * 리디자인된 문의하기(Inquiry) 페이지 컴포넌트
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용 (Inquiry.module.css)
 * - 주석은 한글로 작성
 * - 아웃라인 테두리를 1px로 줄이고, 접수 버튼을 캡슐형으로 세련되게 리디자인
 */
export default function InquiryPage() {
  return (
    <>
      <Container as="section">
        <PageHeader titleKr="문의하기" />
      </Container>

      <Container as="section" className={styles.inquiryContainer}>
        <div className={styles.grid}>
          {/* 외주 신청 폼 (클라이언트) */}
          <InquiryForm />

          {/* 직접 연락 채널 */}
          <aside aria-label="직접 연락 채널" className={styles.aside}>
            <h2 className={styles.asideTitle}>
              — 직접 연락
            </h2>
            <p className={styles.asideDesc}>
              빠른 응대를 원하시면 폼 대신 아래 채널을 이용해주세요.
            </p>

            <div className={styles.channelList}>
              <ChannelButton
                icon={<MessageCircle size={18} strokeWidth={1.5} />}
                label="카카오톡 오픈채팅"
                value={SITE.contact.kakao ? "채팅 열기" : "{{카톡 링크}}"}
                href={SITE.contact.kakao || "#"}
                external
              />
              <ChannelButton
                icon={<Phone size={18} strokeWidth={1.5} />}
                label="전화 걸기"
                value={SITE.contact.phone || "{{전화번호}}"}
                href={
                  SITE.contact.phone
                    ? `tel:${SITE.contact.phone.replace(/[^0-9+]/g, "")}`
                    : "#"
                }
              />
              {SITE.contact.email ? (
                <EmailCopyButton email={SITE.contact.email} />
              ) : (
                <ChannelButton
                  icon={<Mail size={18} strokeWidth={1.5} />}
                  label="이메일 보내기"
                  value="{{이메일}}"
                  href="#"
                />
              )}
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}

/**
 * 직접 연락 채널 카드 버튼 서브 컴포넌트
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용 (Inquiry.module.css)
 */
function ChannelButton({
  icon, label, value, href, external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={styles.channelBtn}
    >
      <span className={styles.channelIcon}>{icon}</span>
      <span className={styles.channelContent}>
        <span className={styles.channelLabel}>
          {label}
        </span>
        <span className={styles.channelValue}>
          {value}
        </span>
      </span>
    </a>
  );
}
