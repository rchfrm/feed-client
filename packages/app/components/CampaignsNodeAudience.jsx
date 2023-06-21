import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import HeartIcon from '@/icons/HeartIcon'
import ProfileIcon from '@/icons/ProfileIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import brandColors from '@/constants/brandColors'

const CampaignsNodeAudience = ({
  node,
  onDragOver,
  onDrop,
  getPosition,
}) => {
  const {
    id,
    handlers,
    isActive,
    data: {
      label, audienceType,
    },
  } = node
  const isDesktopLayout = useBreakpointTest('xs')
  const nodeRef = React.useRef()
  const isCustomAudience = audienceType === 'custom'

  return (
    <div
      id={id}
      ref={nodeRef}
      style={{
        order: ! isDesktopLayout ? node.order : null,
        top: isDesktopLayout ? node.position.y : null,
        left: isDesktopLayout ? node.position.x : null,
      }}
      className={[
        'w-3/4 xs:w-52 z-10 p-1.5',
        'border-2 border-b-[6px] border-solid rounded-dialogue',
        'text-sm text-[#203578]',
        isCustomAudience
          ? isActive ? 'bg-gradient-2-light border-gradient-2-dark' : 'bg-white border-gradient-2-light text-gradient-2-dark'
          : 'bg-gradient-1-light border-gradient-1-dark',
        isDesktopLayout ? 'absolute' : 'relative mb-12',
      ].join(' ')}
      onDragOver={onDragOver}
      onDrop={onDrop}
      role="button"
    >
      <div className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-dialogue z-10">
        <InstagramIcon className="h-4 w-auto" />
      </div>
      <div className="flex items-center">
        <div className={[
          'flex items-center justify-center flex-shrink-0',
          'w-8 h-[38px] mr-2',
          'rounded-dialogue',
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
      {handlers.map((handler) => (
        <CampaignsNodeConnector
          key={handler.position}
          node={node}
          handler={handler}
          nodeRef={nodeRef}
          className={isCustomAudience ? 'bg-gradient-2-dark' : 'bg-gradient-1-dark'}
          getPosition={getPosition}
        />
      ))}
    </div>
  )
}

CampaignsNodeAudience.propTypes = {
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
}

export default CampaignsNodeAudience
