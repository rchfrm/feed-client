import { useContext, useState } from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'

import * as ROUTES from '../constants/routes'
import { AuthContext } from './contexts/Auth'

const kickToLogin = () => Router.push(ROUTES.HOME)

const TestPageReady = (Component) => {
  return (props) => {
    const { pathname: currentPath } = useRouter()
    const { auth: { token: initialToken }, getToken } = useContext(AuthContext)
    const [token, setToken] = useState(initialToken)
    useAsyncEffect(async (isMounted) => {
      if (!token && !currentPath === ROUTES.LOGIN) {
        // Check for new token
        const newToken = await getToken()
        // Stop here if not mounted
        if (!isMounted()) return
        // If new token can't be generated...
        if (!newToken) return kickToLogin()
        // Set new token
        setToken(newToken)
      }
    }, [token])
    // Stop flash of content if landing on page while not logged in
    if (!token) return <></>
    // Show the content of the page
    return <Component {...props} />
  }
}

export default TestPageReady
