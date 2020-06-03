module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    'postcss-import',
    'postcss-mixins',
    'postcss-calc',
    'postcss-extend',
    ['postcss-color-mod-function', {
      importFrom: [
        './assets/styles/vars.css',
      ],
    }],
    ['postcss-preset-env', {
      stage: 1,
      preserve: false,
      importFrom: [
        './assets/styles/vars.css',
      ],
    }],
    'tailwindcss',
    'autoprefixer',
    'postcss-nested',
  ],
}
