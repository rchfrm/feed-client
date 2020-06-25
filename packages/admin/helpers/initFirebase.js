import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.firebase_api_key,
  authDomain: process.env.firebase_auth_domain,
  databaseURL: process.env.firebase_database_url,
  projectId: process.env.firebase_project_id,
}

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}
