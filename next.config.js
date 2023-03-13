/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images2.imgbox.com" },
      { hostname: "i.imgur.com" },
      { hostname: "farm1.staticflickr.com" },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
