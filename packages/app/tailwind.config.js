import config from '../shared/tailwind.config'

const contentFiles = [
  './components/**/*.jsx',
  './components/*.jsx',
  './pages/**/*.jsx',
  './pages/*.jsx',
  '../shared/components/**/*.jsx',
  '../shared/components/*.jsx',
]
export default config(contentFiles)
