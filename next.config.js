// Next plugins
const withPlugins = require('next-compose-plugins')
const withOffline = require('next-offline')
// Webpack plugins
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const dotenv = require('dotenv')

// Extract environment variables from local .env file
dotenv.config()

// SETUP FAVICON PLUGIN
const faviconPlugin = new FaviconsWebpackPlugin({
  logo: './public/icons/icon.svg',
  outputPath: './pwa',
  prefix: 'pwa/',
  cache: true,
  inject: false,
  favicons: {
    appName: 'Feed',
    appDescription: 'Audience growth for artists, built by archForm',
    developerName: 'archForm',
    developerUrl: 'https://archform.ltd',
    background: '#fff',
    theme_color: '#000',
  },
})

// NEXT CONFIG
const nextConfig = {
  // Save environment variables
  env: {
    firebase_api_key: process.env.FIREBASE_API_KEY,
    firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_database_url: process.env.FIREBASE_DATABASE_URL,
    firebase_project_id: process.env.FIREBASE_PROJECT_ID,
    firebase_storage_bucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebase_messaging_sender_id: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebase_app_id: process.env.FIREBASE_APP_ID,
    stripe_provider: process.env.STRIPE_PROVIDER,
  },
  // Don't show if page can be optimised automatically
  // https://nextjs.org/docs/api-reference/next.config.js/static-optimization-indicator
  devIndicators: {
    autoPrerender: false,
  },
  // Custom webpack
  webpack: (config) => {
    config.plugins.push(faviconPlugin)
    return config
  },
}

module.exports = withPlugins([
  [withOffline],
], nextConfig)
