import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: process.env.firebase_api_key,
  authDomain: process.env.firebase_auth_domain,
  databaseURL: process.env.firebase_database_url,
  projectId: process.env.firebase_project_id,
  storageBucket: process.env.firebase_storage_bucket,
  messagingSenderId: process.env.firebase_messaging_sender_id,
  appId: process.env.firebase_app_id,
}

if (!app.apps.length) {
  app.initializeApp(config)
}

const auth = app.auth()
const provider = new app.auth.FacebookAuthProvider()

// Export firebase functions
export default {

  auth,

  doCreateUserWithEmailAndPassword: (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password)
  },

  doSignInWithEmailAndPassword: async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
      .catch((err) => {
        throw (err)
      })
  },

  doSignOut: () => {
    return auth.signOut()
  },

  doPasswordReset: email => {
    return auth.sendPasswordResetEmail(email)
  },

  doPasswordUpdate: password => {
    return auth.currentUser.updatePassword(password)
  },

  doEmailUpdate: email => {
    return auth.currentUser.updateEmail(email)
  },

  doSignInWithFacebook: () => {
    provider.addScope('read_insights')
    provider.addScope('manage_pages')
    provider.addScope('pages_show_list')
    provider.addScope('ads_management')
    provider.addScope('instagram_basic')
    provider.addScope('instagram_manage_insights')
    return auth.signInWithRedirect(provider)
  },

  linkFacebookAccount: () => {
    provider.addScope('read_insights')
    provider.addScope('manage_pages')
    provider.addScope('pages_show_list')
    provider.addScope('ads_management')
    provider.addScope('instagram_basic')
    provider.addScope('instagram_manage_insights')
    return auth.currentUser.linkWithRedirect(provider)
  },

  connectFacebookUserWithPopUp: () => {
    provider.addScope('read_insights')
    provider.addScope('manage_pages')
    provider.addScope('pages_show_list')
    provider.addScope('ads_management')
    provider.addScope('instagram_basic')
    provider.addScope('instagram_manage_insights')
    return auth.currentUser.linkWithPopup(provider)
  },

  redirectResult: () => {
    return auth.getRedirectResult()
  },

  unlinkFacebook: () => {
    return auth.currentUser.unlink('facebook.com')
  },

  user: uid => {
    app.db.collection('users').doc(uid)
  },

  users: () => {
    app.db.collection('users')
  },

  getVerifyIdToken: () => {
    return auth.currentUser.getIdToken(/* forceRefresh */ true)
  },

  getVerifyIdTokenResult: () => {
    return auth.currentUser.getIdTokenResult()
  },

  deleteUser: () => {
    return auth.currentUser.delete()
  },
}
