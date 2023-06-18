import React from 'react'
import PropTypes from 'prop-types'
import { Handle } from 'reactflow'
import CampaignsOverviewCampaignNodeTriangle from '@/app/CampaignsOverviewCampaignNodeTriangle'
import HeartIcon from '@/icons/HeartIcon'
import InstagramIcon from '@/icons/InstagramIcon'

const CampaignsOverviewCampaignNode = ({
  id,
  data,
  sourcePosition,
  targetPosition,
}) => {
  const { engagementRate, costPerEngagement, isActive } = data || {}

  return (
    <div className={[
      'flex flex-col',
      'w-40 pl-4 p-3',
      'text-sm rounded-dialogue',
      isActive ? 'bg-green-bg-light' : 'bg-offwhite',
    ].join(' ')}
    >
      <div className="absolute -top-2 -left-7 h-4 w-4 bg-white z-10">
        <InstagramIcon className="h-4 w-auto" />
      </div>
      <CampaignsOverviewCampaignNodeTriangle className={['top-0 -left-[23px]', isActive ? 'border-r-black' : 'border-r-grey-light'].join(' ')} />
      <CampaignsOverviewCampaignNodeTriangle className={['scale-y-[-1] top-[39px] -left-[23px]', isActive ? 'border-r-black' : 'border-r-grey-light'].join(' ')} />
      <CampaignsOverviewCampaignNodeTriangle
        isActive={isActive}
        className="top-0 -left-[21px] border-r-offwhite"
        activeClass="!border-r-green-bg-light"
      />
      <CampaignsOverviewCampaignNodeTriangle
        isActive={isActive}
        className="scale-y-[-1] top-[39px] -left-[21px] border-r-offwhite"
        activeClass="!border-r-green-bg-light"
      />
      <CampaignsOverviewCampaignNodeTriangle className="top-0 right-0 border-r-white" />
      <CampaignsOverviewCampaignNodeTriangle className="scale-y-[-1] top-[39px] right-0 border-r-white" />
      <div className="flex items-center mb-2">
        <HeartIcon className="h-4 w-auto mr-1" />
        <strong>Engagements</strong>
      </div>
      <div className="flex">
        <div className="flex flex-col mr-2 text-xs">
          <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">{engagementRate}%</div>
          <div className="text-[8px]">eng. rate</div>
        </div>
        <div className="flex flex-col text-xs">
          <div className="-mb-0.5 text-green-dark text-xs -mb-1 font-bold">£{costPerEngagement}</div>
          <div className="text-[8px]">per eng.</div>
        </div>
      </div>
      <Handle
        type="source"
        id={`source-${id}`}
        position={sourcePosition}
        isValidConnection={(connection) => connection.target === data.target}
        className={['!w-2 !h-2', isActive ? '!bg-green-bg-light' : '!bg-grey-light'].join(' ')}
      />
      <Handle
        type="target"
        id={`target-${id}`}
        position={targetPosition}
        className={['!w-2 !h-2', isActive ? '!bg-green-bg-light' : '!bg-grey-light'].join(' ')}
      />
    </div>
  )
}

CampaignsOverviewCampaignNode.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object,
  sourcePosition: PropTypes.string.isRequired,
  targetPosition: PropTypes.string.isRequired,
}

CampaignsOverviewCampaignNode.defaultProps = {
  data: null,
}

export default CampaignsOverviewCampaignNode
