const path = require('path')
// Next plugins
const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Next phase vars
const {
  PHASE_DEVELOPMENT_SERVER,
} = require('next/constants')

// SETUP TRANSPILE MODULES
const sharedPath = path.resolve(__dirname, '../shared')
const withTM = require('next-transpile-modules')([sharedPath])

// NEXT CONFIG
const nextConfig = {
  // Don't show if page can be optimised automatically
  // https://nextjs.org/docs/api-reference/next.config.js/static-optimization-indicator
  devIndicators: {
    autoPrerender: false,
  },
  workboxOpts: {
    exclude: [/.fbcdn\.net/],
    runtimeCaching: [
      {
        urlPattern: /.fbcdn\.net/,
        handler: 'NetworkOnly',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://tryfeed.co',
        permanent: false,
      },
      {
        source: '/instagram',
        destination: 'https://tryfeed.co',
        permanent: false,
      },
    ]
  },
  eslint: {
    // Don't run eslint during build, CI/CD pipeline handles this
    ignoreDuringBuilds: true,
  },
  webpack: (config, { webpack }) => {
    // Reduce size of moment.js
    config.plugins.push(
      // Ignore all locale files of moment.js
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    )
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
}

module.exports = withPlugins([
  [withTM],
  // load and apply a plugin only during development server phase
  [withOffline, {
    dontAutoRegisterSw: true,
  }, ['!', PHASE_DEVELOPMENT_SERVER]],
  // Bundle analyzer
  withBundleAnalyzer,
], nextConfig)
