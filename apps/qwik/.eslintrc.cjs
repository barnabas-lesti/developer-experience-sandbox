/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      extends: ["plugin:qwik/recommended"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {},
    },
  ],
};
