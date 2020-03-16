import React from 'react'
import Router, { useRouter } from 'next/router'
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
import * as ROUTES from '../constants/routes'

import InitUser from './InitUser'


// * KICK TO PAGES
const kickToHome = () => Router.push(ROUTES.HOME)

// * THE BASIC TESTS
// ------------------
const testForToken = (token) => {
  return !!token
}

const testForUserReady = (user) => {
  if (!user) return false
  const { id } = user
  return !!id
}

const testForUserArtists = ({ artists = [] }) => {
  return artists.length
}

const testForArtistReady = (artist) => {
  if (!artist) return false
  const { id } = artist
  return !!id
}

// * ASYNC TESTS


// * THE ROUTE GUARD
const RouteGuarding = ({ children }) => {
  const { pathname: currentPath } = useRouter()
  const { auth: { token } } = React.useContext(AuthContext)
  const { user } = React.useContext(UserContext)
  const { artist } = React.useContext(ArtistContext)
  const hasToken = testForToken(token)
  const userReady = testForUserReady(user)
  const userHasArtists = testForUserArtists(user)
  const artistReady = testForArtistReady(artist)
  const [authRequired, setAuthRequired] = React.useState(false)
  // const [basicTestSuccess, setBasicTestSuccess] = React.useState(false)
  const [authSuccess, setAuthSuccess] = React.useState(false)

  React.useEffect(() => {
    // Based on basic tests, is auth needed
    const basicTestsSuccess = hasToken && userReady && userHasArtists && artistReady
    setAuthSuccess(basicTestsSuccess)
    // If auth success and you're hitting the login page,
    // kick to the home page
    if (authSuccess && currentPath === ROUTES.LOGIN) {
      kickToHome()
      return
    }
    // Auth is required if basic tests failed (sets InitUser off)
    setAuthRequired(!basicTestsSuccess)
  }, [])

  // If login page and we've run the test, show the page
  // When all basic tests have passed, show the page
  if (authSuccess) return children
  if (authRequired && !authSuccess) {
    return <InitUser setAuthSuccess={setAuthSuccess} />
  }
  // Show nothing while waiting for the tests
  return <></>
}


// * EXPORT higher order component
const withRouteGuarding = Component => {
  return (props) => {
    return (
      <RouteGuarding>
        <Component {...props} />
      </RouteGuarding>
    )
  }
}

export default withRouteGuarding
