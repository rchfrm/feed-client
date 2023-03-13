import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'

import * as utils from '@/landing/helpers/utils'

const ActiveLink = ({ router, children, className, ...props }) => {
  const { href, activeClass = '_active' } = props
  const [pathname, setPathname] = React.useState(router.pathname)
  const isActive = pathname === href

  const handleRouteChange = React.useCallback((url) => {
    const { pathname } = utils.parseUrl(url)
    setPathname(pathname)
  }, [])

  React.useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [handleRouteChange])

  return (
    <Link
      href={href}
      className={isActive ? `${className} ${activeClass}`.trim() : className}
    >
      {children}
    </Link>
  )
}

export default withRouter(ActiveLink)
