// * ADMIN VERSION

// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/admin/contexts/UserContext'
import { InterfaceContext } from '@/admin/contexts/InterfaceContext'

// IMPORT CONSTANTS
import * as ROUTES from '@/app/constants/routes'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { mixpanelSignOut } from '@/helpers/mixpanelHelpers'

const useSignOut = () => {
  const { setNoAuth, clearRejectedPathPath } = React.useContext(AuthContext)
  const { setNoUser } = React.useContext(UserContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const clearContexts = React.useRef(null)

  const signOut = async () => {
    toggleGlobalLoading(true)
    Router.events.on('routeChangeComplete', clearContexts.current)
    await firebaseHelpers.doSignOut()
      .catch((err) => {
        toggleGlobalLoading(false)
        throw (err)
      })
    Router.push(ROUTES.LOGIN)
  }

  const signoutCallback = () => {
    Router.events.off('routeChangeComplete', clearContexts.current)
    clearRejectedPathPath()
    mixpanelSignOut()
    setNoAuth()
    setNoUser()
    toggleGlobalLoading(false)
  }

  React.useEffect(() => {
    clearContexts.current = signoutCallback
  // eslint-disable-next-line
  }, [])

  return signOut
}

export default useSignOut
