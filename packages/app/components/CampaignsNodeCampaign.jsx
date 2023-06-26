import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import HeartIcon from '@/icons/HeartIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'

const CampaignsNodeCampaign = ({
  index,
  group,
  node,
  onDragOver,
  onDrop,
  getPosition,
  isActive,
  isLast,
}) => {
  const { handlers } = group
  const { label, platform } = node
  const nodeRef = React.useRef()
  const engagementRate = 0
  const costPerEngagement = 0
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
        'w-full xs:w-36 h-[74px] z-10 absolute cursor-default',
        'p-2 rounded-dialogue',
        isActive ? 'bg-green-bg-light' : 'bg-white border-solid border-2 border-green',
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
      <div className={[
        'flex h-full items-center text-sm',
        isActive ? 'flex-row xs:flex-col justify-around xs:justify-center' : 'flex-col justify-center xs:items-start',
      ].join(' ')}
      >
        {isActive ? (
          <div className="text-xs">{label}</div>
        ) : (
          <>
            <div className="flex items-center mb-0.5 justify-center xs:justify-start">
              {isActive && <HeartIcon className="h-3 w-auto mr-1 flex-shrink-0" />}
              <p className="mb-0 font-bold">Engagements</p>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-2 text-xs bg-green-bg-dark p-1 rounded-dialogue">
                <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">{engagementRate}%</div>
                <div className="text-[8px]">eng. rate</div>
              </div>
              <div className="flex flex-col items-center text-xs bg-green-bg-dark p-1 rounded-dialogue">
                <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">£{costPerEngagement}</div>
                <div className="text-[8px]">per eng.</div>
              </div>
            </div>
          </>
          // <>
          //   <p className="mb-1 font-bold">+ Add campaign</p>
          //   <p className="mb-0 text-xs">Encourage people to visit your profile.</p>
          // </>
        )}
      </div>
      {isLast && (
        handlers.map((handler) => (
          <CampaignsNodeConnector
            key={handler.position}
            id={group.id}
            handler={handler}
            nodeRef={nodeRef}
            getPosition={getPosition}
            className="pointer-events-none bg-green-bg-dark"
          />
        ))
      )}
    </div>
  )
}

CampaignsNodeCampaign.propTypes = {
  group: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
}

export default CampaignsNodeCampaign
