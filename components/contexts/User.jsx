// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
// IMPORT ELEMENTS
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import server from '../helpers/server'
// IMPORT STYLES

const initialUserState = {}
const UserContext = React.createContext(initialUserState)
UserContext.displayName = 'UserContext'
const userReducer = (userState, userAction) => {
  switch (userAction.type) {
    case 'set-user':
      return userAction.payload.user
    case 'set-user-details':
      return userAction.payload.user
    case 'set-daily_budget': {
      const { first_name, last_name, email } = userAction.payload
      return {
        ...userState,
        first_name,
        last_name,
        email,
      }
    }
    case 'sign-out':
      return initialUserState
    default:
      throw new Error(`Unable to find ${userAction.type} in userReducer`)
  }
}

function UserProvider({ children }) {
  // DEFINE USER STATE
  const [user, setUser] = React.useReducer(userReducer, initialUserState)
  const [userLoading, setUserLoading] = React.useState(true)
  const [userError, setUserError] = React.useState(null)
  // END DEFINE USER STATE

  const noUser = React.useCallback(() => {
    setUserLoading(true)
    setUser({ type: 'sign-out' })
    setUserLoading(false)
  }, [])

  const createUser = React.useCallback(async (first_name, last_name) => {
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
  }, [])

  const storeUser = React.useCallback(async () => {
    setUserLoading(true)
    try {
      const newUser = await server.getUser()
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
  }, [])

  const value = {
    createUser,
    noUser,
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
