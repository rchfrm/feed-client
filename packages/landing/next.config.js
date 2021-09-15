// Next plugins
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// UTIL FOR FETCHING GLOBAL DATA
const fetchGlobalInfo = require('./helpers/fetchGlobalInfo')

// NEXT CONFIG
const build_env = process.env.BUILD_ENV || process.env.NODE_ENV

const nextConfig = {
  // Save environment variables
  env: {
    build_env,
    mixpanel_token: build_env === 'production' ? process.env.MIXPANEL_TOKEN_PRODUCTION : process.env.MIXPANEL_TOKEN_STAGING,
    release_version: process.env.RELEASE_VERSION,
  },
  // Don't show if page can be optimised automatically
  // https://nextjs.org/docs/api-reference/next.config.js/static-optimization-indicator
  devIndicators: {
    autoPrerender: false,
  },
  webpack: (config, { webpack }) => {
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    // Reduce size of moment.js
    config.plugins.push(
      // Ignore all locale files of moment.js
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    )
    return config
  },
  async redirects() {
    // FETCH GLOBAL DATA
    await fetchGlobalInfo()
    // HANDLE REDIRECTS
    return [
      {
        source: '/post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/blog/post/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = withPlugins([
  // Bundle analyzer
  withBundleAnalyzer,
], nextConfig)
