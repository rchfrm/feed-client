import React from 'react'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'

const useLoggedInTest = () => {
  // Check if logged in or not
  const { auth } = React.useContext(AuthContext)
  const loggedIn = React.useMemo(() => {
    return !!auth.token
  }, [auth.token])

  return loggedIn
}

export default useLoggedInTest
