/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kjvmwuuexbhvzhshwpkb.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
