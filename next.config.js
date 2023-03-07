/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "images2.imgbox.com",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
