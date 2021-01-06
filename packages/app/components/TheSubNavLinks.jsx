import React from 'react'
import PropTypes from 'prop-types'

import useNotificationsStore from '@/app/store/notificationsStore'

import SignOutLink from '@/SignOutLink'
import ActiveLink from '@/elements/ActiveLink'

import styles from '@/app/TheSubNav.module.css'

import * as ROUTES from '@/app/constants/routes'


const { ACCOUNT, MYREFERRAL, PRICING, FAQ, NOTIFICATIONS } = ROUTES
const termsLink = 'https://archform.ltd/terms/'
const links = [
  {
    href: ACCOUNT,
    title: 'account',
  },
  {
    href: MYREFERRAL,
    title: 'my referral code',
  },
  {
    href: NOTIFICATIONS,
    title: 'notifications',
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

const getTotalActiveNotifications = state => state.totalActiveNotifications

const NOTIFICATION_LINK_TEXT = ({ title }) => {
  // FETCH NOTIFICATIONS
  const totalActiveNotifications = useNotificationsStore(getTotalActiveNotifications)
  if (totalActiveNotifications) {
    return (
      <>
        <span className="text-red">{totalActiveNotifications}&nbsp;</span>
        {title}
      </>
    )
  }
  return title
}

const TheSubNavLinks = ({ className }) => {
  return (
    <>
      <nav className={[styles.links, className].join(' ')}>
        <ul className={[
          styles.linksList,
          'h4--text mb-0',
        ].join(' ')}
        >
          {links.map(({ href, title, external }) => {
            const titleText = title === 'notifications' ? <NOTIFICATION_LINK_TEXT title={title} /> : title
            return (
              <li className={[styles.linkItem].join(' ')} key={href}>
                {external
                  ? <a className={styles.a} href={href} target="_blank" rel="noopener noreferrer">{ titleText }</a>
                  : <ActiveLink href={href}><a className={styles.a}>{ titleText }</a></ActiveLink>}
              </li>
            )
          })}
        </ul>
        <p className={[styles.linkItem, styles.signOutLink_desktop].join(' ')}>
          <SignOutLink />
        </p>
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
