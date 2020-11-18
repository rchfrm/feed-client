import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const requiredScopes = [
  'email',
  'read_insights',
  'pages_manage_ads',
  'pages_manage_metadata',
  'pages_read_engagement',
  'pages_read_user_content',
  'pages_show_list',
  'ads_management',
  'instagram_basic',
  'instagram_manage_insights',
]

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
    const res = await auth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        return { error }
      })
    if (res.error) return { error: res.error }
    return { authUser: res }
  },

  doSignOut: () => {
    return auth.signOut()
  },

  doPasswordReset: email => {
    return auth.sendPasswordResetEmail(email)
  },

  doPasswordUpdate: async (password) => {
    const res = await auth.currentUser.updatePassword(password)
      .catch((error) => {
        return { error }
      })
    if (res) return res
  },

  doEmailUpdate: async (email) => {
    const res = await auth.currentUser.updateEmail(email)
      .catch((error) => {
        return { error }
      })
    if (res) return res
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

  /**
  * @param {array} requestedPermissions optional array of scope requests
  * @returns {Promise<void>}
  */
  linkFacebookAccount: (requestedPermissions) => {
    const scopeRequests = requestedPermissions || requiredScopes
    scopeRequests.forEach(scope => {
      fbProvider.addScope(scope)
    })
    return auth.currentUser.linkWithRedirect(fbProvider)
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

  redirectResult: async () => {
    const redirectTo = await auth.getRedirectResult()
      .catch((err) => {
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
}
