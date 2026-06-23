import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * /robots.txt 자동 생성 (Next App Router 파일 컨벤션).
 * - 전체 크롤링 허용, 사이트맵 위치 안내.
 * - 도메인은 lib/site.ts 의 SITE.url 단일 출처에서 읽음.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
