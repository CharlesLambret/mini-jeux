import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Désactive l'optimisation des images pour GitHub Pages
  },
};

export default nextConfig;
