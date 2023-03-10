module.export = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "prettier",
    "airbnb-typescript",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "react-hooks", "eslint-plugin-no-inline-styles"],
  rules: {
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "arrow-body-style": 0,
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
    "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies
    "react/button-has-type": "error",
    "react/no-array-index-key": "error",
    "no-inline-styles/no-inline-styles": 2,
    "comma-dangle": "off",
    "@typescript-eslint/comma-dangle": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "eslint-no-restricted-exports": "off",
    "no-restricted-exports": [
      "error",
      {
        restrictedNamedExports: ["then"],
      },
    ],
    "react/destructuring-assignment": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  ignorePatterns: [".eslintrc.js"],
};
