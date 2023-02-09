import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { UserContext } from '@/app/contexts/UserContext'
import useNotificationsStore from '@/app/stores/notificationsStore'
import useSignOut from '@/app/hooks/useSignOut'
import SideNavPrimaryLink from '@/app/SideNavPrimaryLink'
import { primaryLinks } from '@/app/helpers/navHelpers'
import * as ROUTES from '@/app/constants/routes'

const getNotificationsStoreState = (state) => ({
  totalActiveNotifications: state.totalActiveNotifications,
})

const SideNavPrimaryLinks = ({ isExpanded }) => {
  const { totalActiveNotifications } = useNotificationsStore(getNotificationsStoreState)
  const hasNotifications = totalActiveNotifications > 0
  const { hasPendingEmail } = React.useContext(UserContext)
  const { pathname } = useRouter()
  const signOut = useSignOut()

  return (
    <nav className={[
      'flex flex-col ml-3 mb-3 px-4',
    ].join(' ')}
    >
      {primaryLinks.map(({ href, icon, title, isSignOut, isExternal, isMobile }) => {
        const isActive = pathname === href
        const shouldShowDot = (hasPendingEmail && href === ROUTES.ACCOUNT) || (hasNotifications && href === ROUTES.NOTIFICATIONS)

        if (isMobile) {
          return
        }

        return (
          <div key={icon}>
            <SideNavPrimaryLink
              href={href}
              icon={icon}
              title={title}
              action={isSignOut ? signOut : null}
              isActive={isActive}
              isExternal={isExternal}
              isExpanded={isExpanded}
              shouldShowDot={shouldShowDot}
            />
          </div>
        )
      })}
    </nav>
  )
}

SideNavPrimaryLinks.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
}

export default SideNavPrimaryLinks
