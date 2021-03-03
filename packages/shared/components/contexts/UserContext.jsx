import React from 'react'
import { useImmerReducer } from 'use-immer'

import useReferralStore from '@/app/store/referralStore'
import useNotificationStore from '@/app/store/notificationsStore'
// IMPORT HELPERS
import * as sharedServer from '@/helpers/sharedServer'
import * as appServer from '@/app/helpers/appServer'
import { sortUserArtists } from '@/app/helpers/userHelpers'
import { updateTracking } from '@/app/helpers/trackingHelpers'
import { fireSentryError } from '@/app/helpers/sentryHelpers'


// Read from referralStore
const getGetStoredReferrerCode = state => state.getStoredReferrerCode
const getSetArtistsWithNotifications = state => state.setArtistsWithNotifications

const initialUserState = {
  id: '',
  created_at: '',
  updated_at: '',
  first_name: '',
  last_name: '',
  email: '',
  last_login: '',
  artists: [],
  organizations: {},
  referral_code: '',
}

const userReducer = (draftState, action) => {
  const {
    type: actionType,
    payload,
  } = action
  switch (actionType) {
    case 'set-user':
      return payload.user
    case 'set-user-details':
      return payload.user
    case 'sign-out':
      return initialUserState
    default:
      throw new Error(`Unable to find ${actionType} in userReducer`)
  }
}

const UserContext = React.createContext(initialUserState)
UserContext.displayName = 'UserContext'

function UserProvider({ children }) {
  // DEFINE USER STATE
  const [user, setUser] = useImmerReducer(userReducer, initialUserState)
  const [userLoading, setUserLoading] = React.useState(true)
  const [userError, setUserError] = React.useState(null)
  // END DEFINE USER STATE

  const setNoUser = React.useCallback(() => {
    setUserLoading(true)
    setUser({ type: 'sign-out' })
    setUserLoading(false)
  }, [setUser])

  // Get Getter to read reffere code from store
  const getStoredReferrerCode = useReferralStore(getGetStoredReferrerCode)

  const runCreateUser = React.useCallback(async ({ firstName, lastName }) => {
    setUserLoading(true)
    // Get referrer code (from local storage)
    const referrerCode = getStoredReferrerCode()
    // Create user in DB
    const { res: newUser, error: errorCreatingUser } = await sharedServer.createUser({
      firstName,
      lastName,
      referrerCode,
    })
    if (errorCreatingUser) {
      console.log('errorCreatingUser', errorCreatingUser)
      setUserLoading(false)
      return { error: errorCreatingUser }
    }
    // Accept T&Cs
    await appServer.acceptTerms(newUser.id)
    // Sort artists
    const sortedArtistUser = sortUserArtists(newUser)
    setUser({
      type: 'set-user',
      payload: {
        user: sortedArtistUser,
      },
    })
    setUserLoading(false)
    return { res: newUser }
  }, [setUser, getStoredReferrerCode])

  const setArtistsWithNotifications = useNotificationStore(getSetArtistsWithNotifications)

  const storeUser = React.useCallback(async () => {
    setUserLoading(true)
    const user = await sharedServer.getUser()
      .catch((error) => {
        // Sentry error
        fireSentryError({
          category: 'login',
          action: 'store user',
          description: `${error.message}`,
        })
        setUserLoading(false)
        throw (error)
      })
    // TODO If 404, then call /accounts/register
    if (!user) return
    const sortedArtistUser = sortUserArtists(user)
    // Store artists with notifications in Not store
    setArtistsWithNotifications(Object.values(user.artists))
    // Update user type in track helpers
    updateTracking(user)
    // Update user state
    setUser({
      type: 'set-user',
      payload: {
        user: sortedArtistUser,
      },
    })
    setUserLoading(false)
    return sortedArtistUser
  }, [setUser, setArtistsWithNotifications])

  const updateUser = React.useCallback((user) => {
    const sortedArtistUser = sortUserArtists(user)
    setUser({
      type: 'set-user-details',
      payload: {
        user: sortedArtistUser,
      },
    })
    return sortedArtistUser
  }, [setUser])

  const value = {
    runCreateUser,
    setNoUser,
    setUser,
    setUserError,
    storeUser,
    updateUser,
    user,
    userError,
    userLoading,
    setUserLoading,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer

export { UserContext, UserProvider, UserConsumer }
