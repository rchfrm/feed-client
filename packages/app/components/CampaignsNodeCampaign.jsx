import React from 'react'
import PropTypes from 'prop-types'
import useBreakpointTest from '@/hooks/useBreakpointTest'
import CampaignsNodeConnector from '@/app/CampaignsNodeConnector'
import CampaignsNodeTriangle from '@/app/CampaignsNodeTriangle'
import HeartIcon from '@/icons/HeartIcon'
import InstagramIcon from '@/icons/InstagramIcon'

const CampaignsNodeCampaign = ({
  node,
  onDragOver,
  onDrop,
  onClick,
}) => {
  const {
    id,
    handlers,
    isActive,
    data: { engagementRate, costPerEngagement },
  } = node
  const isDesktopLayout = useBreakpointTest('xs')
  const nodeRef = React.useRef()

  return (
    <div
      id={id}
      ref={nodeRef}
      onClick={onClick}
      style={{
        order: ! isDesktopLayout ? node.order : null,
        top: isDesktopLayout ? node.position.y : null,
        left: isDesktopLayout ? node.position.x : null,
      }}
      className={[
        'w-3/4 xs:w-36 h-18 z-10',
        'pl-3 p-2 rounded-dialogue',
        isActive ? 'bg-green-bg-light' : 'border-solid border-2 border-green',
        isDesktopLayout ? 'absolute' : 'relative mb-8',
      ].join(' ')}
      onDragOver={onDragOver}
      onDrop={onDrop}
      role="button"
    >
      <CampaignsNodeTriangle
        className={['scale-x-[-1] top-[36px] -right-[21px]', isActive ? 'border-white' : 'border-r-green'].join(' ')}
      />
      <CampaignsNodeTriangle
        className={['scale-x-[-1] scale-y-[-1] top-0 -right-[21px]', isActive ? 'border-white' : 'border-r-green'].join(' ')}
      />
      <CampaignsNodeTriangle
        className={['scale-x-[-1] top-[36px] -right-[19px] border-r-white', isActive ? 'border-r-green-bg-light' : 'border-r-white'].join(' ')}
      />
      <CampaignsNodeTriangle
        className={['scale-x-[-1] scale-y-[-1] top-0 -right-[19px]', isActive ? 'border-r-green-bg-light' : 'border-r-white'].join(' ')}
      />
      <div className="absolute -top-2 -left-2 h-4 w-4 bg-white z-10">
        <InstagramIcon className="h-4 w-auto" />
      </div>
      <div className="flex items-center text-sm mb-0.5 justify-center xs:justify-start">
        {isActive && <HeartIcon className="h-3 w-auto mr-1 flex-shrink-0" />}
        <strong>{isActive ? 'Engagements' : '+ Add campaign'}</strong>
      </div>
      {isActive ? (
        <div className="flex justify-center">
          <div className="flex flex-col w-1/3 xs:w-auto items-center mr-2 text-xs bg-green-bg-dark p-1 rounded-dialogue">
            <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">{engagementRate}%</div>
            <div className="text-[8px]">eng. rate</div>
          </div>
          <div className="flex flex-col w-1/3 xs:w-auto items-center text-xs bg-green-bg-dark p-1 rounded-dialogue">
            <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">£{costPerEngagement}</div>
            <div className="text-[8px]">per eng.</div>
          </div>
        </div>
      ) : (
        <p className="mb-0 text-xs">Encourage people to visit your profile.</p>
      )}
      {handlers.map((handler) => (
        <CampaignsNodeConnector
          key={handler.anchor.position}
          node={node}
          handler={handler}
          nodeRef={nodeRef}
          className="bg-green-bg-dark"
        />
      ))}
    </div>
  )
}

CampaignsNodeCampaign.propTypes = {
  node: PropTypes.object.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default CampaignsNodeCampaign
