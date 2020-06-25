import React from 'react'
import produce from 'immer'
import { useImmerReducer } from 'use-immer'
// IMPORT HELPERS
import server from '@/helpers/server'
import * as artistHelpers from '@/helpers/artistHelpers'
import { track, setUserType } from '@/helpers/trackingHelpers'

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

const sortUserArtists = (user) => {
  return produce(user, draft => {
    const { artists } = draft
    draft.artists = artistHelpers.sortArtistsAlphabetically(artists)
    return draft
  })
}

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

  const createUser = React.useCallback(async (first_name, last_name) => {
    setUserLoading(true)
    try {
      const newUser = await server.createUser(first_name, last_name)
      const sortedArtistUser = sortUserArtists(newUser)
      setUser({
        type: 'set-user',
        payload: {
          user: sortedArtistUser,
        },
      })
      setUserLoading(false)
      return newUser
    } catch (err) {
      setUserLoading(false)
      throw (err)
    }
  }, [setUser])

  const storeUser = React.useCallback(async () => {
    setUserLoading(true)
    const user = await server.getUser()
      .catch((error) => {
        track({
          category: 'login',
          action: 'store user',
          description: `${error.message}`,
          error: true,
        })
        setUserLoading(false)
        throw (error)
      })
    // TODO If 404, then call /accounts/register
    if (!user) return
    const sortedArtistUser = sortUserArtists(user)
    // Update user type in track helpers
    setUserType(user)
    // Update user state
    setUser({
      type: 'set-user',
      payload: {
        user: sortedArtistUser,
      },
    })
    setUserLoading(false)
    return sortedArtistUser
  }, [setUser])

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
    createUser,
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
