import React from 'react'
import useAsyncEffect from 'use-async-effect'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import { getAudiences, getCampaigns } from '@/app/helpers/campaignsHelpers'
import { ArtistContext } from '@/app/contexts/ArtistContext'

const initialNodes = [
  {
    id: '1',
    type: 'audience',
    position: { x: 10, y: 10 },
    target: '5',
    order: '1',
    data: {
      audienceType: 'lookalike',
      label: <p className="mb-0"><strong>494k</strong> similar to your Instagram followers</p>,
    },
    isActive: true,
    handlers: [
      {
        type: 'source',
        position: 'bottom',
      },
    ],
  },
  {
    id: '2',
    type: 'audience',
    position: { x: 320, y: 10 },
    target: '6',
    order: '3',
    data: {
      audienceType: 'custom',
      label: <p className="mb-0"><strong>118k</strong> engaged on Instagram in last year</p>,
    },
    isActive: false,
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
      {
        type: 'source',
        position: 'bottom',
      },
    ],
  },
  {
    id: '3',
    type: 'audience',
    position: { x: 630, y: 10 },
    target: '7',
    order: '5',
    data: {
      audienceType: 'custom',
      label: <p className="mb-0"><strong>75k</strong> engaged on Instagram last month</p>,
    },
    isActive: false,
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
      {
        type: 'source',
        position: 'bottom',
      },
    ],
  },
  {
    id: '4',
    type: 'audience',
    position: { x: 940, y: 10 },
    target: '0',
    order: '7',
    data: {
      audienceType: 'custom',
      label: <p className="mb-0"><strong>24k</strong> followers on Instagram</p>,
    },
    isActive: false,
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
    ],
  },
  {
    id: '5',
    type: 'campaign',
    position: { x: 90, y: 135 },
    target: '2',
    order: '2',
    data: {
      engagementRate: 8.8,
      costPerEngagement: 0.055,
    },
    isActive: false,
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
      {
        type: 'source',
        position: 'right',
      },
    ],
  },
  {
    id: '6',
    type: 'campaign',
    position: { x: 400, y: 135 },
    target: '3',
    order: '4',
    data: {
      engagementRate: 7.9,
      costPerEngagement: 0.061,
    },
    isActive: false,
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
      {
        type: 'source',
        position: 'right',
      },
    ],
  },
  {
    id: '7',
    type: 'campaign',
    position: { x: 710, y: 135 },
    target: '4',
    order: '6',
    data: {
      engagementRate: 7.2,
      costPerEngagement: 0.073,
    },
    isActive: false,
    handlers: [
      {
        type: 'target',
        position: 'left',
      },
      {
        type: 'source',
        position: 'right',
      },
    ],
  },
]

const initialEdges = [
  { source: '1', target: '5', isActive: false },
  { source: '5', target: '2', isActive: false },
  { source: '2', target: '6', isActive: false },
  { source: '6', target: '3', isActive: false },
  { source: '3', target: '7', isActive: false },
  { source: '7', target: '4', isActive: false },
]

const CampaignsLoader = () => {
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    const { res1, error1 } = await getAudiences(artistId)
    if (! isMounted()) return

    if (error1) {
      return
    }

    // eslint-disable-next-line
    console.log(res1)

    const { res2, error2 } = await getCampaigns(artistId)
    if (! isMounted()) return

    if (error2) {
      return
    }

    // eslint-disable-next-line
    console.log(res2)

    // const { res3, error3 } = await getAdSets(artistId, campaignId)
    // if (! isMounted()) return

    // if (error3) {
    //   return
    // }

    // // eslint-disable-next-line
    // console.log(res3)
  }, [])

  return (
    <div onDragOver={(e) => e.preventDefault()}>
      <CampaignsHeader />
      <Campaigns
        initialNodes={initialNodes}
        initialEdges={initialEdges}
      />
    </div>
  )
}

export default CampaignsLoader
