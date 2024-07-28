/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  overrides: [
    {
      files: ["**/*.{js,ts}"],
      rules: {
        "no-console": "off",
      },
    },
  ],
};
