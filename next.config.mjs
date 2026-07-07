/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.100.11"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
