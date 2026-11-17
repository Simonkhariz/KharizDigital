import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is exported as plain HTML, CSS and JavaScript files into `out/`.
  // Those files can be uploaded to any web host, including shared hosting.
  output: "export",
  // Every page becomes a folder with an index.html (e.g. /work/index.html), so
  // addresses work on Apache without rewrite rules.
  trailingSlash: true,
  images: {
    // There is no image server on static hosting. Images are resized ahead of
    // time by `npm run images` (see scripts/optimize-images.mjs).
    unoptimized: true,
  },
  experimental: {
    // One 404 page for the whole site (app/global-not-found.tsx).
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      // Tailwind CSS v4 runs through this loader. Without it no utility classes are generated.
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
