import React from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'

import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import * as ROUTES from '../constants/routes'

import Spinner from './elements/Spinner'

import firebase from './helpers/firebase'

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

const InitUser = ({ children }) => {
  // Get router info
  const router = useRouter()
  const { pathname } = router
  // Component state
  const [ready, setReady] = React.useState(false)
  const [initialUserLoading, setInitialUserLoading] = React.useState(true)
  // Import contexts
  const { setNoAuth, setAccessToken, setAuthError, storeAuth, setMissingScopes } = React.useContext(AuthContext)
  const { createUser, setNoUser, storeUser, userLoading } = React.useContext(UserContext)
  const { setNoArtist, storeArtist } = React.useContext(ArtistContext)

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
  const handleNoAuthUser = () => {
    // Reset all contexts
    setNoAuth()
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
  }


  // HANDLE NEW USER
  const handleNewUser = async (additionalUserInfo) => {
    const { profile: { first_name, last_name, granted_scopes } } = additionalUserInfo
    // If it's a new user, create their profile on the server
    await createUser(first_name, last_name)
    // Check whether the new user has missing scopes
    const missingScopes = getMissingScopes(granted_scopes)
    // Set missing scopes
    if (missingScopes.length) {
      setMissingScopes(missingScopes) // from Auth context
    }
    // As this is a new user, run setNoArtist, and push them to the Connect Artist page
    setNoArtist()
    redirectPage(ROUTES.SIGN_UP_CONTINUE, pathname)
  }


  // HANDLE EXISTING USERS
  const handleExistingUser = async (additionalUserInfo) => {
    // If it is a pre-existing user, store their profile in the user context
    const { artists } = await storeUser()
    // If there is additional info from a FB redirect...
    if (additionalUserInfo) {
      // Check whether the new user has missing scopes
      const { profile: { granted_scopes } } = additionalUserInfo
      const missingScopes = getMissingScopes(granted_scopes)
      // Set missing scopes
      if (missingScopes.length) {
        setMissingScopes(missingScopes) // from Auth context
      }
    }
    // Check if they have artists connected to their account or not,
    // if they don't, set setNoArtist, and push them to the Connect Artist page
    if (artists.length === 0) {
      setNoArtist()
      redirectPage(ROUTES.SIGN_UP_CONTINUE, pathname)
      return
    }
    // If they do have artists, check for a previously selected artist ID in local storage...
    const storedArtistId = localStorage.getItem('artistId')
    // Check that the storedArtistId is one the user has access to...
    const hasAccess = artists.find(({ id }) => id === storedArtistId)
    // if they don't have access, clear localStorage
    if (!hasAccess) {
      localStorage.clear()
    }
    // If they do have access set it as the selectedArtistId,
    // otherwise use the first related artist (sorted alphabetically)
    const selectedArtistId = hasAccess ? storedArtistId : artists[0].id
    await storeArtist(selectedArtistId)
    // Check if they are on either the log-in or sign-up page,
    // if they are push to the home page
    if (pathname === ROUTES.LOGIN || pathname === ROUTES.SIGN_UP) {
      redirectPage(ROUTES.HOME, pathname)
    }
  }

  // HANDLE INITIAL LOGGED IN TEST
  const handleInitialAuthCheck = async (authUser) => {
    // If no auth user, handle that
    if (!authUser) return handleNoAuthUser()
    // If there is, store the user in auth context
    await storeAuth(authUser)
    await handleExistingUser()
  }


  // RUN ON INTIAL MOUNT
  useAsyncEffect(async (isMounted) => {
    // Check for the result of a redirect from Facebook
    const redirectResult = await firebase.redirectResult()
    // Destructure redirect result
    const { user, error, credential, additionalUserInfo } = redirectResult
    // * Handle no redirect
    if (!user && !error) {
      const unsubscribe = firebase.auth.onAuthStateChanged(async (authUser) => {
        await handleInitialAuthCheck(authUser)
        if (!isMounted()) return
        showContent(isMounted)
        unsubscribe()
      })
      return
    }
    // * Handle errors
    if (error) {
      const { message, code } = error
      // Handle auth error
      if (code === 'auth/invalid-credential') {
        handleFbInvalidCredential(message)
        return
      }
      // Handle generic error
      setAuthError({ message })
      // Show content
      showContent(isMounted)
      return
    }
    // * Handle succesful redirect
    if (user) {
      // Store Firebase's auth user in context
      await storeAuth(user)
        .catch((err) => {
          throw (err)
        })
        // Extract and set the Facebook access token
      const { accessToken } = credential
      setAccessToken(accessToken)
      // Handle new user
      const { isNewUser } = additionalUserInfo
      if (isNewUser) {
        await handleNewUser(additionalUserInfo)
      } else {
        // Handle existing user
        await handleExistingUser(additionalUserInfo)
      }
    }
    // * Show content
    showContent(isMounted)
  }, [])
  // Show spinner while waiting
  if (!ready || initialUserLoading) return <Spinner />
  // Show the page
  return children
}

export default InitUser
