import React from 'react'
import Router, { useRouter } from 'next/router'

import * as ROUTES from '@/app/constants/routes'
import { AuthContext } from '@/contexts/AuthContext'

import * as utils from '@/helpers/utils'

const kickToLogin = () => Router.push(ROUTES.LOGIN)

const testPageReady = (Component) => (props) => {
  const { pathname: currentPath } = useRouter()
  const { auth: { token: initialToken }, authLoading } = React.useContext(AuthContext)

  React.useEffect(() => {
    if (authLoading) return
    if (!initialToken) {
      if (currentPath !== ROUTES.LOGIN) kickToLogin()
      utils.clearLocalStorage()
    }
  }, [currentPath, initialToken, authLoading])

  // Show spinner if auth loading
  if (authLoading) return null
  // Show the content of the page
  if (initialToken) return <Component {...props} />
  // Stop flash of content if landing on page while not logged in
  return null
}

export default testPageReady
