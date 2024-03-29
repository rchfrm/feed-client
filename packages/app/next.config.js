/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
// Next plugins
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
// Webpack plugins
const dotenv = require('dotenv')

// Extract environment variables from local .env file
dotenv.config()

const sharedPath = path.resolve(__dirname, '../shared')

// LOAD GLOBAL DATA FROM DATO
const globalDataDir = path.resolve(process.cwd(), 'tempGlobalData')
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

const { REACT_APP_API_URL, REACT_APP_API_URL_LIVE, REACT_APP_URL } = process.env
const build_env = process.env.BUILD_ENV || process.env.NODE_ENV
const isDev = build_env === 'development'
// Show warning if using the live DB locally
const show_live_warning = isDev && REACT_APP_API_URL === REACT_APP_API_URL_LIVE
// Stop here if no API URL
if (! REACT_APP_API_URL) {
  throw Error('NO API URL SPECIFIED')
}

const nextConfig = {
  // Save environment variables
  env: {
    firebase_api_key: process.env.FIREBASE_API_KEY,
    firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_project_id: process.env.FIREBASE_PROJECT_ID,
    firebase_app_id: process.env.FIREBASE_APP_ID,
    stripe_provider: process.env.STRIPE_PROVIDER,
    react_app_api_url: REACT_APP_API_URL,
    react_app_url: REACT_APP_URL,
    build_env,
    isDev,
    sentry_dsn: 'https://d3ed114866ac498da2fdd9acf2c6bd87@sentry.io/3732610',
    mixpanel_token: process.env.MIXPANEL_TOKEN,
    gtm_id: process.env.GTM_ID,
    gtm_auth: process.env.GTM_AUTH,
    gtm_preview: process.env.GTM_PREVIEW,
    recaptcha_key: process.env.RECAPTCHA_KEY,
    release_version: process.env.RELEASE_VERSION,
    show_live_warning,
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
  // Build static data
  // NOTE: This can go in any async config func.
  // You really just need it to await before Next starts the dev server.
  async redirects() {
    await fetchGlobalData()

    // HANDLE REDIRECTS
    return [
      {
        source: '/connect-profiles',
        destination: '/connect-accounts',
        permanent: true,
      },
      {
        source: '/join/final-step',
        destination: '/connect-accounts',
        permanent: true,
      },
    ]
  },
  transpilePackages: [sharedPath],
  experimental: { esmExternals: true },
}

module.exports = withPlugins([
  withBundleAnalyzer,
], nextConfig)
