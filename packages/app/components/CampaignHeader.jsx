import React from 'react'
import CampaignBackButton from '@/app/CampaignBackButton'
import CampaignNodes from '@/app/CampaignNodes'

const CampaignHeader = () => {
  return (
    <div className="flex mb-10">
      <CampaignBackButton />
      <CampaignNodes />
    </div>
  )
}

export default CampaignHeader
