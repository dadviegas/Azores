import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**", "**/.next/**", "_site/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["packages/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@azores/ux", "@azores/ux/*"],
              message:
                "@azores/ui must not import @azores/ux. UI is presentation-only; flow/behavior lives in UX.",
            },
          ],
        },
      ],
    },
  },
  {
    // Build tooling runs in Node, not in the browser. CommonJS loaders are
    // expected; rspack configs read process.env.
    files: [
      "**/rspack.config.mjs",
      "tools/**/*.{mjs,cjs,js}",
      "vitest.config.ts",
      "vitest.setup.ts",
    ],
    languageOptions: {
      globals: {
        process: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
);
