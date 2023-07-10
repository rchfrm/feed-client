import React from 'react'
import CampaignHeader from '@/app/CampaignHeader'
import CampaignTabs from '@/app/CampaignTabs'
import CampaignMetrics from '@/app/CampaignMetrics'
import CampaignChart from '@/app/CampaignChart'

const Campaign = ({ id }) => {
  return (
    <>
      <div>Campaign {id}</div>
      <CampaignHeader />
      <CampaignTabs />
      <CampaignMetrics />
      <CampaignChart />
    </>
  )
}

export default Campaign
