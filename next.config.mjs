/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Bỏ qua ESLint warnings khi build (chạy eslint riêng trong dev)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript errors vẫn block build
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
