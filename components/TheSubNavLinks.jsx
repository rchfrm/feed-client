import React from 'react'
import PropTypes from 'prop-types'

import SignOutLink from './SignOutLink'
import ActiveLink from './ActiveLink'

import * as ROUTES from '../constants/routes'

import styles from './TheSubNav.module.css'

const { PRICING, FAQ } = ROUTES
const termsLink = 'https://archform.ltd/terms/'
const links = [
  {
    href: ROUTES.ACCOUNT,
    title: 'account',
  },
  {
    href: FAQ,
    title: 'FAQs',
  },
  {
    href: PRICING,
    title: 'pricing',
  },
  {
    href: termsLink,
    title: 'terms',
    external: true,
  },
]

const TheSubNavLinks = ({ className }) => {
  return (
    <>
      <nav className={[styles.links, className].join(' ')}>
        <ul className={[styles.linksList, 'h4--text'].join(' ')}>
          {links.map(({ href, title, external }) => {
            return (
              <li className={styles.linkItem} key={href}>
                {external
                  ? <a className={styles.a} href={href} target="_blank" rel="noopener noreferrer">{ title }</a>
                  : <ActiveLink href={href}><a className={styles.a}>{ title }</a></ActiveLink>}
              </li>
            )
          })}
          <li className={[styles.linkItem, styles.signOutLink_desktop].join(' ')}>
            <SignOutLink />
          </li>
        </ul>
      </nav>
    </>
  )
}

TheSubNavLinks.propTypes = {
  className: PropTypes.string,
}

TheSubNavLinks.defaultProps = {
  className: '',
}


export default TheSubNavLinks
