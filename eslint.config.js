export default [
  {
    ignores: ["node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        window: true,
        document: true,
        console: true,
        module: true,
        require: true,
      },
    },
    rules: {
      indent: ["error", 2],
      "linebreak-style": ["off"],
      quotes: ["error", "double"],
      semi: ["error", "always"],
    },
  },
];
