
import React from 'react'
import Router from 'next/router'
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import * as ROUTES from '../constants/routes'

import firebase from './helpers/firebase'

const RouteGuarding = ({ children }) => {
  const { auth: { token } } = React.useContext(AuthContext)
  const [isLoggedIn, setLoggedIn] = React.useState(false)

  React.useEffect(() => {
    if (!token) {
      console.log('nononono')
      Router.push(ROUTES.LOG_IN)
      return
    }
    setLoggedIn(true)
  })

  if (isLoggedIn) return children
  return <></>
}

export default RouteGuarding
