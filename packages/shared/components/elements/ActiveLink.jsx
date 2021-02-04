import Router, { withRouter } from 'next/router'
import PropTypes from 'prop-types'

import Link from 'next/link'
import React, { Children } from 'react'

import * as utils from '@/helpers/utils'

// Test whether link should be shown as active
const testIfActive = (pathname, href, matchingHrefs) => {
  if (pathname === href) return true
  if (matchingHrefs.includes(pathname)) return true
  return false
}

const ActiveLink = ({
  router,
  href,
  matchingHrefs,
  activeClass,
  children,
}) => {
  const child = Children.only(children)
  const [pathname, setPathname] = React.useState(router.pathname)

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

  const isLinkActive = testIfActive(pathname, href, matchingHrefs)
  const baseClasses = child.props.className || null
  const className = isLinkActive ? `${baseClasses} ${activeClass}`.trim() : baseClasses

  return <Link href={href}>{React.cloneElement(child, { className })}</Link>
}

ActiveLink.propTypes = {
  router: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  matchingHrefs: PropTypes.array,
  activeClass: PropTypes.string,
  children: PropTypes.node.isRequired,
}

ActiveLink.defaultProps = {
  matchingHrefs: [],
  activeClass: '_active',
}

export default withRouter(ActiveLink)
