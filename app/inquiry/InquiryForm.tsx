"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, X } from "lucide-react";
import { CATEGORIES } from "@/lib/site";
import {
  inquirySchema,
  type InquiryInput,
  MAX_FILES,
  MAX_FILE_BYTES,
  isAcceptedImage,
} from "@/lib/inquiry-schema";
import styles from "./Inquiry.module.css";

type SubmitStatus = "idle" | "submitting" | "success" | "error";
type Photo = { file: File; url: string };

/**
 * 문의 신청 폼 (클라이언트) — react-hook-form + zod 검증.
 * 제출 시 multipart/form-data 로 /api/inquiry 에 POST → Resend 메일 발송.
 * 사진 첨부 미리보기/삭제, honeypot 스팸 차단 포함.
 */
export function InquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InquiryInput>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      categories: [],
      details: "",
      consent: false,
      company: "",
    },
  });

  const [photos, setPhotos] = useState<Photo[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const photosRef = useRef<Photo[]>([]);

  // 최신 photos 를 ref 에 동기화 (언마운트 정리용)
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);

  // 언마운트 시 object URL 정리
  useEffect(() => {
    return () => {
      photosRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  function onFilesSelected(e: React.ChangeEvent<HTMLInputElement>) {
    setFileError(null);
    const incoming = Array.from(e.target.files ?? []);
    e.target.value = ""; // 동일 파일 재선택 허용
    const next = [...photos];
    for (const f of incoming) {
      if (next.length >= MAX_FILES) {
        setFileError(`사진은 최대 ${MAX_FILES}장까지 첨부할 수 있습니다.`);
        break;
      }
      if (!isAcceptedImage(f.type)) {
        setFileError("JPG · PNG · WEBP 이미지만 첨부할 수 있습니다.");
        continue;
      }
      if (f.size > MAX_FILE_BYTES) {
        setFileError("각 사진은 5MB 이하여야 합니다.");
        continue;
      }
      if (next.some((p) => p.file.name === f.name && p.file.size === f.size)) {
        continue; // 중복 제거
      }
      next.push({ file: f, url: URL.createObjectURL(f) });
    }
    setPhotos(next);
  }

  function removePhoto(idx: number) {
    URL.revokeObjectURL(photos[idx].url);
    setPhotos(photos.filter((_, i) => i !== idx));
  }

  async function onValid(data: InquiryInput) {
    setServerError(null);
    setStatus("submitting");
    const fd = new FormData();
    fd.append("name", data.name);
    fd.append("phone", data.phone);
    fd.append("email", data.email ?? "");
    fd.append("details", data.details);
    fd.append("consent", data.consent ? "true" : "false");
    fd.append("company", data.company ?? "");
    (data.categories ?? []).forEach((c) => fd.append("categories", c));
    photos.forEach((p) => fd.append("photos", p.file));

    try {
      const res = await fetch("/api/inquiry", { method: "POST", body: fd });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerError(json?.error ?? "전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
      }
    } catch {
      setStatus("error");
      setServerError("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  }

  // 제출 성공 — 완료 메시지로 교체
  if (status === "success") {
    return (
      <div className={styles.successBox} role="status">
        <p className={styles.successTitle}>문의가 접수되었습니다</p>
        <p className={styles.successText}>
          빠르게 확인 후 연락드리겠습니다. 추가로 궁금하신 점 있으시면 카카오톡 문의를 이용해 주세요.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      aria-label="외주 신청 폼"
      className={styles.form}
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      <div className={styles.fieldGroup}>
        <FieldLabel num="01" required>이름</FieldLabel>
        <input
          type="text"
          maxLength={30}
          placeholder="홍길동"
          className={styles.input}
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && <p className={styles.errorText}>{errors.name.message}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <FieldLabel num="02" required>연락처</FieldLabel>
        <input
          type="tel"
          placeholder="010-0000-0000"
          className={styles.input}
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && <p className={styles.errorText}>{errors.phone.message}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <FieldLabel num="03">이메일 (선택)</FieldLabel>
        <input
          type="email"
          placeholder="example@example.com"
          className={styles.input}
          aria-invalid={!!errors.email}
          {...register("email")}
        />
        {errors.email && <p className={styles.errorText}>{errors.email.message}</p>}
      </div>

      <div className={styles.fieldGroup}>
        <FieldLabel num="04" required>작업 종류 (중복 선택)</FieldLabel>
        <div className={styles.checkboxGrid}>
          {CATEGORIES.map((c) => (
            <label key={c.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={c.id}
                className={styles.checkboxInput}
                {...register("categories")}
              />
              {c.kr}
            </label>
          ))}
        </div>
        {errors.categories && (
          <p className={styles.errorText}>{errors.categories.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <FieldLabel num="05" required>상세 내용</FieldLabel>
        <textarea
          rows={6}
          maxLength={1000}
          placeholder="작업 위치·규모·희망 시기 등 자유롭게 작성해주세요."
          className={styles.textarea}
          aria-invalid={!!errors.details}
          {...register("details")}
        />
        {errors.details && (
          <p className={styles.errorText}>{errors.details.message}</p>
        )}
      </div>

      <div className={styles.fieldGroup}>
        <FieldLabel num="06">사진 첨부 (선택)</FieldLabel>
        <label className={styles.dropzone}>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className={styles.fileInput}
            onChange={onFilesSelected}
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
            클릭하여 사진 선택 · JPG · PNG · WEBP · 최대 {MAX_FILES}장 · 각 5MB 이하
          </span>
        </label>
        {fileError && <p className={styles.errorText}>{fileError}</p>}

        {photos.length > 0 && (
          <ul className={styles.previewList}>
            {photos.map((p, i) => (
              <li key={`${p.file.name}-${p.file.size}`} className={styles.previewItem}>
                {/* blob 미리보기 — next/image 미사용 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.file.name} className={styles.previewThumb} />
                <button
                  type="button"
                  className={styles.previewRemove}
                  onClick={() => removePhoto(i)}
                  aria-label={`${p.file.name} 삭제`}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* honeypot — 사람에게 숨김 */}
      <div className={styles.hp} aria-hidden>
        <label>
          회사명
          <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
        </label>
      </div>

      <label className={styles.consentLabel}>
        <input type="checkbox" className={styles.consentInput} {...register("consent")} />
        <span>개인정보 수집·이용에 동의합니다. (필수)</span>
      </label>
      {errors.consent && <p className={styles.errorText}>{errors.consent.message}</p>}

      {serverError && (
        <p className={styles.errorText} role="alert">{serverError}</p>
      )}

      <button type="submit" className={styles.submitBtn} disabled={submitting}>
        {submitting ? "전송 중…" : "문의 신청하기"}
      </button>
    </form>
  );
}

/** 폼 필드 라벨 */
function FieldLabel({
  num,
  required,
  children,
}: {
  num: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={styles.label}>
      — {num} / {children}
      {required ? <span className={styles.requiredStar}>*</span> : null}
    </label>
  );
}
