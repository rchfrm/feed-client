import React from 'react'
import useAsyncEffect from 'use-async-effect'
import Campaigns from '@/app/Campaigns'
import CampaignsHeader from '@/app/CampaignsHeader'
import { getAudiences, getCampaigns } from '@/app/helpers/campaignsHelpers'
import { ArtistContext } from '@/app/contexts/ArtistContext'

const initialNodes = [
  {
    id: '1',
    order: '1',
    target: '5',
    position: { x: 10, y: 0 },
    type: 'audience',
    isActive: true,
    handlers: [
      {
        type: 'source',
        anchor: {
          position: 'bottom',
          offset: { x: -41 },
        },
      },
    ],
  },
  {
    id: '2',
    order: '3',
    target: '6',
    position: { x: 320, y: 0 },
    type: 'audience',
    isActive: false,
    handlers: [
      {
        type: 'target',
        anchor: {
          position: 'left',
          offset: { x: 0 },
        },
      },
      {
        type: 'source',
        anchor: {
          position: 'bottom',
          offset: { x: -41 },
        },
      },
    ],
  },
  {
    id: '3',
    order: '5',
    target: '7',
    position: { x: 630, y: 0 },
    type: 'audience',
    isActive: false,
    handlers: [
      {
        type: 'target',
        anchor: {
          position: 'left',
          offset: { x: 0 },
        },
      },
      {
        type: 'source',
        anchor: {
          position: 'bottom',
          offset: { x: -41 },
        },
      },
    ],
  },
  {
    id: '4',
    order: '7',
    target: '0',
    position: { x: 940, y: 0 },
    type: 'audience',
    isActive: false,
    handlers: [
      {
        type: 'target',
        anchor: {
          position: 'left',
          offset: { x: 0 },
        },
      },
    ],
  },
  {
    id: '5',
    order: '2',
    target: '2',
    position: { x: 90, y: 125 },
    type: 'campaign',
    isActive: false,
    handlers: [
      {
        type: 'target',
        anchor: {
          position: 'left',
          offset: { x: 0 },
        },
      },
      {
        type: 'source',
        anchor: {
          position: 'right',
          offset: { x: 0 },
        },
      },
    ],
  },
  {
    id: '6',
    order: '4',
    target: '3',
    position: { x: 400, y: 125 },
    type: 'campaign',
    isActive: false,
    handlers: [
      {
        type: 'target',
        anchor: {
          position: 'left',
          offset: { x: 0 },
        },
      },
      {
        type: 'source',
        anchor: {
          position: 'right',
          offset: { x: 0 },
        },
      },
    ],
  },
  {
    id: '7',
    order: '6',
    target: '4',
    position: { x: 710, y: 125 },
    type: 'campaign',
    isActive: false,
    handlers: [
      {
        type: 'target',
        anchor: {
          position: 'left',
          offset: { x: 0 },
        },
      },
      {
        type: 'source',
        anchor: {
          position: 'right',
          offset: { x: 0 },
        },
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
    <>
      <CampaignsHeader />
      <Campaigns
        initialNodes={initialNodes}
        initialEdges={initialEdges}
        // nodeTypes={nodeTypes}
      />
    </>
  )
}

export default CampaignsLoader
