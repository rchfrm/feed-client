// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from '../contexts/Auth'
import { UserContext } from '../contexts/User'
import { ArtistContext } from '../contexts/Artist'
// IMPORT ELEMENTS
import Button from './Button'
// IMPORT PAGES
// IMPORT ASSETS
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
// IMPORT HELPERS
import firebase from '../helpers/firebase'
// IMPORT STYLES

function SignOutLink() {
  const { noAuth } = React.useContext(AuthContext)
  const { noUser } = React.useContext(UserContext)
  const { noArtist } = React.useContext(ArtistContext)

  const signOut = async e => {
    e.preventDefault()
    noAuth()
    noUser()
    noArtist()
    Router.push(ROUTES.LOGIN)
    try {
      await firebase.doSignOut()
    } catch (err) {
      // TODO : Properly handle errors from signOut
      console.log(err)
    }
  }

  return (
    <Button version="sign-out" onClick={signOut}>
      sign out
    </Button>
  )
}

export default SignOutLink
