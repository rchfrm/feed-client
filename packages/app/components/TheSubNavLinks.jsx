import React from 'react'
import PropTypes from 'prop-types'

import useNotificationsStore from '@/app/stores/notificationsStore'

import { UserContext } from '@/app/contexts/UserContext'

import SignOutLink from '@/app/SignOutLink'
import NotificationDot from '@/elements/NotificationDot'
import ActiveLink from '@/elements/ActiveLink'

import styles from '@/app/TheSubNav.module.css'

import * as ROUTES from '@/app/constants/routes'


const { ACCOUNT, MYREFERRAL, PRICING, FAQ, NOTIFICATIONS } = ROUTES
const termsLink = 'https://tryfeed.co/legal/terms-of-service'
const links = [
  {
    href: ACCOUNT,
    title: 'account settings',
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
    external: true,
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
  return (
    <>
      {title}
      {totalActiveNotifications > 0 && (
        <span className="text-red">&nbsp;{totalActiveNotifications}</span>
      )}
    </>
  )
}

const TheSubNavLinks = ({ className }) => {
  const { hasPendingEmail } = React.useContext(UserContext)
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
            const showDot = href === ACCOUNT && hasPendingEmail
            return (
              <li className={[styles.linkItem].join(' ')} key={href}>
                {external
                  ? <a className={styles.a} href={href}>{titleText}</a>
                  : (
                    <>
                      <ActiveLink href={href}>
                        <a className={['relative', styles.a].join(' ')}>
                          {titleText}
                          {/* PENDING EMAIL WARNING */}
                          {showDot && (
                            <NotificationDot size="small" style={{ left: '-1.25rem', top: '0.55rem' }} />
                          )}
                        </a>
                      </ActiveLink>
                    </>
                  )}
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
