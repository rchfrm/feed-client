// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import firebase from '../helpers/firebase'
// IMPORT STYLES

const initialAuthState = {}
const AuthContext = React.createContext(initialAuthState)
AuthContext.displayName = 'AuthContext'
const authReducer = (authState, authAction) => {
  switch (authAction.type) {
    case 'no-auth-user':
      return initialAuthState
    case 'set-auth-user':
      return {
        email: authAction.payload.email,
        token: authAction.payload.token,
      }
    case 'set-token':
      return {
        ...authState,
        token: authAction.payload.token,
      }
    default:
      throw new Error(`Unable to find ${authAction.type} in authReducer`)
  }
}

function AuthProvider({ children }) {
  const [auth, setAuth] = React.useReducer(authReducer, initialAuthState)
  const [authError, setAuthError] = React.useState(null)
  const [accessToken, setAccessToken] = React.useState(null)
  const [authLoading, setAuthLoading] = React.useState(true)

  const noAuth = React.useCallback(() => {
    setAuthLoading(true)
    setAuth({ type: 'no-auth-user' })
    setAuthLoading(false)
  }, [])

  const storeAuth = React.useCallback(async authUser => {
    setAuthLoading(true)
    try {
      const token = await firebase.getVerifyIdToken()
      setAuth({
        type: 'set-auth-user',
        payload: {
          email: authUser.email,
          token,
        },
      })
      setAuthLoading(false)
    } catch (err) {
      setAuthLoading(false)
      throw (err)
    }
  }, [])

  const continueWithFacebook = async () => {
    setAuthLoading(true)
    await firebase.doSignInWithFacebook()
  }

  const unlinkFacebook = async () => {
    setAuthLoading(true)
    await firebase.unlinkFacebook()
      .catch((err) => {
        throw (err)
      })
  }

  const linkFacebook = async () => {
    setAuthLoading(true)
    try {
      await firebase.linkFacebookAccount()
    } catch (err) {
      // If the users Facebook account is already linked, unlink and then try again
      if (err.code === 'auth/provider-already-linked') {
        await unlinkFacebook()
        await firebase.linkFacebookAccount()
        return
      }
      // If it's another error, stop loading
      setAuthLoading(false)
      throw (err)
    }
  }

  const relinkFacebook = async () => {
    setAuthLoading(true)
    try {
      await firebase.reauthFacebook()
    } catch (err) {
      setAuthLoading(false)
      throw (err)
    }
  }

  const login = async (email, password) => {
    setAuthLoading(true)
    try {
      const authUser = await firebase.doSignInWithEmailAndPassword(email, password)
      const token = await authUser.user.getIdToken()
      setAuth({
        type: 'set-auth-user',
        payload: {
          email: authUser.user.email,
          token,
        },
      })
      setAuthLoading(false)
      return token
    } catch (err) {
      setAuthLoading(false)
      throw (err)
    }
  }

  const signUp = async (email, password) => {
    setAuthLoading(true)
    try {
      const authUser = await firebase.doCreateUserWithEmailAndPassword(email, password)
      const token = await authUser.user.getIdToken()
      setAuth({
        type: 'set-auth-user',
        payload: {
          email: authUser.user.email,
          token,
        },
      })
      setAuthLoading(false)
      return token
    } catch (err) {
      setAuthLoading(false)
      throw (err)
    }
  }

  const value = {
    accessToken,
    auth,
    authError,
    authLoading,
    continueWithFacebook,
    linkFacebook,
    login,
    noAuth,
    relinkFacebook,
    setAccessToken,
    setAuthError,
    signUp,
    storeAuth,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }
