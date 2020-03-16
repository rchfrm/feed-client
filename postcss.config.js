module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-import': {},
    'postcss-mixins': {},
    'postcss-calc': {},
    'postcss-nested': {},
    'postcss-color-mod-function': {
      importFrom: [
        './assets/styles/vars.css',
      ],
    },
    'postcss-preset-env': {
      stage: 1,
    },
  },
}
