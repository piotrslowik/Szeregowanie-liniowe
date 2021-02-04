module.exports = {
    root: true,
    env: {
      "node": true
    },
    extends: [
      "plugin:vue/essential",
      "eslint:recommended",
      "@vue/typescript",
    ],
    parserOptions: {
      parser: "@typescript-eslint/parser",
    },
    rules: {
        "no-unused-vars": 'off',
        "@typescript-eslint/no-unused-vars": ['error', {
            varsIgnorePattern: '^_',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
        }],
        "vue/valid-v-slot": ['error', {
          allowModifiers: true,
        }],
    },
}