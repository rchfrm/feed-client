import React from 'react'
import CampaignResultsMetrics from '@/app/CampaignResultsMetrics'
import CampaignResultsChart from '@/app/CampaignResultsChart'

const CampaignResults: React.FC = () => {
  // TODO (Campaign detail page): Format and pass campaign data to metrics and chart components
  return (
    <>
    <CampaignResultsMetrics />
    <CampaignResultsChart />
    </>
  )
}

export default CampaignResults
