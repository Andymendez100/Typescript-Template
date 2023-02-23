module.exports = {
  root: false,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    project: 'tsconfig.json',
    // project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'global-require': 0,
    'import/no-extraneous-dependencies': 'off',
    'import/no-import-module-exports': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
  },
  ignorePatterns: ['.eslintrc.js'],
};
