// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'

// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import firebase from './helpers/firebase'
// IMPORT STYLES

function SignOutLink() {
  const { setNoAuth } = React.useContext(AuthContext)
  const { setNoUser } = React.useContext(UserContext)
  const { setNoArtist } = React.useContext(ArtistContext)

  const signOut = async e => {
    e.preventDefault()
    Router.push(ROUTES.LOGIN)
    await firebase.doSignOut()
      .catch((err) => {
        throw (err)
      })
    // After redirect...
    Router.events.on('routeChangeComplete', () => {
      setNoAuth()
      setNoUser()
      setNoArtist()
    })
  }

  return (
    <a role="button" version="sign-out" onClick={signOut}>
      sign out
    </a>
  )
}

export default SignOutLink
