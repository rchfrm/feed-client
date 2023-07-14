import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import HeartIcon from '@/icons/HeartIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import CampaignsNodeCampaignHeader from '@/app/CampaignsNodeCampaignHeader'

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
  const { engagementRate, costPerEngagement, label } = node
  const isTrafficCampaign = label.endsWith('Traffic')
  const nodeRef = React.useRef()
  const isDesktopLayout = useBreakpointTest('xs')
  const { targetingState: { platforms } } = React.useContext(TargetingContext)

  const icons = {
    facebook: <FacebookIcon className="h-4 w-auto" />,
    instagram: <InstagramIcon className="h-4 w-auto" />,
  }

  return (
    <div
      id={`${group.id}-${index}`}
      ref={nodeRef}
      className={[
        'w-full xs:w-36 z-10 cursor-default',
        'p-3 rounded-dialogue',
        isDesktopLayout ? 'absolute' : 'relative mb-4',
        isActive ? 'bg-green-bg-light' : 'bg-white border-solid border-2 border-green',
      ].join(' ')}
      style={{
        top: isDesktopLayout ? node.position.y : null,
        left: isDesktopLayout ? node.position.x : null,
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      role="button"
    >
      {platforms?.map((platform) => (
        <div key={platform} className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-[5px] z-10 overflow-hidden">
          {icons[platform]}
        </div>
      ))}
      <div className={[
        'flex h-full text-sm gap-y-2',
        isActive ? 'flex-row xs:flex-col' : 'flex-col',
      ].join(' ')}
      >
        {isActive && (
          <>
            <CampaignsNodeCampaignHeader isActive={isActive} isTrafficCampaign={isTrafficCampaign} />
            <div className="flex gap-x-2">
              <div className="flex flex-col items-center xs:w-full text-xs bg-green-bg-dark p-1 rounded-dialogue">
                <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">{engagementRate}%</div>
                <div className="text-[8px]">eng. rate</div>
              </div>
              <div className="flex flex-col items-center xs:w-full text-xs bg-green-bg-dark p-1 rounded-dialogue">
                <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">£{costPerEngagement}</div>
                <div className="text-[8px]">per eng.</div>
              </div>
            </div>
          </>
        )}
      </div>
      {handlers.map((handler) => (
          <CampaignsNodeConnector
            key={handler.position}
            id={group.id}
            handler={handler}
            nodeRef={nodeRef}
            getPosition={getPosition}
            className="pointer-events-none bg-green-bg-dark"
          />
        ))
      }
    </div>
  )
}

CampaignsNodeCampaign.propTypes = {
  index: PropTypes.number.isRequired,
  group: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  isLast: PropTypes.bool.isRequired,
}

export default CampaignsNodeCampaign
