import React from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import useLogin from '@/app/hooks/useLogin'
import useSignup from '@/app/hooks/useSignup'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { fireSentryBreadcrumb, fireSentryError } from '@/app/helpers/sentryHelpers'
import { parseUrl, setLocalStorage } from '@/helpers/utils'

let userRedirected = false

const InitUser = ({ children }) => {
  // Get and store router info
  const router = useRouter()
  const [initialPathname] = React.useState(router.pathname)
  const [initialFullPath] = React.useState(router.asPath)
  // Component state
  const [ready, setReady] = React.useState(false)
  const [initialUserLoading, setInitialUserLoading] = React.useState(true)
  // Import contexts
  const {
    setAccessToken,
    setRedirectType,
    setAuthError,
    storeAuth,
  } = React.useContext(AuthContext)
  const { userLoading } = React.useContext(UserContext)

  // After user has loaded the first time...
  React.useEffect(() => {
    if (! userLoading) {
      setInitialUserLoading(userLoading)
    }
  }, [userLoading])

  // CALL WHEN READY TO SHOW CONTENT
  const showContent = () => {
    // If user has been redirected, wait for redirect
    // before showing content
    if (userRedirected) {
      userRedirected = false
      Router.events.on('routeChangeComplete', showContent)
      return
    }
    // Unsubscribe from route change listener
    Router.events.off('routeChangeComplete', showContent)
    // Show the content
    setReady(true)
  }

  // HOOKS
  const { handleExistingUser, handleNoAuthUser, detectSignedInUser } = useLogin(initialPathname, initialFullPath, showContent)
  const { rejectNewUser } = useSignup(initialPathname, initialFullPath)

  // Store query params in local storage
  React.useEffect(() => {
    const { query } = parseUrl(initialFullPath)
    const profileInviteToken = decodeURIComponent(query?.profileInvite || '')
    if (profileInviteToken) {
      setLocalStorage('inviteToken', profileInviteToken)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // HANDLE Invalid FB credential
  const handleFbInvalidCredential = (message) => {
    const startOfReason = message.indexOf('error_description') + 18
    const endOfReason = message.indexOf('&', startOfReason)
    const decodedMessage = decodeURI(message.slice(startOfReason, endOfReason))
    // Show error
    setAuthError({ message: decodedMessage })
    // Handle no auth error
    handleNoAuthUser()
    // Sentry error
    fireSentryError({
      category: 'login',
      action: 'Invalid FB credential (InitUser)',
      description: decodedMessage,
    })
  }

  // RUN ON INTIAL MOUNT
  useAsyncEffect(async (isMounted) => {
    // Check for the result of a redirect from Facebook
    const redirectResult = await firebaseHelpers.redirectResult()
    // Destructure redirect result
    const { user: authUser, error, credential, additionalUserInfo, operationType } = redirectResult
    // * Handle no redirect
    if (! authUser && ! error) {
      userRedirected = detectSignedInUser(isMounted)
      return
    }
    // * Handle REDIRECT errors
    if (error) {
      const { message, code } = error
      // Handle auth error
      if (code === 'auth/invalid-credential') {
        handleFbInvalidCredential(message)
        return
      }
      // Sentry error
      fireSentryError({
        category: 'login',
        action: 'Other FB redirect error (InitUser)',
        description: message,
      })
      const customError = code === 'auth/account-exists-with-different-credential' ? {
        message: 'An account already exists with the same email address but different sign-in credentials. Please sign in using your email address',
      } : error
      // Detect for already logged in user
      userRedirected = detectSignedInUser(isMounted, customError)
      return
    }
    // * Handle REDIRECT success
    if (authUser) {
      fireSentryBreadcrumb({
        category: 'login',
        action: 'Handle successful FB redirect',
      })
      const authToken = await firebaseHelpers.getVerifyIdToken()
        .catch((error) => {
          storeAuth({ authError: error })
          // Sentry error
          fireSentryError({
            category: 'login',
            action: 'InitUser: Handle REDIRECT success',
            description: `Error with firebaseHelpers.getVerifyIdToken(): ${error.message}`,
          })
        })
      if (! authToken) return
      const { profile: authProfile } = additionalUserInfo
      // Store Firebase's auth user in context
      await storeAuth({ authUser, authToken, authProfile })
        .catch((err) => {
          // Sentry error
          fireSentryError({
            category: 'sign up',
            action: 'Error storing firebase auth with storeAuth() (InitUser)',
          })
          throw (err)
        })
      // Extract and set the Facebook ACCESS TOKEN
      const { accessToken } = credential
      setAccessToken(accessToken)
      // Store what caused the REDIRECT
      setRedirectType(operationType)
      // Reject new user
      const { isNewUser } = additionalUserInfo
      if (isNewUser) {
        fireSentryBreadcrumb({
          category: 'sign up',
          action: 'Reject new FB user',
        })
        userRedirected = await rejectNewUser({
          errorMessage: 'There is no user account connected to this Facebook account',
        })
      } else {
        // Handle existing user
        fireSentryBreadcrumb({
          category: 'login',
          action: 'Handle existing FB user',
        })
        userRedirected = await handleExistingUser({ authUser, additionalUserInfo })
      }
    }
    // * Show content
    showContent()
  }, [])
  // Show spinner while waiting
  if (! ready || initialUserLoading) return null
  // Show the page
  return children
}

export default InitUser
