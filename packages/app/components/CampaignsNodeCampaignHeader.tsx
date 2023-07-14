import HeartIcon from '@/icons/HeartIcon'
import React from 'react'
import ChainLinkedIcon from '@/icons/ChainLinkedIcon'

interface CampaignsNodeCampaignHeaderProps {
  isActive: boolean
  isTrafficCampaign: boolean
}

const CampaignsNodeCampaignHeader: React.FC<CampaignsNodeCampaignHeaderProps> = ({
  isActive,
  isTrafficCampaign,
}) => {
  const icon = isTrafficCampaign
    ? <ChainLinkedIcon className="h-3 w-auto mr-1 flex-shrink-0" />
    : <HeartIcon className="h-3 w-auto mr-1 flex-shrink-0" />

  const campaignObjective = isTrafficCampaign ? 'Clicks' : 'Engagements'

  return (
    <div className="flex items-center justify-start w-full">
      {isActive && icon}
      <p className="mb-0 font-bold">{campaignObjective}</p>
    </div>
  )
}

export default CampaignsNodeCampaignHeader
