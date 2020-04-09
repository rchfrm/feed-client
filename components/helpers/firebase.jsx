import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const requiredScopes = ['read_insights', 'manage_pages', 'pages_show_list', 'ads_management', 'instagram_basic', 'instagram_manage_insights']

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
const fbProvider = new app.auth.FacebookAuthProvider()

// Export firebase functions
export default {

  auth,

  requiredScopes,

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

  loginWithFacebook: () => {
    return auth.signInWithRedirect(fbProvider)
  },

  signUpWithFacebook: () => {
    requiredScopes.forEach(scope => {
      fbProvider.addScope(scope)
    })
    return auth.signInWithRedirect(fbProvider)
  },

  linkFacebookAccount: (requestedPermissions) => {
    const scopeRequests = requestedPermissions || requiredScopes
    scopeRequests.forEach(scope => {
      fbProvider.addScope(scope)
    })
    return auth.currentUser.linkWithRedirect(fbProvider)
  },

  connectFacebookUserWithPopUp: () => {
    requiredScopes.forEach(scope => {
      fbProvider.addScope(scope)
    })
    return auth.currentUser.linkWithPopup(fbProvider)
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

  /**
   * @param {array} requestedPermissions optional array of scope requests
   * @returns {Promise<void>}
   */
  reauthFacebook: (requestedPermissions) => {
    const scopeRequests = requestedPermissions || requiredScopes
    scopeRequests.forEach(scope => {
      fbProvider.addScope(scope)
    })
    fbProvider.setCustomParameters({ auth_type: 'rerequest' })
    return auth.currentUser.reauthenticateWithRedirect(fbProvider)
  },
}
