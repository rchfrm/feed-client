import React from 'react'
import Router, { useRouter } from 'next/router'

import * as ROUTES_APP from '@/app/constants/routes'
import * as ROUTES_ADMIN from '@/admin/constants/routes'
import { AuthContext } from '@/contexts/AuthContext'

import * as utils from '@/helpers/utils'

const kickToLogin = (loginPath) => Router.push(loginPath)

const testPageReady = (packageType) => (Component) => {
  const PageContent = (props) => {
    const { pathname: currentPath, asPath: initialFullPath } = useRouter()
    const { auth: { token: initialToken }, authLoading, setRejectedPagePath } = React.useContext(AuthContext)
    const ROUTES = packageType === 'app' ? ROUTES_APP : ROUTES_ADMIN

    React.useEffect(() => {
      if (authLoading) return
      if (! initialToken) {
        if (currentPath !== ROUTES.LOGIN) {
          setRejectedPagePath(initialFullPath)
          kickToLogin(ROUTES.LOGIN)
        }
        utils.setLocalStorage('artistId', '')
      }
    // eslint-disable-next-line
    }, [currentPath, initialToken, authLoading])

    // Show spinner if auth loading
    if (authLoading) return null
    // Show the content of the page
    if (initialToken) return <Component {...props} />
    // Stop flash of content if landing on page while not logged in
    return null
  }

  PageContent.displayName = 'testPageReady'
  return PageContent
}



export default testPageReady
