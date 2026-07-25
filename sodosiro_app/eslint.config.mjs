import eslint from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],

  extends: [eslint.configs.recommended, tseslint.configs.recommended],

  plugins: {
    "@typescript-eslint": tseslint.plugin,
    react,
    prettier,
    "unused-imports": unusedImports,
  },

  rules: {
    "@typescript-eslint/no-empty-object-type": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-require-imports": "off",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/consistent-type-imports": "warn",
  },
});
