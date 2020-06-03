import React from 'react'
import ActiveLink from './ActiveLink'

import * as ROUTES from '../constants/routes'

import styles from './TheFooter.module.css'

const { LOGIN, SIGN_UP, PRICING, FAQ } = ROUTES
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

const TheFooterLinks = () => {
  return (
    <nav className={styles.links}>
      <ul className={[styles.linksList, 'flex'].join(' ')}>
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
    </nav>
  )
}

export default TheFooterLinks
