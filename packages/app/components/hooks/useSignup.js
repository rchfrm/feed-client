import React from 'react'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import * as signupHelpers from '@/app/helpers/signupHelpers'
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'

import * as ROUTES from '@/app/constants/routes'

const useSignup = (initialPathname) => {
  // Import contexts
  const {
    setNoAuth,
    setAuthLoading,
    storeAuth,
  } = React.useContext(AuthContext)
  const { setUserLoading } = React.useContext(UserContext)
  const { setArtistLoading } = React.useContext(ArtistContext)

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
      action: 'rejectNewUser',
      label: errorLabel,
      description: error.message,
    })
    return userRedirected
  }, [setArtistLoading, setNoAuth, setUserLoading, initialPathname])

  // * SIGNUP WITH EMAIL
  const signupWithEmail = React.useCallback(async (email, password) => {
    setAuthLoading(true)
    const authUser = await firebaseHelpers.doCreateUserWithEmailAndPassword(email, password)
      .catch((error) => {
        setAuthLoading(false)
        throw new Error(error.message)
      })
    if (! authUser) return
    const token = await authUser.user.getIdToken()
      .catch((error) => {
        setAuthLoading(false)
        throw new Error(error.message)
      })
    const { user } = authUser
    storeAuth({ authUser: user, authToken: token })
    return token
  }, [setAuthLoading, storeAuth])

  return { signupWithEmail, rejectNewUser }
}

export default useSignup
