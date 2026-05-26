import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#[0-9a-fA-F]{6}\\b/]",
          message: "Hex color values are not allowed outside lib/tokens/. Use a token from @/lib/tokens instead.",
        },
        {
          selector: "TemplateElement[value.raw=/#[0-9a-fA-F]{6}/]",
          message: "Hex color values are not allowed outside lib/tokens/. Use a token from @/lib/tokens instead.",
        },
      ],
    },
  },
  {
    files: ["lib/tokens/**/*.ts", "lib/brand.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);

export default eslintConfig;
