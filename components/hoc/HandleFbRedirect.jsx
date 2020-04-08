import React from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'

import { AuthContext } from '../contexts/Auth'
import { UserContext } from '../contexts/User'
import { ArtistContext } from '../contexts/Artist'
import * as ROUTES from '../../constants/routes'

import firebase from '../helpers/firebase'

// CALL REDIRECT
let userRedirected = false
const redirectPage = (pathname) => {
  userRedirected = true
  Router.push(pathname)
}

const kickToLogin = (pathname) => {
  // Only kick to login if use is on restricted page
  if (ROUTES.restrictedPages.includes(pathname)) {
    redirectPage(ROUTES.LOGIN)
  }
}

// HANDLE NO AUTH USER
const handleNoAuthUser = ({ pathname, noArtist, noAuth, noUser }) => {
  // Check if the user is on an auth only page,
  // if they are push to log in page
  kickToLogin(pathname)
  // Reset all contexts
  noAuth()
  noUser()
  noArtist()
}

// HANDLE Invalid FB credential
const handleFbInvalidCredential = ({ message, pathname, setAuthError, noArtist, noAuth, noUser }) => {
  const startOfReason = message.indexOf('error_description') + 18
  const endOfReason = message.indexOf('&', startOfReason)
  const decodedMessage = decodeURI(message.slice(startOfReason, endOfReason))
  // Show error
  setAuthError({ message: decodedMessage })
  // Handle no auth error
  handleNoAuthUser({ pathname, noArtist, noAuth, noUser })
}


// HANDLE NEW USER
const handleNewUser = async ({ additionalUserInfo, createUser, noArtist }) => {
  // If it's a new user, create their profile on the server
  const firstName = additionalUserInfo.profile.first_name
  const lastName = additionalUserInfo.profile.last_name
  await createUser(firstName, lastName)
  // As this is a new user, set noArtist, and push them to the Connect Artist page
  noArtist()
  redirectPage(ROUTES.CONNECT_ACCOUNTS)
}


// HANDLE EXISTING USERS
const handleExistingUser = async ({ storeUser, noArtist, storeArtist, pathname }) => {
  // If it is a pre-existing user, store their profile in the user context
  const { artists } = await storeUser()
  // Check if they have artists connected to their account or not,
  // if they don't, set noArtist, and push them to the Connect Artist page
  if (artists.length === 0) {
    noArtist()
    if (pathname !== ROUTES.CONNECT_ACCOUNTS) {
      redirectPage(ROUTES.CONNECT_ACCOUNTS)
    }
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
  // If they do have accessset it as the selectedArtistId,
  // otherwise use the first related artist (sorted alphabetically)
  const selectedArtistId = hasAccess ? storedArtistId : artists[0].id
  await storeArtist(selectedArtistId)
  // Check if they are on either the log-in or sign-up page,
  // if they are push to the home page
  if (pathname === ROUTES.LOGIN || pathname === ROUTES.SIGN_UP) {
    redirectPage(ROUTES.HOME)
  }
}

// HANDLE INITIAL LOGGED IN TEST
const handleInitialAuthCheck = async ({ authUser, storeAuth, handleExistingUser, handleNoAuthUser }) => {
  // If no auth user, handle that
  if (!authUser) return handleNoAuthUser()
  // If there is, store the user in auth context
  await storeAuth(authUser)
  await handleExistingUser()
}

const HandleFbRedirect = (Component) => {
  // Get router info
  const router = useRouter()
  const { pathname } = router
  // Import contexts
  const { noAuth, setAccessToken, setAuthError, storeAuth } = React.useContext(AuthContext)
  const { createUser, noUser, storeUser } = React.useContext(UserContext)
  const { noArtist, storeArtist } = React.useContext(ArtistContext)

  return (props) => {
    const [ready, setReady] = React.useState(false)
    // Call when ready to show content
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

    useAsyncEffect(async (isMounted) => {
      // Check for the result of a redirect from Facebook
      const redirectResult = await firebase.redirectResult()
      // Destructur redirect result
      const { user, error, credential, additionalUserInfo } = redirectResult
      // * Handle no redirect
      if (!user && !error) {
        firebase.auth.onAuthStateChanged(async (authUser) => {
          await handleInitialAuthCheck({ authUser, storeAuth, handleExistingUser, handleNoAuthUser })
          showContent(isMounted)
        })
        return
      }
      // * Handle errors
      if (error) {
        const { message, type, code } = error
        console.log('***** REDIRECT RESULT')
        console.log('message', message)
        console.log('type', type)
        console.log('code', code)
        // Handle auth error
        if (code === 'auth/invalid-credential') {
          handleFbInvalidCredential({ pathname, message, setAuthError, noArtist, noAuth, noUser })
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
          await handleNewUser({ additionalUserInfo, createUser, noArtist })
          return
        }
        // Handle existing user
        await handleExistingUser({ storeUser, noArtist, storeArtist, pathname })
      }
      // * Show content
      showContent(isMounted)
    }, [])
    // Stop flash of content if landing on page while not logged in
    if (!ready) return null
    // Show the content of the page
    return <Component {...props} />
  }
}

export default HandleFbRedirect
