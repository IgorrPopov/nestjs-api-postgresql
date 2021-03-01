// module.exports = {
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     project: 'tsconfig.json',
//     sourceType: 'module',
//   },
//   plugins: ['@typescript-eslint/eslint-plugin'],
//   extends: [
//     'plugin:@typescript-eslint/recommended',
//     'prettier/@typescript-eslint',
//     'plugin:prettier/recommended',
//   ],
//   root: true,
//   env: {
//     node: true,
//     jest: true,
//   },
//   ignorePatterns: ['.eslintrc.js'],
//   rules: {
//     '@typescript-eslint/interface-name-prefix': 'off',
//     '@typescript-eslint/explicit-function-return-type': 'off',
//     '@typescript-eslint/explicit-module-boundary-types': 'off',
//     '@typescript-eslint/no-explicit-any': 'off',
//   },
// };

module.exports = {
  // Настройки проекта
  "env": {
      // Проект для браузера
      "browser": true,
      // Включаем возможности ES6
      "es6": true,
      // Добавляем возможности ES2017
      "es2017": true,
      // NodeJS project?
      "node": true
  },
  // Наборы правил
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/eslint-recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "plugin:security/recommended"
  ],
  // Движок парсинга
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      // Движку нужен проект TS для правил с типами
      "project": "tsconfig.json",
      "tsconfigRootDir": "."
  },
  // Плагин с наборами правил для TypeScript
  "plugins": [
      "@typescript-eslint",
      "promise",
      "security"
  ],
  "rules": {
      "no-shadow": "error",
      "no-useless-return": "error",
      "newline-before-return": "error",
      "prefer-object-spread": "error",
      "arrow-body-style": [
          "error",
          "as-needed"
      ],
      "newline-per-chained-call": "error",
      "no-duplicate-imports": [
          "error",
          {
              "includeExports": true
          }
      ],
      "semi": "off",
      "indent": "off",
      "quotes": [
          "error",
          "single"
      ],
      "max-len": [
          "error",
          {
              "code": 150
          }
      ],
      "comma-dangle": [
          "error",
          {
              "arrays": "never",
              "functions": "never"
          }
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/typedef": [
          "error",
          {
              "arrayDestructuring": true,
              "arrowParameter": true,
              "variableDeclaration": false
          }
      ],
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/semi": [
          "error"
      ],
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/unbound-method": [
          "off"
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
          "error",
          {
              "vars": "all",
              "args": "after-used",
              "ignoreRestSiblings": false
          }
      ],
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-unsafe-return": 1,
      "@typescript-eslint/no-unsafe-call": 1,
      "@typescript-eslint/restrict-template-expressions": 1,
      "@typescript-eslint/ban-types": 1,
      "@typescript-eslint/no-floating-promises": 1
  }
};
