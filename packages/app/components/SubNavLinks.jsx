import React from 'react'
import PropTypes from 'prop-types'
import useNotificationsStore from '@/app/stores/notificationsStore'
import { UserContext } from '@/app/contexts/UserContext'
import SignOutLink from '@/app/SignOutLink'
import NotificationDot from '@/elements/NotificationDot'
import ActiveLink from '@/elements/ActiveLink'
import * as ROUTES from '@/app/constants/routes'

const { ACCOUNT, PRICING, FAQS, NOTIFICATIONS, BILLING } = ROUTES
const termsLink = 'https://tryfeed.co/legal/terms-of-service'
const links = [
  {
    href: ACCOUNT,
    title: 'account settings',
  },
  {
    href: NOTIFICATIONS,
    title: 'notifications',
  },
  {
    href: BILLING,
    title: 'billing',
  },
  {
    href: FAQS,
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

const getTotalActiveNotifications = (state) => state.totalActiveNotifications

const NOTIFICATION_LINK_TEXT = ({ title }) => {
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

const SubNavLinks = ({ className }) => {
  const { hasPendingEmail } = React.useContext(UserContext)
  return (
    <>
      <nav className={[className, 'ml-1 mb-5 font-medium'].join(' ')}>
        <ul className={[
          'h4--text mb-0',
        ].join(' ')}
        >
          {links.map(({ href, title, external }) => {
            const titleText = title === 'notifications' ? <NOTIFICATION_LINK_TEXT title={title} /> : title
            const showDot = href === ACCOUNT && hasPendingEmail
            return (
              <li className="mb-6" key={href}>
                {external
                  ? <a className="no-underline text-grey" href={href}>{titleText}</a>
                  : (
                    <>
                      <ActiveLink href={href}>
                        <a className={['relative no-underline text-grey'].join(' ')}>
                          {titleText}
                          {/* PENDING EMAIL WARNING */}
                          {showDot && (
                            <NotificationDot size="small" style={{ left: '-1rem', top: '0.55rem' }} />
                          )}
                        </a>
                      </ActiveLink>
                    </>
                  )}
              </li>
            )
          })}
        </ul>
        <p className={['mb-6 text-sm opacity-70 hover:opacity-100 hidden md:block'].join(' ')}>
          <SignOutLink />
        </p>
      </nav>
    </>
  )
}

SubNavLinks.propTypes = {
  className: PropTypes.string,
}

SubNavLinks.defaultProps = {
  className: '',
}

export default SubNavLinks
