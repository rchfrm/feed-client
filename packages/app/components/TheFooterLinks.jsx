import React from 'react'
import PropTypes from 'prop-types'

import ActiveLink from '@/elements/ActiveLink'
import SignOutLink from '@/app/SignOutLink'

import * as ROUTES from '@/app/constants/routes'

import styles from '@/app/TheFooter.module.css'

const { LOGIN, SIGN_UP, PRICING, FAQS } = ROUTES
const termsLink = 'https://archform.ltd/terms/'
const links = [
  {
    href: LOGIN,
    title: 'log in',
  },
  {
    href: SIGN_UP,
    title: 'sign up',
  },
  {
    href: FAQS,
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

const TheFooterLinks = ({ hasAuth }) => {
  return (
    <nav className={styles.links}>
      <ul className={[styles.linksList, 'flex'].join(' ')}>
        {hasAuth ? (
          <li className={styles.linkItem}>
            <SignOutLink />
          </li>
        ) : (
          <>
            {links.map(({ href, title, external }) => {
              return (
                <li className={styles.linkItem} key={href}>
                  {external
                    ? <a className={styles.a} href={href} target="_blank" rel="noopener noreferrer">{ title }</a>
                    : <ActiveLink href={href}><a className={styles.a}>{ title }</a></ActiveLink>}
                </li>
              )
            })}
          </>
        )}
      </ul>
    </nav>
  )
}

TheFooterLinks.propTypes = {
  hasAuth: PropTypes.bool,
}

TheFooterLinks.defaultProps = {
  hasAuth: true,
}

export default TheFooterLinks
