// * ADMIN VERSION

import React from 'react'
import { useImmerReducer } from 'use-immer'

// IMPORT HELPERS
import * as sharedServer from '@/helpers/sharedServer'
import { fireSentryError } from '@/app/helpers/sentryHelpers'

const initialUserState = {
  id: '',
  created_at: '',
  updated_at: '',
  first_name: '',
  last_name: '',
  email: '',
  pending_email: '',
  contact_email: '',
  contact_email_verified: true,
  email_verified: true,
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

  const storeUser = React.useCallback(async () => {
    setUserLoading(true)
    const { res: user, error } = await sharedServer.getUser()
    if (error) {
      // Sentry error
      fireSentryError({
        category: 'login',
        action: 'store user',
        description: `${error.message}`,
      })
      setUserLoading(false)
      return { error }
    }
    // Update user state
    setUser({
      type: 'set-user',
      payload: {
        user,
      },
    })
    setUserLoading(false)
    return { user }
  }, [setUser])

  const updateUser = React.useCallback((user) => {
    setUser({
      type: 'set-user-details',
      payload: {
        user,
      },
    })
    return user
  }, [setUser])

  const value = {
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
