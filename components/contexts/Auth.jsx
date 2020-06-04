import React from 'react'
import { useImmerReducer } from 'use-immer'
// IMPORT HELPERS
import firebase from '@/helpers/firebase'

const initialAuthState = {
  token: '',
  email: '',
  missingScopes: [],
  providerIds: [],
}

const authReducer = (draftState, action) => {
  const {
    type: actionType,
    payload: { email, token, providerIds, scopes } = {},
  } = action

  switch (actionType) {
    case 'no-auth-user':
      return initialAuthState
    case 'set-auth-user':
      draftState.email = email
      draftState.token = token
      draftState.providerIds = providerIds
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


  const setMissingScopes = (scopes) => {
    setAuth({
      type: 'set-missing-scopes',
      payload: { scopes },
    })
  }

  const setNoAuth = (authError = null) => {
    setAuth({ type: 'no-auth-user' })
    setAuthError(authError)
    setAuthLoading(false)
  }

  const storeAuth = async ({ authUser, authToken, authError = null }) => {
    if (authError) {
      setAuthError(authError)
      return
    }
    if (!authToken) {
      console.error('Missing auth token')
      return
    }
    setAuthLoading(true)
    const { email, providerData } = authUser
    // Get provider IDs
    const providerIds = providerData.map(({ providerId }) => providerId)
    // Set auth
    setAuth({
      type: 'set-auth-user',
      payload: {
        email,
        providerIds,
        token: authToken,
      },
    })
    setAuthLoading(false)
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

  const emailLogin = async (email, password) => {
    setAuthLoading(true)
    const { authUser, error: loginError } = await firebase.doSignInWithEmailAndPassword(email, password)
    if (loginError) return { loginError }
    const { user } = authUser
    const token = await user.getIdToken()
      .catch((error) => {
        return { error }
      })
    storeAuth({ authUser: user, authToken: token })
    return { tokenError: token.error }
  }

  const signUp = async (email, password) => {
    setAuthLoading(true)
    const authUser = await firebase.doCreateUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setAuthLoading(false)
        throw new Error(error.message)
      })
    if (!authUser) return
    const token = await authUser.user.getIdToken()
      .catch((error) => {
        setAuthLoading(false)
        throw new Error(error.message)
      })
    const { user } = authUser
    storeAuth({ authUser: user, authToken: token })
    return token
  }

  const value = {
    accessToken,
    auth,
    authError,
    authLoading,
    emailLogin,
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
