const path = require('path')
// Next plugins
const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// Webpack plugins
const dotenv = require('dotenv')

// Extract environment variables from local .env file
dotenv.config()

// Next phase vars
const {
  PHASE_DEVELOPMENT_SERVER,
} = require('next/constants')

// NEXT CONFIG
const nextConfig = {
  // Save environment variables
  env: {
    firebase_api_key: process.env.FIREBASE_API_KEY,
    firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_project_id: process.env.FIREBASE_PROJECT_ID,
    firebase_app_id: process.env.FIREBASE_APP_ID,
    stripe_provider: process.env.STRIPE_PROVIDER,
    react_app_api_url: process.env.REACT_APP_API_URL,
    react_app_api_url_local: process.env.REACT_APP_API_URL_LOCAL,
    dato_key: process.env.DATO_KEY,
    build_env: process.env.BUILD_ENV || process.env.NODE_ENV,
    sentry_dsn: 'https://d3ed114866ac498da2fdd9acf2c6bd87@sentry.io/3732610',
    release_version: process.env.RELEASE_VERSION,
  },
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
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
      }
    }
    return config
  },
}

const sharedPath = path.resolve(__dirname, '../shared')
const withTM = require('next-transpile-modules')([sharedPath])

module.exports = withPlugins([
  [withTM],
  // load and apply a plugin only during development server phase
  [withOffline, {
    dontAutoRegisterSw: true,
  }, ['!', PHASE_DEVELOPMENT_SERVER]],
  // Bundle analyzer
  withBundleAnalyzer,
], nextConfig)
