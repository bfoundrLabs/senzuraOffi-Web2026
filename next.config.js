let withBundleAnalyzer;
try {
  // Attempt to load optional bundle analyzer. If it's not installed, fall back to identity.
  withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn(
    "@next/bundle-analyzer not found — continuing without analyzer.",
  );
  withBundleAnalyzer = (config) => config;
}

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "js"],
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["flagcdn.com", "i.ibb.co", "res.cloudinary.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = {
      fs: false,
      net: false,
      dns: false,
      child_process: false,
      tls: false,
    };

    return config;
  },
});

module.exports = nextConfig;
