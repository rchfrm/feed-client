// * ADMIN VERSION

import React from 'react'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/admin/contexts/UserContext'

const useLoggedInTest = () => {
  // Check if logged in or not
  const { auth } = React.useContext(AuthContext)
  const { user } = React.useContext(UserContext)
  const loggedIn = React.useMemo(() => {
    return !!(auth.token && user.id)
  }, [auth.token, user])

  return loggedIn
}

export default useLoggedInTest
