import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'], // 去掉控制台警告
  },
};

export default nextConfig;
