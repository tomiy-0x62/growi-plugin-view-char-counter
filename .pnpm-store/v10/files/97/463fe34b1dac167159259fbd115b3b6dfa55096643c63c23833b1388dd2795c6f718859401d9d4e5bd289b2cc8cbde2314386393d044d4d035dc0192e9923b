const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
  ],
  settings: {
    // prevent import/no-unresolved
    // see: https://qiita.com/282Haniwa/items/76d56a6a7e9d0db95a33
    'import/resolver': {
      typescript: {
        config: path.join(__dirname, './webpack.config.js'),
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    // disable the rule for all files
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    // respect eslint-config-airbnb
    // see: https://github.com/airbnb/javascript/blob/5b462a04cdfebba712a3df18926edfcb4103d2a9/packages/eslint-config-airbnb-base/rules/best-practices.js#L88-L94
    '@typescript-eslint/no-empty-function': ['error', {
      allow: [
        'arrowFunctions',
        'functions',
        'methods',
      ],
    }],
  },
  overrides: [
    // https://github.com/Shopify/eslint-plugin-shopify/issues/159#issuecomment-485813838
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-unused-vars': 'off',
      },
    },
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': ['error']
      },
    },
  ],
};
