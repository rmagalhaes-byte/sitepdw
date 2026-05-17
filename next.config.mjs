/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["better-sqlite3"],
  allowedDevOrigins: ["172.26.14.194", "192.168.1.78", "localhost:3000"]
};

export default nextConfig;
