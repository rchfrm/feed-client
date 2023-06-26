import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import HeartIcon from '@/icons/HeartIcon'
import ProfileIcon from '@/icons/ProfileIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import brandColors from '@/constants/brandColors'

const CampaignsNodeAudience = ({
  group,
  index,
  node,
  onDragOver,
  onDrop,
  getPosition,
  isActive,
  isLast,
}) => {
  const { handlers } = group
  const { platform, label } = node
  const nodeRef = React.useRef()
  const isCustomAudience = group.subType === 'custom'
  const isDesktopLayout = useBreakpointTest('xs')

  const icons = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
  }
  const PlatformIcon = icons[platform]

  return (
    <div
      id={isLast ? group.id : null}
      ref={nodeRef}
      className={[
        'w-full xs:w-52 p-1.5 z-10 absolute cursor-default',
        'border-2 border-b-[6px] border-solid rounded-dialogue',
        'text-sm text-[#203578]',
        isCustomAudience
          ? isActive ? 'bg-gradient-2-light border-gradient-2-dark' : 'bg-white border-gradient-2-light text-gradient-2-dark'
          : 'bg-gradient-1-light border-gradient-1-dark',
      ].join(' ')}
      style={{ top: `${index * 5}px`, left: isDesktopLayout ? `${index * 5}px` : null }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      role="button"
    >
      {PlatformIcon && (
        <div className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-[5px] z-10 overflow-hidden">
          <PlatformIcon className="h-4 w-auto" />
        </div>
      )}
      <div className="flex items-center">
        <div className={[
          'flex items-center justify-center flex-shrink-0',
          'w-8 h-[38px] mr-2',
          'rounded-dialogue',
          'border-2 border-solid border-gradient-2-light',
          isCustomAudience
            ? isActive ? 'bg-gradient-2-dark' : 'border-2 border-solid border-gradient-2-light'
            : 'bg-gradient-1-dark',
        ].join(' ')}
        >
          {isCustomAudience ? (
            <HeartIcon fill={isActive ? brandColors.white : brandColors.gradient[2].light} className="h-5 w-auto" />
          ) : (
            <ProfileIcon fill="#FFF" className="h-6 w-auto" />
          )}
        </div>
        <div>{label}</div>
      </div>
      {isLast && (
        handlers.map((handler) => (
          <CampaignsNodeConnector
            key={handler.position}
            id={group.id}
            handler={handler}
            nodeRef={nodeRef}
            getPosition={getPosition}
            className={[
              'pointer-events-none',
              isCustomAudience ? 'bg-gradient-2-dark' : 'bg-gradient-1-dark',
            ].join(' ')}
          />
        ))
      )}
    </div>
  )
}

CampaignsNodeAudience.propTypes = {
  group: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
}

export default CampaignsNodeAudience
