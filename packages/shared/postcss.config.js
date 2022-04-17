module.exports = (path) => ({
  plugins: [
    'postcss-flexbugs-fixes',
    ['postcss-import', {
      root: `${path}/css`,
    }],
    ['postcss-mixins', {
      mixinsDir: `${path}/css`,
    }],
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
    'tailwindcss/nesting',
    'tailwindcss',
    'autoprefixer',
    'postcss-nested',
  ],
})
