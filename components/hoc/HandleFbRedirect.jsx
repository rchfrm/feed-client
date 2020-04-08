import React from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'

import { AuthContext } from '../contexts/Auth'
import { UserContext } from '../contexts/User'
import { ArtistContext } from '../contexts/Artist'
import * as ROUTES from '../../constants/routes'

import firebase from '../helpers/firebase'

const kickToLogin = (pathname) => {
  // Only kick to login if use is on restricted page
  if (ROUTES.restrictedPages.includes(pathname)) {
    Router.push(ROUTES.LOGIN)
  }
}


// HANDLE NO AUTH USER
const handleNoAuthUser = ({ message, pathname, setAuthError, noArtist, noAuth, noUser }) => {
  const startOfReason = message.indexOf('error_description') + 18
  const endOfReason = message.indexOf('&', startOfReason)
  const decodedMessage = decodeURI(message.slice(startOfReason, endOfReason))
  setAuthError({ message: decodedMessage })
  // Check if the user is on an auth only page,
  // if they are push to log in page
  kickToLogin(pathname)
  // Reset all contexts
  noAuth()
  noUser()
  noArtist()
}


// HANDLE NEW USER
const handleNewUser = async ({ additionalUserInfo, createUser, noArtist }) => {
  // If it's a new user, create their profile on the server
  const firstName = additionalUserInfo.profile.first_name
  const lastName = additionalUserInfo.profile.last_name
  await createUser(firstName, lastName)
  // As this is a new user, set noArtist, and push them to the Connect Artist page
  noArtist()
  Router.push(ROUTES.CONNECT_ACCOUNTS)
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
      Router.push(ROUTES.CONNECT_ACCOUNTS)
    }
  }
  // If they do have artists, check for a previously selected artist ID in local storage...
  const storedArtistId = localStorage.getItem('artistId')
  // Check that the storedArtistId is one the user has access to...
  const hasAccess = artists.find(({ id }) => id === storedArtistId)
  // if they don't have access, clear localStorage
  if (!hasAccess) {
    localStorage.clear()
  }
  // If they do set it as the selectedArtistId, otherwise use the first artist
  // (sorted alphabetically) the user has access to
  const selectedArtistId = hasAccess ? storedArtistId : artists[0].id
  await storeArtist(selectedArtistId)
  // Check if they are on either the log-in or sign-up page,
  // if they are push to the home page
  if (pathname === ROUTES.LOGIN || pathname === ROUTES.SIGN_UP) {
    Router.push(ROUTES.HOME)
  }
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
    const showContent = (isMounted) => {
      if (!isMounted()) return
      setReady(true)
    }
    useAsyncEffect(async (isMounted) => {
      // Check for the result of a redirect from Facebook
      const redirectResult = await firebase.redirectResult()
      // Destructur redirect result
      const { user, error, credential, additionalUserInfo } = redirectResult
      // * Handle errors
      if (error) {
        const { message, type, code } = error
        console.log('***** REDIRECT RESULT')
        console.log('message', message)
        console.log('type', type)
        console.log('code', code)
        // Handle auth error
        if (code === 'auth/invalid-credential') {
          handleNoAuthUser({ pathname, message, setAuthError, noArtist, noAuth, noUser })
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
