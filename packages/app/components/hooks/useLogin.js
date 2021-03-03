import React from 'react'

import * as queryString from 'query-string'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'

import * as utils from '@/helpers/utils'
import * as signupHelpers from '@/app/helpers/signupHelpers'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { trackLogin } from '@/app/helpers/trackingHelpers'
import { fireSentryBreadcrumb, fireSentryError } from '@/app/helpers/sentryHelpers'

import * as ROUTES from '@/app/constants/routes'

const useLogin = (initialPathname, initialFullPath, showContent) => {
  // Import contexts
  const {
    setNoAuth,
    setAuthError,
    storeAuth,
    setMissingScopes,
    setRejectedPagePath,
  } = React.useContext(AuthContext)
  const { setNoUser, storeUser } = React.useContext(UserContext)
  const { setNoArtist, storeArtist } = React.useContext(ArtistContext)

  // * HANDLE NO AUTH USER
  // ---------------------
  const handleNoAuthUser = React.useCallback((authError) => {
    // Reset all contexts
    setNoAuth(authError)
    setNoUser()
    setNoArtist()
    // Check if the user is on an auth only page,
    // if they are push to log in page
    const userRedirected = signupHelpers.kickToLogin({ initialPathname, initialFullPath, setRejectedPagePath })
    return userRedirected
  }, [setNoAuth, setNoUser, setNoArtist, setRejectedPagePath, initialPathname, initialFullPath])


  // *  HANDLE EXISTING USER
  // -----------------------
  const handleExistingUser = React.useCallback(async (additionalUserInfo) => {
    fireSentryBreadcrumb({
      category: 'login',
      action: 'handleExistingUser',
    })
    // If it is a pre-existing user, store their profile in the user context
    const user = await storeUser()
      .catch((error) => {
        setAuthError({ message: 'No user was found in the database' })
        // Sentry error
        fireSentryError({
          category: 'sign up',
          action: 'handleExistingUser (InitUser)',
          label: 'No user returned from storeUser()',
          description: error.message,
        })
      })
    if (!user) return
    const { artists } = user
    // If there is additional info from a FB redirect...
    if (additionalUserInfo) {
      // Check whether the new user has missing scopes
      const { profile: { granted_scopes } } = additionalUserInfo
      const missingScopes = signupHelpers.getMissingScopes(granted_scopes)
      // Set missing scopes
      if (missingScopes.length) {
        setMissingScopes(missingScopes) // from Auth context
        fireSentryBreadcrumb({
          category: 'login',
          action: 'handleExistingUser',
          label: 'missing scopes',
        })
      }
    }
    // Check if they have artists connected to their account or not,
    // if they don't, set setNoArtist, and push them to the Connect Artist page
    if (artists.length === 0) {
      fireSentryBreadcrumb({
        category: 'login',
        action: 'handleExistingUser',
        label: 'no artists',
      })
      // TRACK LOGIN
      trackLogin({ authProvider: 'facebook', userId: user.id })
      setNoArtist()
      const userRedirected = signupHelpers.redirectPage(ROUTES.SIGN_UP_CONTINUE, initialPathname)
      return userRedirected
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
    // if they don't have access, clear artistId in local storage
    if (!hasAccess) {
      utils.setLocalStorage('artistId', '')
      fireSentryBreadcrumb({
        category: 'login',
        action: 'handleExistingUser',
        label: `no access to artist (id:${storedArtistId})`,
      })
    }
    // If they do have access set it as the selectedArtistId,
    // otherwise use the first related artist (sorted alphabetically)
    const selectedArtistId = hasAccess ? storedArtistId : artists[0].id
    await storeArtist(selectedArtistId)
    // Check if they are on either the log-in or sign-up page,
    // if they are push to the home page
    if (ROUTES.signedOutPages.includes(initialPathname)) {
      fireSentryBreadcrumb({
        category: 'login',
        action: 'handleExistingUser',
        label: 'go to home page',
      })
      // TRACK LOGIN
      trackLogin({ method: 'already logged in', userId: user.id })
      // Redirect to page they tried to access (or home page)
      const defaultLandingPage = ROUTES.HOME
      const useRejectedPagePath = true
      const userRedirected = signupHelpers.redirectPage(defaultLandingPage, initialPathname, useRejectedPagePath)
      return userRedirected
    }
  }, [setAuthError, setMissingScopes, setNoArtist, storeArtist, storeUser, initialPathname])

  // * DETECT SIGNED IN USER
  // -----------------------
  const handleInitialAuthCheck = React.useCallback(async (authUser, authError) => {
    fireSentryBreadcrumb({
      category: 'login',
      action: 'handleInitialAuthCheck',
    })
    // If no auth user, handle that
    if (!authUser) return handleNoAuthUser(authError)
    // If there is, store the user in auth context
    const authToken = await firebaseHelpers.getVerifyIdToken()
      .catch((error) => {
        storeAuth({ authError: error })
        // Sentry error
        fireSentryError({
          category: 'login',
          action: 'InitUser: HANDLE INITIAL LOGGED IN TEST',
          description: `Error with firebaseHelpers.getVerifyIdToken(): ${error.message}`,
        })
      })
    await storeAuth({ authUser, authToken, authError })
    const userRedirected = await handleExistingUser()
    return userRedirected
  }, [handleExistingUser, storeAuth, handleNoAuthUser])

  const detectSignedInUser = React.useCallback((isMounted, fbRedirectError) => {
    fireSentryBreadcrumb({
      category: 'login',
      action: 'handle no FB redirect',
    })
    const unsubscribe = firebaseHelpers.auth.onAuthStateChanged(async (authUser) => {
      fireSentryBreadcrumb({
        category: 'login',
        action: 'firebaseHelpers.auth.onAuthStateChanged',
      })
      const userRedirected = await handleInitialAuthCheck(authUser, fbRedirectError)
      if (!isMounted()) return userRedirected
      showContent(isMounted)
      unsubscribe()
      return userRedirected
    })
  }, [handleInitialAuthCheck, showContent])

  return { handleExistingUser, handleNoAuthUser, detectSignedInUser }
}

export default useLogin
