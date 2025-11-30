module.exports = {
  rules: {
    'arrow-body-style': 'off',
    'brace-style': [
      'error',
      'stroustrup',
      { allowSingleLine: true },
    ],
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'key-spacing': [
      'error',
      { mode: 'minimum' },
    ],
    'max-len': ['error',
      {
        code: 160,
        ignoreTrailingComments: true,
      },
    ],
    'no-continue': 'off',
    'no-param-reassign': [
      'error',
      { props: false },
    ],
    'no-plusplus': 'off',
    // Allow only for-of
    // https://qiita.com/the_red/items/0c826e97b57da6d67621
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-return': 'off',
    'prefer-destructuring': 'off',
    'indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        ArrayExpression: 'first',
        FunctionDeclaration: { body: 1, parameters: 2 },
        FunctionExpression: { body: 1, parameters: 2 },
      },
    ],
    'no-unused-vars': [
      'error',
      { args: 'none' },
    ],
    'padded-blocks': [
      'error',
      { classes: 'always' },
    ],
    'radix': 'off',
    'semi': [
      'error',
      'always',
      { omitLastInOneLineBlock: true },
    ],
    'space-before-function-paren': [
      'error',
      'never',
    ],
  },
};
