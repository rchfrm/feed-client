import React from 'react'
import CampaignHeader from '@/app/CampaignHeader'
import CampaignTabs from '@/app/CampaignTabs'
import CampaignMetrics from '@/app/CampaignMetrics'
import CampaignChart from '@/app/CampaignChart'

interface CampaignProps {
  id: string
}

const Campaign: React.FC<CampaignProps> = ({ id }) => {
  // eslint-disable-next-line no-console
  console.log(id)

  return (
    <>
      <CampaignHeader />
      <CampaignTabs />
      <CampaignMetrics />
      <CampaignChart />
    </>
  )
}

export default Campaign
