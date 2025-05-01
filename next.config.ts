import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['pages', 'components', 'app', 'utils', 'lib'],
  },
};

export default nextConfig;
