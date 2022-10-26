module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],

  rules: {
    camelcase: 'off',
    'no-shadow': 'off',
    'import/no-extraneous-dependencies': 'off',
    'max-len': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': 'off',
    'no-empty-pattern': 'off',
    'arrow-parens': [1, 'always'],
    'consistent-return': 'off',
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    semi: [2, 'never'],
    'no-multiple-empty-lines': 'off',
    'unicorn/number-literal-case': 'off',
    'no-nested-ternary': 'off',
    'no-continue': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/prop-types': 'off', // look again
    'react/no-unescaped-entities': 'off',
    'react/no-array-index-key': 'off',
    'react/button-has-type': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-danger': 'off',
    // A11y things
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
  },

  ignorePatterns: ['node_modules/', '.next/'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          // The app
          ['@/app/copy', './packages/app/copy'],
          ['@/app/constants', './packages/app/constants'],
          ['@/app/helpers', './packages/app/helpers'],
          ['@/app/graphQl', './packages/app/graphQl'],
          ['@/app/tempGlobalData', './packages/app/tempGlobalData'],
          ['@/app', './packages/app/components'],
          // The admin
          ['@/admin/copy', './packages/admin/copy'],
          ['@/admin/constants', './packages/admin/constants'],
          ['@/admin/helpers', './packages/admin/helpers'],
          ['@/admin', './packages/admin/components'],
          // The landing page
          ['@/landing/assets', './packages/landing/assets'],
          ['@/landing/constants', './packages/landing/constants'],
          ['@/landing/copy', './packages/landing/copy'],
          ['@/landing/graphQl', './packages/landing/graphQl'],
          ['@/landing/helpers', './packages/landing/helpers'],
          ['@/landing/pages', './packages/landing/pages'],
          ['@/landing/tasks', './packages/landing/tasks'],
          ['@/landing/tempData', './packages/landing/tempData'],
          ['@/landing', './packages/landing/components'],
          // Shared
          ['@/elements', './packages/shared/components/elements'],
          ['@/icons', './packages/shared/components/icons'],
          ['@/hooks', './packages/shared/components/hooks'],
          ['@/constants', './packages/shared/constants'],
          ['@/helpers', './packages/shared/helpers'],
          ['@/graphQl', './packages/shared/graphQl'],
          ['@', './packages/shared/components'],
          ['~', './packages/shared'],
        ],
        extensions: ['.ts', '.js', '.jsx', '.json', '.css'],
      },
    },
  },
}
