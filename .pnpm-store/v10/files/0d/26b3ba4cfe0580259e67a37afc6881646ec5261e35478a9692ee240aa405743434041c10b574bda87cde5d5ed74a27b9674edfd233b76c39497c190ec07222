module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    requireConfigFile: false,
  },
  extends: [
    'airbnb-base',
    require.resolve('./rules/base'),
    require.resolve('./rules/import'),
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
};
