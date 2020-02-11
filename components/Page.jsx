// IMPORT PACKAGES
import React from 'react'
import Router, { useRouter } from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import { AuthContext } from './contexts/Auth'
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import firebase from './helpers/firebase'
// IMPORT STYLES

function Page(props) {
  const router = useRouter()
  const { noAuth, setAccessToken, setAuthError, storeAuth } = React.useContext(AuthContext)
  const { createUser, noUser, storeUser } = React.useContext(UserContext)
  const { noArtist, storeArtist } = React.useContext(ArtistContext)
  const [checkedForUser, setCheckedForUser] = React.useState(false)

  // HANDLE EXISTING USERS
  const handleExistingUser = React.useCallback(async () => {
    // If it is a pre-existing user, store their profile in the user context
    const newUser = await storeUser()

    // Check if they have artists connected to their account or not,
    // if they don't, set noArtist, and push them to the Connect Artist page
    if (newUser.artists.length === 0) {
      Router.push(ROUTES.CONNECT_ARTIST)
      noArtist()
      return
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
    const { pathname } = router
    if (pathname === '/' || pathname === '/sign-up') {
      Router.push(ROUTES.HOME)
    }
  }, [noArtist, storeArtist, storeUser])
  // END HANDLE EXISTING USERS

  // HANDLE LACK OF AUTH USER
  const handleNoAuthUser = React.useCallback(async () => {
    // Check if the user is on an auth only page,
    // if they are push to log in page
    const { pathname } = router
    if (pathname !== '/' || pathname !== '/sign-up') {
      Router.push(ROUTES.LOG_IN)
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
      Router.push(ROUTES.CONNECT_ARTIST)
    } else {
      await handleExistingUser()
    }
  }, [createUser, handleExistingUser, noArtist, setAccessToken, storeAuth])
  // END HANDLE ANY REDIRECTS WITH INFORMATION ABOUT AN AUTH USER

  // GET THE CURRENTLY AUTHENTICATED USER, IF ANY, FROM FIREBASE
  const handleAuthStateChange = React.useCallback(async authUser => {
    // Check if there is a Firebase auth user
    if (authUser) {
      // If there is, store the user in auth context
      await storeAuth(authUser)

      await handleExistingUser()
    } else {
      // If there is no auth user, reset all contexts
      handleNoAuthUser()
    }
  }, [handleExistingUser, handleNoAuthUser, storeAuth])
  // END GET THE CURRENTLY AUTHENTICATED USER, IF ANY, FROM FIREBASE

  // CHECK FOR AN AUTHENTICATED USER WHEN APP FIRST LOADS
  React.useEffect(() => {
    const checkForAuthUser = async () => {
      setCheckedForUser(true)

      // Check for the result of a redirect from Facebook
      const redirect = await firebase.redirectResult()
        .catch(err => {
        // If there is an error thrown by getting the result of a redirect,
          // assume there is no authenticated user
          if (err.code === 'auth/invalid-credential') {
            const { message } = err
            const startOfReason = message.indexOf('error_description') + 18
            const endOfReason = message.indexOf('&', startOfReason)
            err.message = decodeURI(message.slice(startOfReason, endOfReason))
          }
          setAuthError(err)
          handleNoAuthUser()
        })

      // If there has been a redirect, call handleRedirect
      if (redirect.user) {
        handleRedirect(redirect)
        return
      }

      // If there hasn't been a redirect, check with Firebase for an auth user
      const unsubscribe = firebase.auth.onAuthStateChanged(authUser => {
        handleAuthStateChange(authUser)
        // Once Firebase has been checked, unsubscribe from the observer
        unsubscribe()
      })
    }

    // Only start the process of checking for an auth user,
    // if it hasn't already been called
    if (!checkedForUser) {
      checkForAuthUser().catch(err => console.log(err))
      // TODO: Properly handle errors
    }
  }, [checkedForUser, handleRedirect, handleAuthStateChange, handleNoAuthUser, setAuthError])
  // END CHECK FOR AN AUTHENTICATED USER WHEN APP FIRST LOADS

  // RETURN THE CHILDREN OF THE PAGE COMPONENT
  return props.children
  // END RETURN THE CHILDREN OF THE PAGE COMPONENT
}

export default Page
