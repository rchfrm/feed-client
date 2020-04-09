import React from 'react'
import { useImmerReducer } from 'use-immer'
// IMPORT HELPERS
import server from '../helpers/server'

const initialUserState = {}

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

  const setNoUser = () => {
    setUserLoading(true)
    setUser({ type: 'sign-out' })
    setUserLoading(false)
  }

  const createUser = async (first_name, last_name) => {
    setUserLoading(true)
    try {
      const newUser = await server.createUser(first_name, last_name)
      setUser({
        type: 'set-user',
        payload: {
          user: newUser,
        },
      })
      setUserLoading(false)
      return newUser
    } catch (err) {
      setUserLoading(false)
      throw (err)
    }
  }

  const storeUser = async () => {
    setUserLoading(true)
    const newUser = await server.getUser()
      .catch((err) => {
        setUserLoading(false)
        throw (err)
      })
    if (!newUser) return
    setUser({
      type: 'set-user',
      payload: {
        user: newUser,
      },
    })
    setUserLoading(false)
    return newUser
  }

  const value = {
    createUser,
    setNoUser,
    setUser,
    setUserError,
    storeUser,
    user,
    userError,
    userLoading,
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

const UserConsumer = UserContext.Consumer

export { UserContext, UserProvider, UserConsumer }
