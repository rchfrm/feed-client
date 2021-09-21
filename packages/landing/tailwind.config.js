const config = require('../shared/tailwind.config.js')

const purgeFiles = [
  './components/**/*.jsx',
  './pages/**/*.jsx',
  '../shared/components/**/*.jsx',
]
module.exports = config(purgeFiles)
