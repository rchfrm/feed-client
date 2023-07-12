import React from 'react'
import CampaigNode from '@/app/CampaigNode'

const CampaignNodes: React.FC = () => {
  return (
    <div className="relative w-full flex justify-center">
      <div className="hidden md:block top-1/2 left-0 w-1/4 absolute block h-[1px] border-t-2 border-dashed border-grey-light" />
      <div className="top-1/2 w-full md:w-1/2 absolute block h-[1px] border-t-2 border-dashed border-gradient-2-dark" />
      <div className="hidden md:block top-1/2 right-0 w-1/4 absolute block h-[1px] border-t-2 border-dashed border-grey-light" />
      <CampaigNode type="audience" label="Engaged on Instagram in the last year" className="hidden md:block" />
      <CampaigNode type="campaign" label="Engagement campaign" className="flex items-center mx-20 pr-4" />
      <CampaigNode type="audience" label="Engaged on Instagram in the last month" className="hidden md:block" />
    </div>
  )
}

export default CampaignNodes
