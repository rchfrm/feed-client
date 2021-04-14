import React from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/contexts/UserContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import * as ROUTES from '@/admin/constants/routes'

import * as utils from '@/helpers/utils'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'

// CALL REDIRECT
let userRedirected = false
const redirectPage = (newPathname, currentPathname) => {
  if (newPathname === currentPathname) return
  userRedirected = true
  Router.push(newPathname)
}

// KICK TO LOGIN (if necessary)
const kickToLogin = (currentPathname) => {
  // Only kick to login if user is on restricted page
  if (ROUTES.restrictedPages.includes(currentPathname)) {
    redirectPage(ROUTES.LOGIN, currentPathname)
  }
}

const InitUser = ({ children }) => {
  // Get router info
  const router = useRouter()
  const { pathname } = router
  // Component state
  const [ready, setReady] = React.useState(false)
  const [initialUserLoading, setInitialUserLoading] = React.useState(true)
  // Import contexts
  const { setNoAuth, setAuthError, storeAuth } = React.useContext(AuthContext)
  const { setNoUser, storeUser, userLoading } = React.useContext(UserContext)
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
  const handleNoAuthUser = (authError) => {
    // Reset all contexts
    setNoAuth(authError)
    setNoUser()
    setNoArtist()
    // Check if the user is on an auth only page,
    // if they are push to log in page
    kickToLogin(pathname)
  }



  // HANDLE EXISTING USERS
  const handleExistingUser = async () => {
    // If it is a pre-existing user, store their profile in the user context
    const { user, error } = await storeUser()
    if (error) {
      setAuthError({ message: 'No user was found in the database' })
      return
    }
    const { artists } = user
    // If they do have artists, check for a previously selected artist ID in local storage...
    const storedArtistId = utils.getLocalStorage('artistId')
    // Check that the storedArtistId is one the user has access to...
    const hasAccess = artists.find(({ id }) => id === storedArtistId)
    // if they don't have access, clear localStorage
    if (!hasAccess) {
      utils.setLocalStorage('artistId', '')
    }
    // If they do have access set it as the selectedArtistId,
    // otherwise use the first related artist (sorted alphabetically)
    const selectedArtistId = hasAccess ? storedArtistId : artists[0].id
    await storeArtist(selectedArtistId)
    // Check if they are on either the log-in or sign-up page,
    // if they are push to the home page
    if (pathname === ROUTES.LOGIN) {
      redirectPage(ROUTES.HOME, pathname)
    }
  }

  // HANDLE INITIAL LOGGED IN TEST
  const handleInitialAuthCheck = async (authUser, authError) => {
    // If no auth user, handle that
    if (!authUser) return handleNoAuthUser(authError)
    // If there is, store the user in auth context
    const authToken = await firebaseHelpers.getVerifyIdToken()
      .catch((error) => {
        storeAuth({ authError: error })
      })
    await storeAuth({ authUser, authToken, authError })
    await handleExistingUser()
  }


  const detectSignedInUser = (isMounted, fbRedirectError) => {
    const unsubscribe = firebaseHelpers.auth.onAuthStateChanged(async (authUser) => {
      await handleInitialAuthCheck(authUser, fbRedirectError)
      if (!isMounted()) return
      showContent(isMounted)
      unsubscribe()
    })
  }


  // RUN ON INTIAL MOUNT
  useAsyncEffect(async (isMounted) => {
    detectSignedInUser(isMounted)
    // * Show content
    showContent(isMounted)
  }, [])
  // Show spinner while waiting
  if (!ready || initialUserLoading) return null
  // Show the page
  return children
}

export default InitUser
