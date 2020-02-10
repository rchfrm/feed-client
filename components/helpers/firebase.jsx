import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const {
  firebase_api_key: apiKey,
  firebase_auth_domain: authDomain,
  firebase_database_url: databaseURL,
  firebase_project_id: projectId,
  firebase_storage_bucket: storageBucket,
  firebase_messaging_sender_id: messagingSenderId,
  firebase_app_id: appId,
} = process.env

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
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
