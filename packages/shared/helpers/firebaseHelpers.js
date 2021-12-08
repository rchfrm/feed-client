import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import produce from 'immer'

const fbProvider = new app.auth.FacebookAuthProvider()

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

export const auth = app.auth()

// The scopes required during signup
export const requiredScopesSignup = [
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

// The scopes required after a user account has been created
const requiredScopesAccount = produce(requiredScopesSignup, draft => {
  const index = draft.findIndex((scope) => scope === 'email')
  if (index !== -1) draft.splice(index, 1)
})


export const dofetchSignInMethodsForEmail = (email) => {
  return auth.fetchSignInMethodsForEmail(email)
}

export const doCreateUserWithEmailAndPassword = (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password)
}

export const doSignInWithEmailAndPassword = async (email, password) => {
  const res = await auth.signInWithEmailAndPassword(email, password)
    .catch((error) => {
      return { error }
    })
  if (res.error) return { error: res.error }
  return { authUser: res }
}


export const doSignOut = () => {
  return auth.signOut()
}

export const doPasswordUpdate = async (password) => {
  const res = await auth.currentUser.updatePassword(password)
    .catch((error) => {
      return { error }
    })
  if (res) return res
}


export const doEmailUpdate = async (email) => {
  const res = await auth.currentUser.updateEmail(email)
    .catch((error) => {
      return { error }
    })
  if (res) return res
}


export const loginWithFacebook = () => {
  return auth.signInWithRedirect(fbProvider)
}


export const signUpWithFacebook = () => {
  requiredScopesSignup.forEach(scope => {
    fbProvider.addScope(scope)
  })
  return auth.signInWithRedirect(fbProvider)
}


/**
* @param {array} requestedPermissions optional array of scope requests
* @returns {Promise<void>}
*/
export const linkFacebookAccount = (requestedPermissions) => {
  const scopeRequests = requestedPermissions || requiredScopesAccount
  scopeRequests.forEach(scope => {
    fbProvider.addScope(scope)
  })
  return auth.currentUser.linkWithRedirect(fbProvider)
}


/**
 * @param {array} requestedPermissions optional array of scope requests
 * @returns {Promise<void>}
 */
export const reauthFacebook = (requestedPermissions) => {
  const scopeRequests = requestedPermissions || requiredScopesAccount
  scopeRequests.forEach(scope => {
    fbProvider.addScope(scope)
  })
  fbProvider.setCustomParameters({ auth_type: 'rerequest' })
  return auth.currentUser.reauthenticateWithRedirect(fbProvider)
}


export const redirectResult = async () => {
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
}


export const getVerifyIdToken = () => {
  if (!auth || !auth.currentUser) return false
  return auth.currentUser.getIdToken()
}


/**
   * @param boolean forceRefresh
   * @returns {Promise<string>}
   */
export const getIdTokenOrFail = (forceRefresh = false) => {
  if (!auth || !auth.currentUser) throw new Error('no login session found')
  return auth.currentUser.getIdToken(forceRefresh)
}


export const deleteUser = () => {
  return auth.currentUser.delete()
}

// * FORGETTING PASSWORD
// -------------------

// Send forgot password email
export const sendPasswordResetEmail = (email) => {
  return auth.sendPasswordResetEmail(email)
}

// Make sure reset password code is legit
export const verifyPasswordResetCode = (code) => {
  return auth.verifyPasswordResetCode(code)
    .then((email) => {
      return { res: email }
    })
    .catch((error = true) => {
      return { error }
    })
}

// Confirm password reset
export const confirmPasswordReset = (code, newPassword) => {
  return auth.confirmPasswordReset(code, newPassword)
    .then(() => {
      return { res: true }
    })
    .catch((error = true) => {
      return { error }
    })
}
