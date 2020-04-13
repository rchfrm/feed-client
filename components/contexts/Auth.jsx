import React from 'react'
import { useImmerReducer } from 'use-immer'
// IMPORT HELPERS
import firebase from '../helpers/firebase'

const initialAuthState = {
  token: '',
  email: '',
  missingScopes: [],
}

const authReducer = (draftState, action) => {
  const {
    type: actionType,
    payload: { email, token, providerId, scopes } = {},
  } = action

  switch (actionType) {
    case 'no-auth-user':
      return initialAuthState
    case 'set-auth-user':
      draftState.email = email
      draftState.token = token
      draftState.providerId = providerId
      break
    case 'set-token':
      draftState.token = token
      break
    case 'set-missing-scopes':
      draftState.missingScopes = scopes
      break
    default:
      throw new Error(`Unable to find ${actionType} in authReducer`)
  }
}

const AuthContext = React.createContext(initialAuthState)
AuthContext.displayName = 'AuthContext'

function AuthProvider({ children }) {
  const [auth, setAuth] = useImmerReducer(authReducer, initialAuthState)
  const [authError, setAuthError] = React.useState(null)
  const [accessToken, setAccessToken] = React.useState(null)
  const [authLoading, setAuthLoading] = React.useState(false)

  const setNoAuth = () => {
    setAuthLoading(false)
  }

  const setMissingScopes = (scopes) => {
    setAuth({
      type: 'set-missing-scopes',
      payload: { scopes },
    })
  }

  const storeAuth = async (authUser) => {
    setAuthLoading(true)
    // Get auth type
    const [provider] = authUser.providerData
    const { providerId } = provider
    try {
      const token = await firebase.getVerifyIdToken()
      setAuth({
        type: 'set-auth-user',
        payload: {
          email: authUser.email,
          providerId,
          token,
        },
      })
      setAuthLoading(false)
      setAuthError(null)
    } catch (err) {
      setAuthLoading(false)
      throw (err)
    }
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
      setAuthError(null)
      setAuthLoading(false)
      return token
    } catch (err) {
      setAuthLoading(false)
      throw (err)
    }
  }

  const signUp = async (email, password) => {
    setAuthLoading(true)
    const authUser = await firebase.doCreateUserWithEmailAndPassword(email, password)
    if (!authUser) return
    const token = await authUser.user.getIdToken()
      .catch((error) => {
        setAuthLoading(false)
        throw new Error(error.message)
      })
    setAuth({
      type: 'set-auth-user',
      payload: {
        email: authUser.user.email,
        token,
      },
    })
    setAuthLoading(false)
    return token
  }

  const value = {
    accessToken,
    auth,
    authError,
    authLoading,
    linkFacebook,
    login,
    setNoAuth,
    relinkFacebook,
    setAccessToken,
    setAuthError,
    signUp,
    storeAuth,
    setMissingScopes,
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
