import type { Metadata } from "next";
import { MessageCircle, Phone, Mail, ImagePlus } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { PageHeader } from "@/components/shared/PageHeader";
import { EmailCopyButton } from "@/components/inquiry/EmailCopyButton";
import { SITE, CATEGORIES } from "@/lib/site";
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
          {/* 외주 신청 폼 */}
          <form aria-label="외주 신청 폼" className={styles.form}>
            <div className={styles.fieldGroup}>
              <FieldLabel num="01" required>이름</FieldLabel>
              <input
                type="text"
                maxLength={30}
                placeholder="홍길동"
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <FieldLabel num="02" required>연락처</FieldLabel>
              <input
                type="tel"
                placeholder="010-0000-0000"
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <FieldLabel num="03">이메일 (선택)</FieldLabel>
              <input
                type="email"
                placeholder="example@example.com"
                className={styles.input}
              />
            </div>

            <div className={styles.fieldGroup}>
              <FieldLabel num="04" required>작업 종류 (중복 선택)</FieldLabel>
              <div className={styles.checkboxGrid}>
                {CATEGORIES.map((c) => (
                  <label key={c.id} className={styles.checkboxLabel}>
                    <input 
                      type="checkbox" 
                      name="categories" 
                      value={c.id} 
                      className={styles.checkboxInput} 
                    />
                    {c.kr}
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <FieldLabel num="05" required>상세 내용</FieldLabel>
              <textarea
                rows={6}
                maxLength={1000}
                placeholder="작업 위치·규모·희망 시기 등 자유롭게 작성해주세요."
                className={styles.textarea}
              />
            </div>

            <div className={styles.fieldGroup}>
              <FieldLabel num="06">사진 첨부 (선택)</FieldLabel>
              {/* 사진 첨부 드롭존 — 현재 UI 형태만, 백엔드 업로드는 추후 연결 */}
              <label className={styles.dropzone}>
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  multiple
                  className={styles.fileInput}
                />
                <ImagePlus
                  size={26}
                  strokeWidth={1.5}
                  className={styles.dropzoneIcon}
                  aria-hidden
                />
                <span className={styles.dropzoneText}>
                  도면과 현장 철거사진 등 상담에 필요한 사진을 첨부해 주세요.
                </span>
                <span className={styles.dropzoneHint}>
                  클릭하여 사진 선택 · JPG · PNG
                </span>
              </label>
            </div>

            <label className={styles.consentLabel}>
              <input type="checkbox" required className={styles.consentInput} />
              <span>개인정보 수집·이용에 동의합니다. (필수)</span>
            </label>

            <button
              type="submit"
              className={styles.submitBtn}
            >
              문의 신청하기
            </button>
          </form>

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
 * 폼 필드 라벨 서브 컴포넌트
 * - 모든 컴포넌트는 함수형으로 작성
 * - 스타일링은 CSS Modules 사용 (Inquiry.module.css)
 */
function FieldLabel({
  num, required, children,
}: { num: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className={styles.label}>
      — {num} / {children}
      {required ? <span className={styles.requiredStar}>*</span> : null}
    </label>
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
