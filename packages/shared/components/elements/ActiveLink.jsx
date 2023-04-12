import Router, { withRouter } from 'next/router'
import PropTypes from 'prop-types'
import Link from 'next/link'
import React from 'react'
import * as utils from '@/helpers/utils'

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
  target,
  ariaLabel,
  style,
  role,
  onClick,
  className,
}) => {
  const [pathname, setPathname] = React.useState(router.pathname)
  const isLinkActive = testIfActive(pathname, href, matchingHrefs)

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
      className={isLinkActive ? `${className} ${activeClass}`.trim() : className}
      target={target}
      onClick={onClick}
      aria-label={ariaLabel}
      style={style}
      role={role}
    >
      {children}
    </Link>
  )
}

ActiveLink.propTypes = {
  router: PropTypes.object.isRequired,
  href: PropTypes.string.isRequired,
  matchingHrefs: PropTypes.array,
  activeClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  style: PropTypes.object,
  role: PropTypes.string,
}

ActiveLink.defaultProps = {
  matchingHrefs: [],
  activeClass: '_active',
  onClick: () => {},
  ariaLabel: '',
  style: null,
  role: '',
}

export default withRouter(ActiveLink)
