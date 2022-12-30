import React from 'react'
import useNotificationsStore from '@/app/stores/notificationsStore'
import useSignOut from '@/app/hooks/useSignOut'
import { UserContext } from '@/app/contexts/UserContext'
import NotificationDot from '@/elements/NotificationDot'
import ActiveLink from '@/elements/ActiveLink'
import * as ROUTES from '@/app/constants/routes'
import { secondaryLinks } from '@/app/helpers/navHelpers'

const getTotalActiveNotifications = (state) => {
  return state.totalActiveNotifications
}

const HeaderMenuLinks = () => {
  const { hasPendingEmail } = React.useContext(UserContext)
  const totalActiveNotifications = useNotificationsStore(getTotalActiveNotifications)
  const signOut = useSignOut()

  return (
    <nav className="ml-2">
      <ul className={[
        'h4--text mb-0',
      ].join(' ')}
      >
        {secondaryLinks.map(({ href, title, isSignOut, isExternal }) => {
          const shouldShowDot = href === ROUTES.ACCOUNT && hasPendingEmail

          return (
            <li className="mb-6" key={title}>
              {href ? (
                <ActiveLink href={href}>
                  <a
                    target={isExternal ? '_blank' : ''}
                    className={['relative no-underline text-grey-2'].join(' ')}
                  >
                    {title}
                    {title === 'notifications' && totalActiveNotifications > 0 && (
                      <span className="text-red">&nbsp;{totalActiveNotifications}</span>
                    )}
                    {shouldShowDot && (
                      <NotificationDot size="small" style={{ left: '-1rem', top: '0.55rem' }} />
                    )}
                  </a>
                </ActiveLink>
              ) : (
                <button onClick={isSignOut ? signOut : null} className="hover:text-green">
                  {title}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default HeaderMenuLinks
