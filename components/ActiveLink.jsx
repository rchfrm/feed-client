
import { withRouter } from 'next/router'
import Link from 'next/link'
import React, { Children } from 'react'

const ActiveLink = ({ router, children, ...props }) => {
  const child = Children.only(children)
  const { href, activeClass = '_active' } = props

  let className = child.props.className || ''
  if (router.pathname === href) {
    className = `${className} ${activeClass}`.trim()
  }

  return <Link {...props}>{React.cloneElement(child, { className })}</Link>
}

export default withRouter(ActiveLink)
