import React from 'react'
import PropTypes from 'prop-types'
import ActiveLink from '@/elements/ActiveLink'
import SignOutLink from '@/app/SignOutLink'
import { footerLinks } from '@/app/helpers/navHelpers'

const FooterLinks = ({ hasAuth }) => {
  return (
    <nav>
      <ul className="flex">
        {hasAuth ? (
          <li className="mr-5">
            <SignOutLink />
          </li>
        ) : (
          footerLinks.map(({ href, title, external }) => {
            return (
              <li className="mr-5 last:mr-0" key={href}>
                {external
                  ? <a href={href} target="_blank" rel="noopener noreferrer">{title}</a>
                  : <ActiveLink activeClass="no-underline" href={href}><a>{title}</a></ActiveLink>}
              </li>
            )
          })
        )}
      </ul>
    </nav>
  )
}

FooterLinks.propTypes = {
  hasAuth: PropTypes.bool,
}

FooterLinks.defaultProps = {
  hasAuth: true,
}

export default FooterLinks
