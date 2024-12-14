import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["izmqacyyztpdfprvomyv.supabase.co"], // Add your Supabase domain
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL, // Supabase public URL
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // Supabase public anon key
  },
};

export default nextConfig;