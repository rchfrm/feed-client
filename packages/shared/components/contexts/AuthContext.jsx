import React from 'react'
import { useImmerReducer } from 'use-immer'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'

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
  const [redirectType, setRedirectType] = React.useState('')
  const [authLoading, setAuthLoading] = React.useState(false)
  const [rejectedPagePath, setRejectedPagePath] = React.useState('')

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
    setAccessToken(null)
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
      await firebaseHelpers.reauthFacebook()
    } catch (err) {
      setAuthLoading(false)
      throw (err)
    }
  }

  const signUp = async (email, password) => {
    setAuthLoading(true)
    const authUser = await firebaseHelpers.doCreateUserWithEmailAndPassword(email, password)
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

  // * HANDLE REJECTED PAGES
  // (ie, a page you land on but get kicked off because you aint logged in)
  // GET INITIAL
  React.useEffect(() => {
    const savedRejectedPagePath = getLocalStorage('rejectedPagePath')
    if (savedRejectedPagePath) {
      setRejectedPagePath(savedRejectedPagePath)
    }
  }, [])
  // UPDATE
  React.useEffect(() => {
    // Save rejected page path in local storage when it changes
    if (!rejectedPagePath) return
    setLocalStorage('rejectedPagePath', rejectedPagePath)
  }, [rejectedPagePath])
  // CLEAR STORED REJECTED PAGE
  const clearRejectedPathPath = React.useCallback(() => {
    setRejectedPagePath('')
    setLocalStorage('rejectedPagePath', '')
  }, [])

  const value = {
    accessToken,
    auth,
    authError,
    authLoading,
    setNoAuth,
    relinkFacebook,
    redirectType,
    setRedirectType,
    setAccessToken,
    setAuthError,
    setAuthLoading,
    signUp,
    storeAuth,
    setMissingScopes,
    rejectedPagePath,
    setRejectedPagePath,
    clearRejectedPathPath,
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
