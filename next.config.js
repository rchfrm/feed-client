// Next plugins
const withPlugins = require('next-compose-plugins')
const withPWA = require('next-pwa')
const withManifest = require('next-manifest')

// Extract environment variables from local .env file
const dotenv = require('dotenv')

dotenv.config()

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
}

module.exports = withPlugins([

  // add a plugin with specific configuration
  [withPWA, {
    pwa: {
      dest: 'public',
    },
  }],

  [withManifest, {
    manifest: {
      output: './public/',
      short_name: 'Feed',
      name: 'Feed',
      icons: [
        {
          src: 'favicon.ico',
          sizes: '64x64 32x32 24x24 16x16',
          type: 'image/x-icon',
        },
        {
          src: '/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      start_url: '/',
      display: 'standalone',
      theme_color: '#000000',
      background_color: '#ffffff',
    },
  }],

], nextConfig)
