import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
} from "@react-email/components";

/**
 * 문의 접수 알림 이메일 템플릿 (열림인테리어 → 수신지).
 * Resend `react` prop 으로 렌더. 미니멀 톤(화이트 캔버스 + graphite 텍스트).
 */
export interface InquiryEmailProps {
  name: string;
  phone: string;
  email?: string;
  categoryLabels: string[]; // 한글 작업 종류
  details: string;
  photoCount: number;
  receivedAt: string; // 사람이 읽는 시각 문자열
}

export function InquiryEmail({
  name,
  phone,
  email,
  categoryLabels,
  details,
  photoCount,
  receivedAt,
}: InquiryEmailProps) {
  return (
    <Html lang="ko">
      <Head />
      <Body style={body}>
        <Container style={container}>
          <Text style={eyebrow}>YEOLLIM INTERIOR · 외주 문의</Text>
          <Heading style={heading}>새 문의가 접수되었습니다</Heading>

          <Hr style={hr} />

          <Section>
            <Row label="이름" value={name} />
            <Row label="연락처" value={phone} />
            <Row label="이메일" value={email && email.length > 0 ? email : "—"} />
            <Row label="작업 종류" value={categoryLabels.join(" · ")} />
            <Row label="첨부 사진" value={`${photoCount}장`} />
          </Section>

          <Hr style={hr} />

          <Text style={fieldLabel}>상세 내용</Text>
          <Text style={detailsText}>{details}</Text>

          <Hr style={hr} />

          <Text style={footer}>
            접수 시각 {receivedAt}
            {email && email.length > 0
              ? " · 이 메일에 그대로 회신하면 문의자에게 전달됩니다."
              : ""}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/** 라벨/값 한 줄 */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <table style={rowTable}>
      <tbody>
        <tr>
          <td style={rowLabel}>{label}</td>
          <td style={rowValue}>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default InquiryEmail;

// --- styles ---
const body: React.CSSProperties = {
  backgroundColor: "#F4F4F5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
  margin: 0,
  padding: "24px 0",
};
const container: React.CSSProperties = {
  backgroundColor: "#FFFFFF",
  border: "1px solid #E5E7EB",
  borderRadius: "4px",
  maxWidth: "560px",
  margin: "0 auto",
  padding: "32px",
};
const eyebrow: React.CSSProperties = {
  fontSize: "11px",
  letterSpacing: "0.16em",
  color: "#8B8F96",
  margin: "0 0 8px",
};
const heading: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: "#161616",
  margin: 0,
};
const hr: React.CSSProperties = {
  borderColor: "#E5E7EB",
  margin: "20px 0",
};
const rowTable: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginBottom: "8px",
};
const rowLabel: React.CSSProperties = {
  width: "96px",
  verticalAlign: "top",
  fontSize: "13px",
  color: "#8B8F96",
  padding: "2px 0",
};
const rowValue: React.CSSProperties = {
  fontSize: "15px",
  color: "#161616",
  padding: "2px 0",
};
const fieldLabel: React.CSSProperties = {
  fontSize: "13px",
  color: "#8B8F96",
  margin: "0 0 6px",
};
const detailsText: React.CSSProperties = {
  fontSize: "15px",
  lineHeight: 1.7,
  color: "#161616",
  whiteSpace: "pre-wrap",
  margin: 0,
};
const footer: React.CSSProperties = {
  fontSize: "12px",
  color: "#8B8F96",
  margin: 0,
};
