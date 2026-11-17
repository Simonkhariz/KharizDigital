import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // The demo websites (portfolio projects) keep two patterns the agency site does not use.
    files: ["demos/**", "app/(demo-templates)/**", "app/(showcase-*)/**"],
    rules: {
      // Media comes from /public as plain <img>/<video> so every demo keeps its exact layout.
      "@next/next/no-img-element": "off",
      // Carousels and timers mirror the state of an external widget (Embla, intervals) into
      // React state from inside an effect, which is the intended use of an effect here.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Published files, including the pre-built Kravio dashboard.
    "public/**",
  ]),
]);

export default eslintConfig;
