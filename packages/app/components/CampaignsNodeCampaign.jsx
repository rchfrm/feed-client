import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import HeartIcon from '@/icons/HeartIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import * as ROUTES from '@/app/constants/routes'

const CampaignsNodeCampaign = ({
  index,
  group,
  node,
  onDragOver,
  onDrop,
  getPosition,
  isActive,
}) => {
  const { handlers } = group
  const { campaignId, engagementRate, costPerEngagement, label } = node
  const nodeRef = React.useRef()
  const isDesktopLayout = useBreakpointTest('xs')
  const { targetingState: { platforms } } = React.useContext(TargetingContext)
  const isLast = index === group.nodes.length - 1

  const icons = {
    facebook: <FacebookIcon className="h-4 w-auto" />,
    instagram: <InstagramIcon className="h-4 w-auto" />,
  }

  const handleClick = () => {
    Router.push({
      pathname: `${ROUTES.CAMPAIGN}/${campaignId}`,
    })
  }

  return (
    <div
      id={isLast ? group.id : `${group.id}-${index}`}
      ref={nodeRef}
      className={[
        'w-full xs:w-36 h-[74px] z-10 cursor-default',
        'p-1 rounded-dialogue cursor-pointer',
        isDesktopLayout ? 'absolute' : 'relative mb-4',
        isActive ? 'bg-green-bg-light' : 'bg-white border-solid border-2 border-green',
      ].join(' ')}
      style={{
        top: isDesktopLayout ? node.position.y : null,
        left: isDesktopLayout ? node.position.x : null,
      }}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={handleClick}
      role="button"
    >
      {platforms?.map((platform) => (
        <div key={platform} className="absolute -top-2 -left-2 h-4 w-4 bg-white rounded-[5px] z-10 overflow-hidden">
          {icons[platform]}
        </div>
      ))}
      <div className={[
        'flex h-full items-center text-sm',
        isActive ? 'flex-row xs:flex-col justify-around xs:justify-center' : 'flex-col justify-center xs:items-start',
      ].join(' ')}
      >
        {isActive && (
          <>
            <div className="flex items-center mb-0.5 justify-center xs:justify-start">
              {isActive && <HeartIcon className="h-3 w-auto mr-1 flex-shrink-0" />}
              <p className="mb-1 font-bold">Engagements</p>
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
            <div className="absolute -bottom-5 text-[8px]">{label}</div>
          </>
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
  index: PropTypes.number.isRequired,
  group: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
}

export default CampaignsNodeCampaign
