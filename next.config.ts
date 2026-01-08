import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hwztchapter.dramaboxdb.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
