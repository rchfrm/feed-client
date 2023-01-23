import React from 'react'
import PropTypes from 'prop-types'
import useSignOut from '@/app/hooks/useSignOut'
import useHover from '@/app/hooks/useHover'
import useNotificationsStore from '@/app/stores/notificationsStore'
import NotificationDot from '@/elements/NotificationDot'
import ActiveLink from '@/elements/ActiveLink'
import PrimaryLinkIcon from '@/app/PrimaryLinkIcon'

const getTotalActiveNotifications = (state) => {
  return state.totalActiveNotifications
}

const HeaderMenuLink = ({
  href,
  title,
  icon,
  isActive,
  isExternal,
  isSignOut,
  shouldShowDot,
}) => {
  const [hoverRef, isHover] = useHover()
  const totalActiveNotifications = useNotificationsStore(getTotalActiveNotifications)
  const signOut = useSignOut()

  return (
    <li className="mb-10 text-grey-2 hover:text-green" key={title} ref={hoverRef}>
      {href ? (
        <ActiveLink href={href} activeClass="text-green">
          <a
            target={isExternal ? '_blank' : ''}
            className={['relative flex items-center no-underline'].join(' ')}
          >
            <PrimaryLinkIcon
              icon={icon}
              isActive={isActive}
              isHover={isHover}
              className="mr-3"
            />
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
        <button onClick={isSignOut ? signOut : null} className="flex items-center hover:text-green">
          <PrimaryLinkIcon
            icon={icon}
            isActive={isActive}
            isHover={isHover}
            className="mr-3"
          />
          {title}
        </button>
      )}
    </li>
  )
}

HeaderMenuLink.propTypes = {
  href: PropTypes.string,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isExternal: PropTypes.bool,
  isSignOut: PropTypes.bool,
  shouldShowDot: PropTypes.bool.isRequired,
}

HeaderMenuLink.defaultProps = {
  href: '',
  isExternal: false,
  isSignOut: false,
}

export default HeaderMenuLink
