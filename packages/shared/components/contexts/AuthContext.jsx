import React from 'react'
import { useImmerReducer } from 'use-immer'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import useReferralStore from '@/app/stores/referralStore'

const initialAuthState = {
  token: '',
  email: '',
  authProfile: {},
  missingScopes: { signUp: [], account: [], ads: [] },
  providerIds: [],
}

const authReducer = (draftState, action) => {
  const {
    type: actionType,
    payload: { email, authProfile, token, providerIds, scopes } = {},
  } = action

  switch (actionType) {
    case 'no-auth-user':
      return initialAuthState
    case 'set-auth-user':
      draftState.email = email
      draftState.authProfile = authProfile
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

const getClearUsedReferralCode = (state) => state.clearUsedReferralCode

const AuthContext = React.createContext(initialAuthState)
AuthContext.displayName = 'AuthContext'

function AuthProvider({ children }) {
  const [auth, setAuth] = useImmerReducer(authReducer, initialAuthState)
  const [authError, setAuthError] = React.useState(null)
  const [accessToken, setAccessToken] = React.useState(null)
  const [redirectType, setRedirectType] = React.useState('')
  const [authLoading, setAuthLoading] = React.useState(false)
  const [rejectedPagePath, setRejectedPagePath] = React.useState('')
  const [isPlatformRedirect, setIsPlatformRedirect] = React.useState(false)

  const setMissingScopes = (scopes) => {
    setAuth({
      type: 'set-missing-scopes',
      payload: { scopes },
    })
  }

  // Get function to clear referral code
  const clearUsedReferralCode = useReferralStore(getClearUsedReferralCode)

  const setNoAuth = React.useCallback((authError = null) => {
    setAuth({ type: 'no-auth-user' })
    setAuthError(authError)
    setAuthLoading(false)
    setAccessToken(null)
    clearUsedReferralCode()
  }, [setAuth, clearUsedReferralCode])

  const storeAuth = async ({ authUser, authToken, authProfile = {}, authError = null }) => {
    if (authError) {
      setAuthError(authError)

      if (! authUser) {
        return
      }
    }
    if (! authToken) {
      throw new Error('Missing auth token')
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
        authProfile,
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
    if (! rejectedPagePath) return
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
    storeAuth,
    setMissingScopes,
    rejectedPagePath,
    setRejectedPagePath,
    clearRejectedPathPath,
    isPlatformRedirect,
    setIsPlatformRedirect,
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
