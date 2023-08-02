import HeartIcon from '@/icons/HeartIcon'
import React from 'react'
import ChainLinkedIcon from '@/icons/ChainLinkedIcon'
import { capitalise } from '@/helpers/utils'
import PauseIcon from '@/icons/PauseIcon'

interface CampaignsNodeCampaignHeaderProps {
  isActive: boolean
  campaignType: string
}

const CampaignsNodeCampaignHeader: React.FC<CampaignsNodeCampaignHeaderProps> = ({
  isActive,
  campaignType,
}) => {
  const icon = campaignType === 'engagement'
    ? <HeartIcon className="h-3 w-auto mr-1 flex-shrink-0" />
    : <ChainLinkedIcon className="h-3 w-auto mr-1 flex-shrink-0" />

  const pauseIcon = <PauseIcon className="h-4 w-auto mr-0.5 flex-shrink-0" />

  const campaignObjective = capitalise(campaignType)

  return (
    <div className="flex items-center justify-start w-full">
      {isActive ? icon : pauseIcon}
      <p
        className={[
          'mb-0',
          isActive ? 'font-bold' : '',
          ! isActive ? 'text-grey-dark' : '',
        ].join(' ')}
      >
        {campaignObjective}
      </p>
    </div>
  )
}

export default CampaignsNodeCampaignHeader
