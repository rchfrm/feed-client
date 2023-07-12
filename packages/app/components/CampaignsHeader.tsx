import React from 'react'
import { Campaign } from '../types/api'


interface CampaignsHeaderProps {
  campaigns: Campaign[]
}
const CampaignsHeader: React.FC<CampaignsHeaderProps> = ({
  campaigns,
}) => {
  // eslint-disable-next-line no-console
  console.log(campaigns)

  return (
    <>
      <h1>Your campaigns</h1>
    </>
  )
}

export default CampaignsHeader
