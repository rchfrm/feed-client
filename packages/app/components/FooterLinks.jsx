import React from 'react'
import PropTypes from 'prop-types'
import ActiveLink from '@/elements/ActiveLink'
import SignOutLink from '@/app/SignOutLink'
import { footerLinks } from '@/app/helpers/navHelpers'
import styles from '@/app/Footer.module.css'

const FooterLinks = ({ hasAuth }) => {
  return (
    <nav className={styles.links}>
      <ul className={[styles.linksList, 'flex'].join(' ')}>
        {hasAuth ? (
          <li className={styles.linkItem}>
            <SignOutLink />
          </li>
        ) : (
          <>
            {footerLinks.map(({ href, title, external }) => {
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

FooterLinks.propTypes = {
  hasAuth: PropTypes.bool,
}

FooterLinks.defaultProps = {
  hasAuth: true,
}

export default FooterLinks
