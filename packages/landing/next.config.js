const path = require('path')
const fs = require('fs')
// Next plugins
const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Extract environment variables from local .env file
const dotenv = require('dotenv')

dotenv.config()

// Next phase vars
const {
  PHASE_DEVELOPMENT_SERVER,
} = require('next/constants')

// SETUP TRANSPILE MODULES
const sharedPath = path.resolve(__dirname, '../shared')
const withTM = require('next-transpile-modules')([sharedPath])

// UTIL FOR FETCHING GLOBAL DATA
const fetchGlobalInfo = require('./helpers/fetchGlobalInfo')

// NEXT CONFIG
const { REACT_APP_API_URL, REACT_APP_API_URL_LIVE } = process.env
const build_env = process.env.BUILD_ENV || process.env.NODE_ENV
const isDev = build_env === 'development'
// Show warning if using the live DB locally
const show_live_warning = isDev && REACT_APP_API_URL === REACT_APP_API_URL_LIVE
// Stop here if no API URL
if (!REACT_APP_API_URL) {
  throw Error('NO API URL SPECIFIED')
}

const nextConfig = {
  // Save environment variables
  env: {
    firebase_api_key: process.env.FIREBASE_API_KEY,
    firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_project_id: process.env.FIREBASE_PROJECT_ID,
    firebase_app_id: process.env.FIREBASE_APP_ID,
    react_app_api_url: REACT_APP_API_URL,
    build_env,
    isDev,
    mixpanel_token: build_env === 'production' ? process.env.MIXPANEL_TOKEN_PRODUCTION : process.env.MIXPANEL_TOKEN_STAGING,
    gtm_id: process.env.GTM_ID,
    gtm_auth: process.env.GTM_AUTH,
    gtm_preview: process.env.GTM_PREVIEW,
    release_version: process.env.RELEASE_VERSION,
    show_live_warning,
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
  webpack: (config, { webpack }) => {
    // Reduce size of moment.js
    config.plugins.push(
      // Ignore all locale files of moment.js
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    )
    // Fixes npm packages that depend on `fs` module
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }
    return config
  },
  eslint: {
    // Don't run eslint during build, CI/CD pipeline handles this
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // FETCH GLOBAL DATA
    const cacheDirExists = fs.existsSync('./tempData')
    if (!cacheDirExists) {
      await fs.mkdirSync('./tempData')
    }
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
      {
        source: '/blog/21-music-marketing-strategies-for-2021',
        destination: '/blog/music-marketing-strategies',
        permanent: true,
      },
    ]
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
