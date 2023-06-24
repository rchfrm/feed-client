import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import HeartIcon from '@/icons/HeartIcon'
import InstagramIcon from '@/icons/InstagramIcon'

const CampaignsNodeCampaign = ({
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
      label,
      engagementRate,
      costPerEngagement,
    },
  } = node
  const isDesktopLayout = useBreakpointTest('xs')
  const nodeRef = React.useRef()

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
        'w-3/4 xs:w-36 h-[74px] z-10',
        'p-2 rounded-dialogue',
        isActive ? 'bg-green-bg-light' : 'bg-white border-solid border-2 border-green',
        isDesktopLayout ? 'absolute' : 'relative mb-12',
      ].join(' ')}
      onDragOver={onDragOver}
      onDrop={onDrop}
      role="button"
    >
      <div className="absolute -top-2 -left-2 h-4 w-4 bg-white z-10">
        <InstagramIcon className="h-4 w-auto" />
      </div>
      <div className={[
        'flex h-full items-center text-sm',
        isActive ? 'flex-row xs:flex-col justify-around xs:justify-center' : 'flex-col justify-center xs:items-start',
      ].join(' ')}
      >
        {isActive ? (
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
        ) : (
          // <>
          //   <p className="mb-1 font-bold">+ Add campaign</p>
          //   <p className="mb-0 text-xs">Encourage people to visit your profile.</p>
          // </>
          <div className="text-xs">{label}</div>
        )}
      </div>
      {handlers.map((handler) => (
        <CampaignsNodeConnector
          key={handler.position}
          node={node}
          handler={handler}
          nodeRef={nodeRef}
          className="bg-green-bg-dark"
          getPosition={getPosition}
        />
      ))}
    </div>
  )
}

CampaignsNodeCampaign.propTypes = {
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  getPosition: PropTypes.func.isRequired,
}

export default CampaignsNodeCampaign
