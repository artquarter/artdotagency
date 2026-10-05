import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/services", destination: "/what-we-do", permanent: true },
      { source: "/contact", destination: "/enquire", permanent: true },
      ...["community-screenings", "content-creator-programme", "aq-foodhall", "community-events", "art-barbers", "art-salon"].map((slug) => ({
        source: `/work/${slug}`,
        destination: `/case-studies/${slug}`,
        permanent: true,
      })),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
