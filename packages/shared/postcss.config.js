module.exports = (path) => ({
  plugins: [
    'postcss-flexbugs-fixes',
    'postcss-import',
    'postcss-mixins',
    'postcss-calc',
    'postcss-extend',
    'postcss-easing-gradients',
    ['postcss-color-mod-function', {
      importFrom: [
        `${path}/css/vars.css`,
      ],
    }],
    ['postcss-preset-env', {
      stage: 1,
      preserve: false,
      importFrom: [
        `${path}/css/vars.css`,
      ],
    }],
    'tailwindcss',
    'autoprefixer',
    'postcss-nested',
  ],
})
