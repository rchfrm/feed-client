import React from 'react'
import PropTypes from 'prop-types'
import useHover from '@/app/hooks/useHover'
import useNotificationsStore from '@/app/stores/notificationsStore'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import PrimaryLinkIcon from '@/app/PrimaryLinkIcon'
import NotificationDot from '@/elements/NotificationDot'
import ActiveLink from '@/elements/ActiveLink'

const getNotificationsStoreState = (state) => ({
  artistsWithNotifications: state.artistsWithNotifications,
})

const SideNavPrimaryLink = ({
  href,
  icon,
  title,
  action,
  isActive,
  isExternal,
  isExpanded,
}) => {
  const [hoverRef, isHover] = useHover()

  const { artistsWithNotifications } = useNotificationsStore(getNotificationsStoreState)
  const { artistId } = React.useContext(ArtistContext)
  const hasNotification = artistsWithNotifications.includes(artistId)
  const shouldShowDot = hasNotification && title === 'Notifications'

  return (
    <div ref={hoverRef}>
      {href ? (
        <ActiveLink href={href} activeClass="text-green">
          <a
            className={[
              'relative flex items-center',
              'mb-5 no-underline',
            ].join(' ')}
            target={isExternal ? '_blank' : ''}
          >
            <div className="relative">
              <PrimaryLinkIcon
                icon={icon}
                isActive={isActive}
                isHover={isHover}
              />
              {shouldShowDot && (
                <NotificationDot size="small" className="absolute -top-1.5 -right-1.5 z-5" />
              )}
            </div>
            <p className={[
              'ml-2 mb-0 transition-opacity',
              isActive || isHover ? 'text-green' : 'text-grey-2',
              isExpanded ? 'opacity-1 delay-300' : 'opacity-0 delay-100 w-0',
            ].join(' ')}
            >
              {title}
            </p>
          </a>
        </ActiveLink>
      ) : (
        <button
          onClick={action}
          className="flex items-center mb-5 hover:text-green"
        >
          <PrimaryLinkIcon
            icon={icon}
            isActive={isActive}
            isHover={isHover}
          />
          <p
            className={[
              'ml-2 mb-0 transition-opacity whitespace-nowrap',
              isActive || isHover ? 'text-green' : 'text-grey-2',
              isExpanded ? 'opacity-1 delay-300' : 'opacity-0 delay-100 w-0',
            ].join(' ')}
          >
            {title}
          </p>
        </button>
      )}
    </div>
  )
}

SideNavPrimaryLink.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  action: PropTypes.func,
  isActive: PropTypes.bool.isRequired,
  isExternal: PropTypes.bool,
  isExpanded: PropTypes.bool.isRequired,
}

SideNavPrimaryLink.defaultProps = {
  href: '',
  action: null,
  isExternal: false,
}

export default SideNavPrimaryLink
