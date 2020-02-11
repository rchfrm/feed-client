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

const provider = new app.auth.FacebookAuthProvider()
app.initializeApp(config)
const auth = app.auth()

// Export firebase functions
export default {

  auth,

  doCreateUserWithEmailAndPassword: (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
  },

  doSignInWithEmailAndPassword: async (email, password) => {
    return auth.signInWithEmailAndPassword(email, password)
      .catch((err) => {
        throw (err)
      })
  },

  doSignOut: () => {
    auth.signOut()
  },

  doPasswordReset: email => {
    auth.sendPasswordResetEmail(email)
  },

  doPasswordUpdate: password => {
    auth.currentUser.updatePassword(password)
  },

  doEmailUpdate: email => {
    auth.currentUser.updateEmail(email)
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
    auth.currentUser.getIdToken(/* forceRefresh */ true)
  },

  getVerifyIdTokenResult: () => {
    auth.currentUser.getIdTokenResult()
  },

  deleteUser: () => {
    auth.currentUser.delete()
  },
}
