import dotenv from 'dotenv'
// Extract environment variables from local .env file
dotenv.config()

module.exports = {
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
}
