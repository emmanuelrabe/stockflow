import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import eslintPluginPrettier from "eslint-plugin-prettier/recommended"
import { defineConfig } from "eslint/config"

export default defineConfig ([
  {
    ignores: [
      "**/dist/**",
      "**/.next/**",
      "**/node_modules/**",
      "**/generated/prisma/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2022,
        ...globals.browser
      },
      parserOptions: {
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  eslintPluginPrettier,
]);
