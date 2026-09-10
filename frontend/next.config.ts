import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/customer/dashboard',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
