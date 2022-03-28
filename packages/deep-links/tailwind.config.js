const config = require('../shared/tailwind.config.js')

const purgeFiles = [
  './components/**/*.jsx',
  './components/*.jsx',
  './pages/**/*.jsx',
  './pages/*.jsx',
  '../shared/components/**/*.jsx',
  '../shared/components/*.jsx',
]
module.exports = config(purgeFiles)
