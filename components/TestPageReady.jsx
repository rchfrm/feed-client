import React from 'react'
import Router, { useRouter } from 'next/router'

import * as ROUTES from '../constants/routes'
import { AuthContext } from './contexts/Auth'

import helper from './helpers/helper'

import Spinner from './elements/Spinner'

const kickToLogin = () => Router.push(ROUTES.LOGIN)

const TestPageReady = (Component) => {
  return (props) => {
    const { pathname: currentPath } = useRouter()
    const { auth: { token: initialToken }, authLoading } = React.useContext(AuthContext)

    React.useEffect(() => {
      if (authLoading) return
      if (!initialToken) {
        if (currentPath !== ROUTES.LOGIN) kickToLogin()
        helper.clearLocalStorage()
      }
    }, [authLoading])

    // Show spinner if auth loading
    if (authLoading) return <Spinner width={50} />
    // Show the content of the page
    if (initialToken) return <Component {...props} />
    // Stop flash of content if landing on page while not logged in
    return null
  }
}

export default TestPageReady
