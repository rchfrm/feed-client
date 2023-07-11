const config = require('../shared/tailwind.config.js')

const contentFiles = [
  './components/**/*.{jsx,tsx}',
  './components/*.{jsx,tsx}',
  './pages/**/*.{jsx,tsx}',
  './pages/*.{jsx,tsx}',
  '../shared/components/**/*.{jsx,tsx}',
  '../shared/components/*.{jsx,tsx}',
]

module.exports = config(contentFiles)
