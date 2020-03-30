import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const scopeArray = ['read_insights', 'manage_pages', 'pages_show_list', 'ads_management', 'instagram_basic', 'instagram_manage_insights']

const config = {
  apiKey: process.env.firebase_api_key,
  authDomain: process.env.firebase_auth_domain,
  databaseURL: process.env.firebase_database_url,
  projectId: process.env.firebase_project_id,
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
    scopeArray.forEach(scope => {
      provider.addScope(scope)
    })
    return auth.signInWithRedirect(provider)
  },

  linkFacebookAccount: () => {
    scopeArray.forEach(scope => {
      provider.addScope(scope)
    })
    return auth.currentUser.linkWithRedirect(provider)
  },

  connectFacebookUserWithPopUp: () => {
    scopeArray.forEach(scope => {
      provider.addScope(scope)
    })
    return auth.currentUser.linkWithPopup(provider)
  },

  redirectResult: async () => {
    const redirectTo = await auth.getRedirectResult()
      .catch((err) => {
        console.log(err)
        const { message, code } = err
        return {
          error: {
            message,
            code,
          },
        }
      })
    return redirectTo
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
    if (!auth || !auth.currentUser) return false
    return auth.currentUser.getIdToken()
  },

  /**
   * @param boolean forceRefresh
   * @returns {Promise<string>}
   */
  getIdTokenOrFail: (forceRefresh = false) => {
    if (!auth || !auth.currentUser) throw new Error('no login session found')
    return auth.currentUser.getIdToken(forceRefresh)
  },

  getVerifyIdTokenResult: () => {
    if (!auth || !auth.currentUser) return false
    return auth.currentUser.getIdTokenResult()
  },

  deleteUser: () => {
    return auth.currentUser.delete()
  },

  reauthoriseFacebook: () => {
    scopeArray.forEach(scope => {
      provider.addScope(scope)
    })
    provider.setCustomParameters({ auth_type: 'rerequest' })
    return this.auth.currentUser.linkWithRedirect(provider)
  },
}
