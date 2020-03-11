// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Button from './elements/Button'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
// IMPORT HELPERS
import firebase from './helpers/firebase'
// IMPORT STYLES

function SignOutLink() {
  const { noAuth } = React.useContext(AuthContext)
  const { noUser } = React.useContext(UserContext)
  const { noArtist } = React.useContext(ArtistContext)

  const signOut = async e => {
    e.preventDefault()
    Router.push(ROUTES.LOGIN)
    await firebase.doSignOut()
      .catch((err) => {
        throw (err)
      })
    noAuth()
    noUser()
    noArtist()
  }

  return (
    <a role="button" version="sign-out" onClick={signOut}>
      sign out
    </a>
  )
}

export default SignOutLink
