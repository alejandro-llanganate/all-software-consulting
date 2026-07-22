import type { NextConfig } from "next";
import { join } from "path";

const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "all-software-consulting";
const basePath = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  env: isGithubPages ? { NEXT_PUBLIC_BASE_PATH: basePath } : undefined,
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true,
      }
    : {
        output: "standalone" as const,
        outputFileTracingRoot: join(__dirname),
      }),
  images: {
    unoptimized: isGithubPages,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "themodernpsychology.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
