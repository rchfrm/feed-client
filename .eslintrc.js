module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    parser: 'babel-eslint',
  },
  plugins: [
    'import',
    'react',
  ],

  rules: {
    'camelcase': 'off',
    'no-shadow': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-empty-pattern': 'off',
    'arrow-parens': 'off',
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'semi': [ 2, 'never' ],
    'unicorn/number-literal-case': 'off',
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/media-has-caption": 'off',
  },
};
