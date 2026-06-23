import type { MetadataRoute } from "next";
import { SITE, CATEGORIES } from "@/lib/site";

/**
 * /sitemap.xml 자동 생성 (Next App Router 파일 컨벤션).
 * - 4개 주요 경로 + /works?category=<id> 4종 (지역+서비스 키워드 커버리지).
 * - 도메인은 lib/site.ts 의 SITE.url 단일 출처에서 읽음.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;

  const main: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/works`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/inquiry`, changeFrequency: "monthly", priority: 0.7 },
  ];

  // 작업 분야별 필터 URL — 각 카테고리가 검색에 독립적으로 노출되도록.
  const categories: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${base}/works?category=${c.id}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...main, ...categories];
}
