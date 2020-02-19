
import React from 'react'
import Router, { useRouter } from 'next/router'
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import * as ROUTES from '../constants/routes'

const RouteGuarding = () => {
  const router = useRouter()
  const { noAuth } = React.useContext(AuthContext)
  const { noUser } = React.useContext(UserContext)
  const { noArtist } = React.useContext(ArtistContext)

  const handleNoAuthUser = React.useCallback(async () => {
    // Check if the user is on an auth only page,
    // if they are push to log in page
    const { pathname } = router
    if (pathname !== '/' || pathname !== '/sign-up') {
      Router.push(ROUTES.LOG_IN)
    }

    // Reset all contexts
    noAuth()
    noUser()
    noArtist()
  }, [noArtist, noAuth, noUser])
  
  
}

export default RouteGuarding
