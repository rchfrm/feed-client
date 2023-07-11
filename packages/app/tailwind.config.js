import config from '../shared/tailwind.config'

const contentFiles = [
  './components/**/*.{jsx,tsx}',
  './components/*.{jsx,tsx}',
  './pages/**/*.{jsx,tsx}',
  './pages/*.{jsx,tsx}',
  '../shared/components/**/*.{jsx,tsx}',
  '../shared/components/*.{jsx,tsx}',
]

module.exports = config(contentFiles)
