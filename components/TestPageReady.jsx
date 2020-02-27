import { useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'

import * as ROUTES from '../constants/routes'
import { AuthContext } from './contexts/Auth'

const kickToLogin = () => Router.push(ROUTES.HOME)

const deregisterServiceWorker = () => {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    // eslint-disable-next-line
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

const TestPageReady = (Component) => {
  return (props) => {
    const { pathname: currentPath } = useRouter()
    const { auth: { token } } = useContext(AuthContext)
    // If token has gone, kick to login
    useEffect(() => {
      // Dergister service worker
      deregisterServiceWorker()
      // Kick to home if no token
      if (!token && !currentPath === ROUTES.LOGIN) {
        kickToLogin()
      }
    }, [token])
    // Stop flash of content if landing on page while not logged in
    if (!token) return <></>
    // Show the content of the page
    return <Component {...props} />
  }
}

export default TestPageReady
