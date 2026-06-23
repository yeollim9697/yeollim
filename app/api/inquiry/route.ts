import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  inquirySchema,
  MAX_FILES,
  MAX_FILE_BYTES,
  isAcceptedImage,
} from "@/lib/inquiry-schema";
import { CATEGORIES } from "@/lib/site";
import { InquiryEmail } from "@/components/emails/InquiryEmail";

// Buffer / resend 사용 — Node.js 런타임 강제
export const runtime = "nodejs";

const idToKr = new Map<string, string>(
  CATEGORIES.map((c) => [c.id, c.kr]),
);

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json(
      { ok: false, error: "잘못된 요청입니다." },
      { status: 400 },
    );
  }

  // honeypot — 채워졌으면 봇으로 간주, 발송 없이 성공처럼 응답
  const company = String(form.get("company") ?? "");
  if (company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 서버측 권위 검증
  const parsed = inquirySchema.safeParse({
    name: form.get("name") ?? "",
    phone: form.get("phone") ?? "",
    email: form.get("email") ?? "",
    categories: form.getAll("categories").map(String),
    details: form.get("details") ?? "",
    consent: form.get("consent") === "true",
    company,
  });
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "입력값을 확인해주세요.";
    return NextResponse.json({ ok: false, error: first }, { status: 422 });
  }
  const data = parsed.data;

  // 첨부 사진 검증
  const files = form
    .getAll("photos")
    .filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { ok: false, error: `사진은 최대 ${MAX_FILES}장까지 첨부할 수 있습니다.` },
      { status: 422 },
    );
  }
  const attachments: { filename: string; content: Buffer }[] = [];
  for (const f of files) {
    if (!isAcceptedImage(f.type)) {
      return NextResponse.json(
        { ok: false, error: "JPG · PNG · WEBP 이미지만 첨부할 수 있습니다." },
        { status: 422 },
      );
    }
    if (f.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "각 사진은 5MB 이하여야 합니다." },
        { status: 422 },
      );
    }
    attachments.push({
      filename: f.name,
      content: Buffer.from(await f.arrayBuffer()),
    });
  }

  // 환경변수 확인
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error(
      "[inquiry] 누락된 env: RESEND_API_KEY / INQUIRY_TO_EMAIL / INQUIRY_FROM_EMAIL",
    );
    return NextResponse.json(
      { ok: false, error: "메일 설정이 완료되지 않았습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }

  const categoryLabels = data.categories.map((id) => idToKr.get(id) ?? id);
  const receivedAt = new Date().toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
  });

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: `열림인테리어 문의 <${from}>`,
      to,
      replyTo:
        data.email && data.email.length > 0 ? data.email : undefined,
      subject: `[문의] ${data.name} / ${categoryLabels.join("·")}`,
      react: InquiryEmail({
        name: data.name,
        phone: data.phone,
        email: data.email,
        categoryLabels,
        details: data.details,
        photoCount: attachments.length,
        receivedAt,
      }),
      attachments: attachments.length > 0 ? attachments : undefined,
    });
    if (error) {
      console.error("[inquiry] resend error", error);
      return NextResponse.json(
        {
          ok: false,
          error:
            "메일 발송에 실패했습니다. 잠시 후 다시 시도하거나 전화·카톡으로 연락주세요.",
        },
        { status: 502 },
      );
    }
  } catch (e) {
    console.error("[inquiry] resend throw", e);
    return NextResponse.json(
      { ok: false, error: "메일 발송 중 오류가 발생했습니다." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
