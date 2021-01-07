import React from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import useReferralStore from '@/app/store/referralStore'

import * as ROUTES from '@/app/constants/routes'

import * as queryString from 'query-string'
import * as utils from '@/helpers/utils'
import firebase from '@/helpers/firebase'
import { track } from '@/app/helpers/trackingHelpers'

// CALL REDIRECT
let userRedirected = false
const redirectPage = (newPathname, currentPathname) => {
  if (newPathname === currentPathname) return
  userRedirected = true
  Router.push(newPathname)
}

// KICK TO LOGIN (if necessary)
const kickToLogin = (currentPathname) => {
  // If on signup email page, just go to plain signup
  if (currentPathname === ROUTES.SIGN_UP_EMAIL) {
    redirectPage(ROUTES.SIGN_UP, currentPathname)
    return
  }
  // Only kick to login if user is on restricted page
  if (ROUTES.restrictedPages.includes(currentPathname)) {
    redirectPage(ROUTES.LOGIN, currentPathname)
  }
}

// GET MISSING SCOPES
const getMissingScopes = (grantedScopes) => {
  const { requiredScopes } = firebase
  return requiredScopes.reduce((arr, scope) => {
    const scopeGranted = grantedScopes.includes(scope)
    if (scopeGranted) return arr
    return [...arr, scope]
  }, [])
}

// Read from referralStore
const getGetStoredReferrerCode = state => state.getStoredReferrerCode

const InitUser = ({ children }) => {
  // Get router info
  const router = useRouter()
  const { pathname } = router
  // Component state
  const [ready, setReady] = React.useState(false)
  const [initialUserLoading, setInitialUserLoading] = React.useState(true)
  // Import contexts
  const {
    setNoAuth,
    setAccessToken,
    setRedirectType,
    setAuthError,
    storeAuth,
    setMissingScopes,
  } = React.useContext(AuthContext)
  const { runCreateUser, setNoUser, storeUser, userLoading, setUserLoading } = React.useContext(UserContext)
  const { setNoArtist, storeArtist, setArtistLoading } = React.useContext(ArtistContext)

  // After user has loaded the first time...
  React.useEffect(() => {
    if (!userLoading) {
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

  // HANDLE NO AUTH USER
  const handleNoAuthUser = (authError) => {
    // Reset all contexts
    setNoAuth(authError)
    setNoUser()
    setNoArtist()
    // Check if the user is on an auth only page,
    // if they are push to log in page
    kickToLogin(pathname)
  }

  // HANDLE Invalid FB credential
  const handleFbInvalidCredential = (message) => {
    const startOfReason = message.indexOf('error_description') + 18
    const endOfReason = message.indexOf('&', startOfReason)
    const decodedMessage = decodeURI(message.slice(startOfReason, endOfReason))
    // Show error
    setAuthError({ message: decodedMessage })
    // Handle no auth error
    handleNoAuthUser()
    // Track
    track({
      category: 'login',
      action: 'Invalid FB credential (InitUser)',
      description: decodedMessage,
      error: true,
    })
  }

  // REJECT NEW USER
  // - Delete from firebase
  // - Send back to login
  // - Show error
  const rejectNewUser = async ({ errorMessage, errorLabel, redirectTo }) => {
    redirectPage(redirectTo || ROUTES.LOGIN)
    setArtistLoading(false)
    await firebase.deleteUser()
    const error = {
      message: errorMessage,
    }
    setNoAuth(error)
    setUserLoading(false)
    track({
      category: 'sign up',
      action: 'handleNewUser',
      label: errorLabel,
      description: error.message,
      error: true,
    })
  }

  const getStoredReferrerCode = useReferralStore(getGetStoredReferrerCode)

  // HANDLE NEW USER
  const handleNewUser = async (additionalUserInfo) => {
    const { profile: { first_name, last_name, email, granted_scopes } } = additionalUserInfo
    // * REJECT If no REFERRAL CODE
    const referrerCode = getStoredReferrerCode()
    if (!referrerCode) {
      const errorMessage = 'It looks like you don\'t have a referral code.'
      const errorLabel = 'No referral code provided'
      rejectNewUser({ errorMessage, errorLabel, redirectTo: ROUTES.SIGN_UP })
      return
    }
    // * REJECT If no EMAIL...
    if (!email) {
      const errorMessage = 'Sorry, we couldn\'t access your email address. Please try again and make sure you grant Feed permission to access your email.'
      const errorLabel = 'No email provided from FB'
      rejectNewUser({ errorMessage, errorLabel })
      return
    }
    // If it's a new user, create their profile on the server
    const user = await runCreateUser({
      firstName: first_name,
      lastName: last_name,
    })
      .catch((error) => {
        track({
          category: 'sign up',
          action: 'handleNewUser',
          label: 'Error in createUser()',
          description: error.message,
          error: true,
        })
      })
    if (!user) return
    // Check whether the new user has missing scopes
    const missingScopes = getMissingScopes(granted_scopes)
    // Set missing scopes
    if (missingScopes.length) {
      setMissingScopes(missingScopes) // from Auth context
      // BREADCRUMB
      track({
        category: 'sign up',
        action: 'Handle new FB user',
        label: 'missing scopes',
        breadcrumb: true,
      })
    }
    // As this is a new user, run setNoArtist, and push them to the Connect Artist page
    setNoArtist()
    redirectPage(ROUTES.SIGN_UP_CONTINUE, pathname)
    // TRACK
    track({
      action: 'create_user',
      category: 'sign_up',
      label: 'facebook',
      marketing: true,
    })
  }


  // HANDLE EXISTING USERS
  const handleExistingUser = async (additionalUserInfo) => {
    track({
      category: 'login',
      action: 'handleExistingUser',
      breadcrumb: true,
      ga: false,
    })
    // If it is a pre-existing user, store their profile in the user context
    const user = await storeUser()
      .catch((error) => {
        track({
          category: 'sign up',
          action: 'handleExistingUser (InitUser)',
          label: 'No user returned from storeUser()',
          description: error.message,
          error: true,
        })
        setAuthError({ message: 'No user was found in the database' })
      })
    if (!user) return
    const { artists } = user
    // If there is additional info from a FB redirect...
    if (additionalUserInfo) {
      // Check whether the new user has missing scopes
      const { profile: { granted_scopes } } = additionalUserInfo
      const missingScopes = getMissingScopes(granted_scopes)
      // Set missing scopes
      if (missingScopes.length) {
        setMissingScopes(missingScopes) // from Auth context
        track({
          category: 'login',
          action: 'handleExistingUser',
          label: 'missing scopes',
          breadcrumb: true,
          ga: false,
        })
      }
    }
    // Check if they have artists connected to their account or not,
    // if they don't, set setNoArtist, and push them to the Connect Artist page
    if (artists.length === 0) {
      track({
        category: 'login',
        action: 'handleExistingUser',
        label: 'no artists',
        breadcrumb: true,
        ga: false,
      })
      // TRACK LOGIN
      track({
        action: 'log_in',
        category: 'log_in',
        label: 'facebook',
      })
      setNoArtist()
      redirectPage(ROUTES.SIGN_UP_CONTINUE, pathname)
      return
    }
    // If they do have artists, check for artist ID from query string parameter
    // or a previously selected artist ID in local storage
    const queryStringArtistId = queryString.parse(window.location.search).artistId
    if (queryStringArtistId) {
      utils.setLocalStorage('artistId', queryStringArtistId)
    }
    const storedArtistId = utils.getLocalStorage('artistId')
    // Check that the storedArtistId is one the user has access to...
    const hasAccess = artists.find(({ id }) => id === storedArtistId)
    // if they don't have access, clear localStorage
    if (!hasAccess) {
      utils.clearLocalStorage()
      track({
        category: 'login',
        action: 'handleExistingUser',
        label: `no access to artist (id:${storedArtistId})`,
        breadcrumb: true,
        ga: false,
      })
    }
    // If they do have access set it as the selectedArtistId,
    // otherwise use the first related artist (sorted alphabetically)
    const selectedArtistId = hasAccess ? storedArtistId : artists[0].id
    await storeArtist(selectedArtistId)
    // Check if they are on either the log-in or sign-up page,
    // if they are push to the home page
    if (pathname === ROUTES.LOGIN || pathname === ROUTES.SIGN_UP) {
      track({
        category: 'login',
        action: 'handleExistingUser',
        label: 'go to home page',
        breadcrumb: true,
        ga: false,
      })
      // TRACK LOGIN
      track({
        action: 'log_in',
        category: 'log_in',
        label: 'facebook',
      })
      redirectPage(ROUTES.HOME, pathname)
    }
  }

  // HANDLE INITIAL LOGGED IN TEST
  const handleInitialAuthCheck = async (authUser, authError) => {
    track({
      category: 'login',
      action: 'handleInitialAuthCheck',
      breadcrumb: true,
      ga: false,
    })
    // If no auth user, handle that
    if (!authUser) return handleNoAuthUser(authError)
    // If there is, store the user in auth context
    const authToken = await firebase.getVerifyIdToken()
      .catch((error) => {
        storeAuth({ authError: error })
        track({
          category: 'login',
          action: 'InitUser: HANDLE INITIAL LOGGED IN TEST',
          description: `Error with firebase.getVerifyIdToken(): ${error.message}`,
          error: true,
        })
      })
    await storeAuth({ authUser, authToken, authError })
    await handleExistingUser()
  }


  const detectSignedInUser = (isMounted, fbRedirectError) => {
    track({
      category: 'login',
      action: 'handle no FB redirect',
      breadcrumb: true,
      ga: false,
    })
    const unsubscribe = firebase.auth.onAuthStateChanged(async (authUser) => {
      track({
        category: 'login',
        action: 'firebase.auth.onAuthStateChanged',
        breadcrumb: true,
        ga: false,
      })
      await handleInitialAuthCheck(authUser, fbRedirectError)
      if (!isMounted()) return
      showContent(isMounted)
      unsubscribe()
    })
  }


  // RUN ON INTIAL MOUNT
  useAsyncEffect(async (isMounted) => {
    // Check for the result of a redirect from Facebook
    const redirectResult = await firebase.redirectResult()
    // Destructure redirect result
    const { user, error, credential, additionalUserInfo, operationType } = redirectResult
    // * Handle no redirect
    if (!user && !error) {
      detectSignedInUser(isMounted)
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
      // Track
      track({
        category: 'login',
        action: 'Other FB redirect error (InitUser)',
        description: message,
        error: true,
      })
      const customError = code === 'auth/account-exists-with-different-credential' ? {
        message: 'An account already exists with the same email address but different sign-in credentials. Please sign in using your email address',
      } : error
      // Detect for already logged in user
      detectSignedInUser(isMounted, customError)
      return
    }
    // * Handle REDIRECT success
    if (user) {
      track({
        category: 'login',
        action: 'Handle successful FB redirect',
        breadcrumb: true,
        ga: false,
      })
      const authToken = await firebase.getVerifyIdToken()
        .catch((error) => {
          storeAuth({ authError: error })
          track({
            category: 'login',
            action: 'InitUser: Handle REDIRECT success',
            description: `Error with firebase.getVerifyIdToken(): ${error.message}`,
            error: true,
          })
        })
      if (!authToken) return
      // Store Firebase's auth user in context
      await storeAuth({ authUser: user, authToken })
        .catch((err) => {
          track({
            category: 'sign up',
            action: 'Error storing firebase auth with storeAuth() (InitUser)',
            error: true,
          })
          throw (err)
        })
      // Extract and set the Facebook ACCESS TOKEN
      const { accessToken } = credential
      setAccessToken(accessToken)
      // Store what caused the REDIRECT
      setRedirectType(operationType)
      // Handle new user
      const { isNewUser } = additionalUserInfo
      if (isNewUser) {
        track({
          category: 'sign up',
          action: 'Handle new FB user',
          breadcrumb: true,
          ga: false,
        })
        await handleNewUser(additionalUserInfo)
      } else {
        // Handle existing user
        track({
          category: 'login',
          action: 'Handle existing FB user',
          breadcrumb: true,
          ga: false,
        })
        await handleExistingUser(additionalUserInfo)
      }
    }
    // * Show content
    showContent(isMounted)
  }, [])
  // Show spinner while waiting
  if (!ready || initialUserLoading) return null
  // Show the page
  return children
}

export default InitUser
