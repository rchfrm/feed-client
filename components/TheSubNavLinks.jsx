import React from 'react'
import ActiveLink from './ActiveLink'
import SignOutLink from './SignOutLink'

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

const TheSubNavLinks = () => {
  return (
    <nav className={styles.links}>
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
      </ul>
      <SignOutLink className={styles.signOutLink} />
    </nav>
  )
}

TheSubNavLinks.propTypes = {

}

export default TheSubNavLinks
