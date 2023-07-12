import React from 'react'
import CampaignHeader from '@/app/CampaignHeader'
import CampaignTabs from '@/app/CampaignTabs'
import CampaignResults from '@/app/CampaignResults'

interface CampaignProps {
  id: string
}

const Campaign: React.FC<CampaignProps> = ({ id }) => {
  const [tab, setTab] = React.useState('results')
  // eslint-disable-next-line no-console
  console.log(id)

  const components = {
    results: <CampaignResults />,
    ads: <div>Ads</div>,
    audiences: <div>Audiences</div>
  }

  return (
    <>
      <CampaignHeader />
      <CampaignTabs tab={tab} setTab={setTab} />
      {components[tab]}
    </>
  )
}

export default Campaign
