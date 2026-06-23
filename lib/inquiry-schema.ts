import { z } from "zod";
import { CATEGORIES } from "@/lib/site";

/**
 * 문의 폼 공유 검증 스키마/상수 — 클라이언트(react-hook-form)와
 * 서버(API route)에서 동일하게 사용해 단일 출처로 검증한다.
 */

// 유효한 작업 종류 id 목록 (CATEGORIES 단일 출처에서 파생)
export const CATEGORY_IDS = CATEGORIES.map((c) => c.id) as readonly string[];

// 사진 첨부 제약
export const MAX_FILES = 5;
export const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function isAcceptedImage(type: string): boolean {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(type);
}

export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요.")
    .max(30, "이름은 30자 이내로 입력해주세요."),
  phone: z
    .string()
    .trim()
    .min(1, "연락처를 입력해주세요.")
    .regex(/^[0-9+\-\s()]{7,20}$/, "올바른 연락처를 입력해주세요."),
  // 선택 입력 — 비어있거나 올바른 이메일 형식
  email: z
    .string()
    .trim()
    .email("올바른 이메일 형식이 아닙니다.")
    .optional()
    .or(z.literal("")),
  categories: z
    .array(z.string())
    .min(1, "작업 종류를 1개 이상 선택해주세요.")
    .refine(
      (arr) => arr.every((v) => CATEGORY_IDS.includes(v)),
      "알 수 없는 작업 종류입니다.",
    ),
  details: z
    .string()
    .trim()
    .min(1, "상세 내용을 입력해주세요.")
    .max(1000, "상세 내용은 1000자 이내로 입력해주세요."),
  // 필수 동의
  consent: z
    .boolean()
    .refine((v) => v === true, "개인정보 수집·이용에 동의해주세요."),
  // honeypot — 사람은 비워둠, 봇이 채우면 차단
  company: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
