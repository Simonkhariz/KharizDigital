import type { NextConfig } from "next";

const isStandalone = process.env.NEXT_OUTPUT_MODE === "standalone";

const nextConfig: NextConfig = {
  // If NEXT_OUTPUT_MODE=standalone, build a Node.js standalone server; otherwise export static HTML.
  output: isStandalone ? "standalone" : "export",
  // Every page becomes a folder with an index.html (e.g. /work/index.html), so
  // addresses work on Apache/Node without complex rewrite rules.
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
