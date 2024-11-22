/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "metaschool.so",
      },
    ],
  },
};

export default nextConfig;
