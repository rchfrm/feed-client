import Router, { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)
  const { href, activeClass = '_active' } = props
  const [pathname, setPathname] = React.useState(router.pathname)

  const handleRouteChange = React.useCallback((url) => {
    setPathname(url)
  }, [])

  React.useEffect(() => {
    Router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [handleRouteChange])

  let className = child.props.className || ''
  if (pathname === href) {
    className = `${className} ${activeClass}`.trim()
  }

  return <Link href={href}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
