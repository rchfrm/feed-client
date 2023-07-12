import React from 'react'
import CampaigNode from '@/app/CampaigNode'

const CampaignNodes: React.FC = () => {
  return (
    <div className="w-full flex justify-center">
      <CampaigNode type="audience" label="Engaged on Instagram in the last year" />
      <CampaigNode type="campaign" label="Engagement campaign" className="flex items-center mx-20 pr-4" />
      <CampaigNode type="audience" label="Engaged on Instagram in the last month" />
    </div>
  )
}

export default CampaignNodes
