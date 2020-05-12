const purgecss = [
  '@fullhuman/postcss-purgecss',
  {
    content: ['./components/**/*.jsx', './pages/**/*.jsx'],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  },
]

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    'postcss-import',
    'postcss-mixins',
    'postcss-calc',
    'postcss-nested',
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
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
  ],
}
