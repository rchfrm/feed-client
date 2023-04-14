const path = require('path')
const fs = require('fs')
// Next plugins
const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// Extract environment variables from local .env file
const dotenv = require('dotenv')

dotenv.config()

const sharedPath = path.resolve(__dirname, '../shared')

// NEXT CONFIG
const build_env = process.env.BUILD_ENV || process.env.NODE_ENV

const nextConfig = {
  // Save environment variables
  env: {
    firebase_api_key: process.env.FIREBASE_API_KEY,
    firebase_auth_domain: process.env.FIREBASE_AUTH_DOMAIN,
    firebase_project_id: process.env.FIREBASE_PROJECT_ID,
    firebase_app_id: process.env.FIREBASE_APP_ID,
    build_env,
    mixpanel_token: build_env === 'production' ? process.env.MIXPANEL_TOKEN_PRODUCTION : process.env.MIXPANEL_TOKEN_STAGING,
    gtm_id: process.env.GTM_ID,
    gtm_auth: process.env.GTM_AUTH,
    gtm_preview: process.env.GTM_PREVIEW,
    release_version: process.env.RELEASE_VERSION,
  },
  webpack: (config, { webpack }) => {
    // Support import of markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
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
    if (! cacheDirExists) {
      await fs.mkdirSync('./tempData')
    }
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
      {
        source: '/join',
        destination: 'https://app.tryfeed.co/join',
        permanent: true,
      },
    ]
  },
  transpilePackages: [sharedPath],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/feed-public/**',
      },
    ],
  },
}

module.exports = withPlugins([
  withBundleAnalyzer,
], nextConfig)
