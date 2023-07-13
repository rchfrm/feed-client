import React from 'react'
import { Campaign } from '@/app/types/api'


interface CampaignsHeaderProps {
  campaigns: Campaign[]
}
const CampaignsHeader: React.FC<CampaignsHeaderProps> = ({
  campaigns,
}) => {
  return (
    <>
      <h1>Your campaigns</h1>
    </>
  )
}

export default CampaignsHeader
