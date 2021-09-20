import React from 'react'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import * as signupHelpers from '@/app/helpers/signupHelpers'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { trackSignUp } from '@/app/helpers/trackingHelpers'
import { fireSentryBreadcrumb, fireSentryError } from '@/app/helpers/sentryHelpers'

import * as ROUTES from '@/app/constants/routes'

const useSignup = (initialPathname) => {
  // Import contexts
  const {
    setNoAuth,
    setMissingScopes,
    setAuthLoading,
    storeAuth,
  } = React.useContext(AuthContext)
  const { runCreateUser, setUserLoading } = React.useContext(UserContext)
  const { setNoArtist, setArtistLoading } = React.useContext(ArtistContext)


  // * HANDLE NEW USER
  // -----------------

  // REJECT NEW USER
  // - Delete from firebase
  // - Send back to login
  // - Show error
  const rejectNewUser = React.useCallback(async ({ errorMessage, errorLabel, redirectTo }) => {
    const userRedirected = signupHelpers.redirectPage(redirectTo || ROUTES.LOGIN, initialPathname)
    setArtistLoading(false)
    await firebaseHelpers.deleteUser()
    await firebaseHelpers.doSignOut()
    const error = {
      message: errorMessage,
    }
    setNoAuth(error)
    setUserLoading(false)
    // Sentry error
    fireSentryError({
      category: 'sign up',
      action: 'handleNewUser',
      label: errorLabel,
      description: error.message,
    })
    return userRedirected
  }, [setArtistLoading, setNoAuth, setUserLoading, initialPathname])

  const handleNewUser = React.useCallback(async (additionalUserInfo) => {
    const { profile: authProfile } = additionalUserInfo
    const { first_name, last_name, email, granted_scopes } = authProfile
    // If no email, ask for it
    if (!email) {
      setNoArtist()
      setUserLoading(false)
      const redirectTo = ROUTES.SIGN_UP_MISSING_EMAIL
      const userRedirected = signupHelpers.redirectPage(redirectTo, initialPathname)
      return userRedirected
    }
    // If it's a new user, create their profile on the server
    const { res: user, error } = await runCreateUser({
      firstName: first_name,
      lastName: last_name,
    })
    // Handle Error
    if (error) {
      // Sentry error
      fireSentryError({
        category: 'sign up',
        action: 'handleNewUser',
        label: 'Error in createUser()',
        description: error.message,
      })
      const userRedirected = rejectNewUser({ errorMessage: error.message })
      return userRedirected
    }
    // Check whether the new user has missing scopes
    const missingScopes = signupHelpers.getMissingScopes(granted_scopes)
    // Set missing scopes
    if (missingScopes.length) {
      setMissingScopes(missingScopes) // from Auth context
      // BREADCRUMB
      fireSentryBreadcrumb({
        category: 'sign up',
        action: 'Handle new FB user',
        label: 'missing scopes',
      })
    }
    // Clear artists (beacuse new user)
    setNoArtist()
    // TRACK
    trackSignUp({ authProvider: 'facebook', userId: user.id })
    // REDIRECT
    const redirectTo = ROUTES.CONFIRM_EMAIL
    const userRedirected = signupHelpers.redirectPage(redirectTo, initialPathname)
    return userRedirected
  }, [initialPathname, rejectNewUser, runCreateUser, setMissingScopes, setNoArtist, setUserLoading])


  // * SIGNUP WITH EMAIL
  const signupWithEmail = React.useCallback(async (email, password) => {
    setAuthLoading(true)
    const authUser = await firebaseHelpers.doCreateUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setAuthLoading(false)
        throw new Error(error.message)
      })
    if (!authUser) return
    const token = await authUser.user.getIdToken()
      .catch((error) => {
        setAuthLoading(false)
        throw new Error(error.message)
      })
    const { user } = authUser
    storeAuth({ authUser: user, authToken: token })
    return token
  }, [setAuthLoading, storeAuth])

  return { handleNewUser, signupWithEmail }
}

export default useSignup
