// * APP VERSION

// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
import useControlsStore from '@/app/stores/controlsStore'

// IMPORT CONSTANTS
import * as ROUTES from '@/app/constants/routes'
// IMPORT HELPERS
import * as firebaseHelpers from '@/helpers/firebaseHelpers'
import { mixpanelSignOut } from '@/app/helpers/mixpanelHelpers'

const controlsStoreClearAll = state => state.clearAll

const useSignOut = () => {
  const { setNoAuth, clearRejectedPathPath } = React.useContext(AuthContext)
  const { setNoUser } = React.useContext(UserContext)
  const { setNoArtist } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

  const clearContexts = React.useRef(null)
  const clearControlsStore = useControlsStore(controlsStoreClearAll)

  const signOut = React.useCallback(async () => {
    toggleGlobalLoading(true)
    Router.events.on('routeChangeComplete', clearContexts.current)
    await firebaseHelpers.doSignOut()
      .catch((err) => {
        toggleGlobalLoading(false)
        throw (err)
      })
    Router.push(ROUTES.LOGIN)
  }, [toggleGlobalLoading])

  const signoutCallback = () => {
    Router.events.off('routeChangeComplete', clearContexts.current)
    clearRejectedPathPath()
    mixpanelSignOut()
    setNoAuth()
    setNoUser()
    setNoArtist()
    toggleGlobalLoading(false)
    clearControlsStore()
  }

  React.useEffect(() => {
    clearContexts.current = signoutCallback
  // eslint-disable-next-line
  }, [])

  return signOut
}

export default useSignOut
