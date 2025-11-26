import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },

    rules: {
      "react/react-in-jsx-scope": "off",

      "react/prop-types": "off",

      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
    },

    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
