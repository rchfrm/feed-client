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

// SETUP TRANSPILE MODULES
const sharedPath = path.resolve(__dirname, '../shared')
const withTM = require('next-transpile-modules')([sharedPath])

// LOAD GLOBAL DATA FROM DATO
const globalDataDir = path.resolve(process.cwd(), 'tempGlobalData')
const fs = require('fs')
const getDatoData = require('../shared/helpers/getDatoData')
const getQuery = require('./graphQl/globalDataQuery')

const fetchGlobalData = () => {
  const query = getQuery()
  const pageKey = 'globalDataQuery'
  const forceLoad = true
  return getDatoData(query, pageKey, forceLoad).then((data) => {
    const dataString = JSON.stringify(data.data)
    const cachedFile = `${globalDataDir}/globalData.json`
    fs.writeFileSync(cachedFile, dataString)
  })
}


const { REACT_APP_API_URL, REACT_APP_API_URL_LIVE } = process.env
const build_env = process.env.BUILD_ENV || process.env.NODE_ENV
const isDev = build_env === 'development'
// Show warning if using the live DB locally
const show_live_warning = isDev && REACT_APP_API_URL === REACT_APP_API_URL_LIVE
// Stop here if no API URL
if (!REACT_APP_API_URL) {
  throw Error('NO API URL SPECIFIED')
}

// NEXT CONFIG
const nextConfig = {
  // Save environment variables
  env: {
    firebase_api_key: process.env.FIREBASE_API_KEY,
    firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_project_id: process.env.FIREBASE_PROJECT_ID,
    firebase_app_id: process.env.FIREBASE_APP_ID,
    stripe_provider: process.env.STRIPE_PROVIDER,
    react_app_api_url: REACT_APP_API_URL,
    build_env,
    isDev,
    sentry_dsn: 'https://d3ed114866ac498da2fdd9acf2c6bd87@sentry.io/3732610',
    mixpanel_token: process.env.MIXPANEL_TOKEN,
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
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
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
  // Build static data
  // NOTE: This can go in any async config func.
  // You really just need it to await before Next starts the dev server.
  async redirects() {
    await fetchGlobalData()
    return []
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
