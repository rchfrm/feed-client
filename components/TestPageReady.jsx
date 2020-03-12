import { useContext, useState } from 'react'
import Router, { useRouter } from 'next/router'
import useAsyncEffect from 'use-async-effect'

import * as ROUTES from '../constants/routes'
import { AuthContext } from './contexts/Auth'

// const kickToLogin = () => 

const TestPageReady = (Component) => {
  return (props) => {
    const { pathname: currentPath } = useRouter()
    const { auth: { token: initialToken }, getToken } = useContext(AuthContext)
    const [token, setToken] = useState(initialToken)
    useAsyncEffect(async (isMounted) => {
      console.log('sdflksdjflsdkfj')
      console.log('currentPath', currentPath)
      console.log('initialToken', initialToken)
      if (!initialToken && currentPath !== ROUTES.LOGIN) {
        // Check for new token
        console.log('sdfs')
        const newToken = await getToken()
        console.log('newToken', newToken)
        // Stop here if not mounted
        // if (!isMounted()) return
        // If new token can't be generated...
        if (!newToken) {
          console.log('go home')
          Router.push(ROUTES.LOGIN)
          return
        }
        // Set new token
        setToken(newToken)
      }
    }, [])
    // Stop flash of content if landing on page while not logged in
    if (!token && !initialToken) return <></>
    // Show the content of the page
    return <Component {...props} />
  }
}

export default TestPageReady
