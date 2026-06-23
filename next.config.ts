import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // 멀티 lockfile 경고 잠재우기 — 이 프로젝트 디렉토리가 워크스페이스 루트
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
