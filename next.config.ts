import type { NextConfig } from "next";
import { join } from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: join(__dirname),
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "themodernpsychology.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
