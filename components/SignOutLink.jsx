// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/Auth'
import { UserContext } from '@/contexts/User'
import { ArtistContext } from '@/contexts/Artist'

// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '@/constants/routes'
// IMPORT HELPERS
import firebase from '@/helpers/firebase'
// IMPORT STYLES

function SignOutLink({ className = '' }) {
  const { setNoAuth } = React.useContext(AuthContext)
  const { setNoUser } = React.useContext(UserContext)
  const { setNoArtist } = React.useContext(ArtistContext)

  const clearContexts = () => {
    Router.events.off('routeChangeComplete', clearContexts)
    setNoAuth()
    setNoUser()
    setNoArtist()
  }

  const signOut = async () => {
    Router.events.on('routeChangeComplete', clearContexts)
    Router.push(ROUTES.LOGIN)
    await firebase.doSignOut()
      .catch((err) => {
        throw (err)
      })
  }

  return (
    <a className={className} role="button" version="sign-out" onClick={signOut}>
      sign out
    </a>
  )
}

export default SignOutLink
