import React from 'react'
import Router, { useRouter } from 'next/router'
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import * as ROUTES from '../constants/routes'

import firebase from './helpers/firebase'

const InitUser = ({ children, setAuthSuccess = () => {} }) => {
  const router = useRouter()
  const { noAuth, setAccessToken, setAuthError, storeAuth } = React.useContext(AuthContext)
  const { createUser, noUser, storeUser } = React.useContext(UserContext)
  const { noArtist, storeArtist, getIntegrationErrors } = React.useContext(ArtistContext)
  const [checkedForUser, setCheckedForUser] = React.useState(false)
  const [userRedirected, setUserRedirected] = React.useState(false)
  const [finishedInit, setFinishedInit] = React.useState(false)
  // HANDLE EXISTING USERS
  const handleExistingUser = React.useCallback(async () => {
    // Get current pathanem
    const { pathname } = router
    // If it is a pre-existing user, store their profile in the user context
    const newUser = await storeUser()

    // Handle no new user
    if (!newUser && pathname === ROUTES.LOGIN) {
      localStorage.clear()
      return false
    }
    if (!newUser && pathname !== ROUTES.LOGIN) {
      localStorage.clear()
      Router.push(ROUTES.LOGIN)
      return true
    }

    // Check if they have artists connected to their account or not,
    // if they don't, set noArtist, and push them to the Connect Artist page
    if (newUser.artists.length === 0) {
      noArtist()
      if (pathname !== ROUTES.CONNECT_ACCOUNTS) {
        Router.push(ROUTES.CONNECT_ACCOUNTS)
        return true
      }
      return false
    }

    // If they do have artists, check for a previously selected artist ID in local storage...
    const storedArtistId = localStorage.getItem('artistId')
    let selectedArtistId = newUser.artists[0].id
    // Check that the storedArtistId is one the user has access to...
    const { artists } = newUser
    let hasAccess = false
    let i = 0
    while (!hasAccess && i < artists.length) {
      if (artists[i].id === storedArtistId) {
        hasAccess = true
      }
      i += 1
    }

    if (hasAccess) {
      // If they do set it as the selectedArtistId, otherwise use the first artist
      // (sorted alphabetically) the user has access to
      selectedArtistId = storedArtistId
    } else {
      // if they don't have access, clear localStorage
      localStorage.clear()
    }

    await storeArtist(selectedArtistId)

    // Check if they are on either the log-in or sign-up page,
    // if they are push to the home page
    if (pathname === ROUTES.LOGIN || pathname === ROUTES.SIGN_UP) {
      Router.push(ROUTES.HOME)
      return true
    }
    // Else just report that all went well
    setAuthSuccess(true)
    return false
  }, [noArtist, storeArtist, storeUser])
  // END HANDLE EXISTING USERS

  // HANDLE LACK OF AUTH USER
  const handleNoAuthUser = React.useCallback(() => {
    // Check if the user is on an auth only page,
    // if they are push to log in page
    const { pathname } = router
    if (pathname !== ROUTES.LOGIN && pathname !== ROUTES.SIGN_UP) {
      Router.push(ROUTES.LOGIN)
    }

    // Reset all contexts
    noAuth()
    noUser()
    noArtist()
  }, [noArtist, noAuth, noUser])
  // END HANDLE LACK OF AUTH USER

  // HANDLE ANY REDIRECTS WITH INFORMATION ABOUT AN AUTH USER
  const handleRedirect = React.useCallback(async redirect => {
    // Store Firebase's auth user in context, and extract the Facebook access token
    await storeAuth(redirect.user)
      .catch((err) => {
        throw (err)
      })
    const { accessToken } = redirect.credential
    setAccessToken(accessToken)

    // Determine if this is a new or pre-existing user
    const { isNewUser } = redirect.additionalUserInfo
    if (isNewUser) {
      // If it's a new user, create their profile on the server
      const firstName = redirect.additionalUserInfo.profile.first_name
      const lastName = redirect.additionalUserInfo.profile.last_name
      await createUser(firstName, lastName)
      // As this is a new user, set noArtist, and push them to the Connect Artist page
      noArtist()
      Router.push(ROUTES.CONNECT_ACCOUNTS)
      return true
    }

    const res = await handleExistingUser()
    return res
  }, [createUser, handleExistingUser, noArtist, setAccessToken, storeAuth])
  // END HANDLE ANY REDIRECTS WITH INFORMATION ABOUT AN AUTH USER

  // GET THE CURRENTLY AUTHENTICATED USER, IF ANY, FROM FIREBASE
  const handleAuthStateChange = async (authUser) => {
    // Check if there is a Firebase auth user
    if (authUser) {
      // If there is, store the user in auth context
      await storeAuth(authUser)
      await handleExistingUser()
      return false
    }
    // If there is no auth user, reset all contexts
    handleNoAuthUser()
    return true
  }

  // CALL THIS AFTER EVERYTHING IS DONE
  const onFinished = (redirected) => {
    // Toggle whether a redirect was called
    setUserRedirected(redirected)
    // If redirected, wait until route change is complete
    if (redirected) {
      Router.events.on('routeChangeComplete', () => {
        // Set finisshed
        setFinishedInit(true)
        setUserRedirected(false)
      })
    } else {
      // Set finished
      setFinishedInit(true)
    }
    // Trigger check for integration errors
    getIntegrationErrors()
  }

  // CHECK FOR AN AUTHENTICATED USER WHEN APP FIRST LOADS
  React.useEffect(() => {
    const checkForAuthUser = async () => {
      setCheckedForUser(true)

      // Check for the result of a redirect from Facebook
      const redirectResult = await firebase.redirectResult()
      const { error } = redirectResult

      // Handle error
      if (error) {
        const { message, code } = error
        if (code === 'auth/invalid-credential') {
          const startOfReason = message.indexOf('error_description') + 18
          const endOfReason = message.indexOf('&', startOfReason)
          error.message = decodeURI(message.slice(startOfReason, endOfReason))
        }
        setAuthError(error)
        handleNoAuthUser()
      }

      // If there has been a redirect, call handleRedirect
      let redirected = false
      if (redirectResult.user) {
        redirected = await handleRedirect(redirectResult)
      }

      // If there hasn't been a redirect, check with Firebase for an auth user
      if (!redirected) {
        const unsubscribe = firebase.auth.onAuthStateChanged(async (authUser) => {
          redirected = await handleAuthStateChange(authUser)
          // EVERYTHING DONE
          onFinished(redirected)
          // Once Firebase has been checked, unsubscribe from the observer
          unsubscribe()
        })
        return
      }
      // EVERYTHING DONE
      onFinished(redirected)
    }

    // Only start the process of checking for an auth user,
    // if it hasn't already been called
    if (!checkedForUser) {
      checkForAuthUser().catch(err => console.log(err))
      // TODO: Properly handle errors
    }
  }, [checkedForUser, handleRedirect, handleAuthStateChange, handleNoAuthUser, setAuthError])

  if (!finishedInit || !children || userRedirected) return <></>
  return children
}

export default InitUser
