module.exports = {
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    // project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'global-require': 0,
  },
};
