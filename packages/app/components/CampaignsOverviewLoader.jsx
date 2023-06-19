import React from 'react'
import { Position } from 'reactflow'
import CampaignsOverview from '@/app/CampaignsOverview'
import CampaignsOverviewHeader from '@/app/CampaignsOverviewHeader'
import CampaignsOverviewAudienceNode from '@/app/CampaignsOverviewAudienceNode'
import CampaignsOverviewCampaignNode from '@/app/CampaignsOverviewCampaignNode'
import 'reactflow/dist/style.css'

// const audiences = [
//   {
//     type: 'look_alike',
//     platform: 'instagram',
//     engaged: 494000,
//   },
//   {
//     type: 'on_platform',
//     platform: 'instagram',
//     engaged: 118000,
//     retentionDays: 360,
//   },
//   {
//     type: 'on_platform',
//     platform: 'instagram',
//     engaged: 75000,
//     retentionDays: 30,
//   },
// ]

// const campaigns = [
//   {
//     engagementRate: 8.8,
//     costPerEngagement: 0.055,
//   },
//   {
//     engagementRate: 7.2,
//     costPerEngagement: 0.073,
//   },
// ]

const initialNodes = [
  {
    id: '1',
    type: 'audience',
    position: { x: 10, y: 50 },
    targetPosition: 'hidden',
    sourcePosition: Position.Bottom,
    data: {
      audienceType: 'lookalike',
      target: '4',
      label: <p className="mb-0"><strong>494k</strong> similar to your Instagram followers</p>,
    },
  },
  {
    id: '2',
    type: 'audience',
    position: { x: 320, y: 50 },
    targetPosition: Position.Left,
    sourcePosition: Position.Bottom,
    data: {
      audienceType: 'custom',
      target: '5',
      label: <p className="mb-0"><strong>118k</strong> engaged on Instagram in last year</p>,
    },
  },
  {
    id: '3',
    type: 'audience',
    position: { x: 630, y: 50 },
    targetPosition: Position.Left,
    sourcePosition: 'hidden',
    data: {
      audienceType: 'custom',
      label: <p className="mb-0"><strong>75k</strong> engaged on Instagram last month</p>,
    },
  },
  {
    id: '4',
    type: 'campaign',
    position: { x: 110, y: 175 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: {
      target: '2',
      engagementRate: 8.8,
      costPerEngagement: 0.055,
    },
  },
  {
    id: '5',
    type: 'campaign',
    position: { x: 420, y: 175 },
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
    data: {
      target: '3',
      engagementRate: 7.2,
      costPerEngagement: 0.073,
    },
  },
]

const initialEdges = [
  {
    id: 'e1-4',
    source: '1',
    target: '4',
  },
  {
    id: 'e4-2',
    source: '4',
    target: '2',
  },
  {
    id: 'e2-5',
    source: '2',
    target: '5',
  },
  {
    id: 'e5-3',
    source: '5',
    target: '3',
  },
]

const nodeTypes = {
  audience: CampaignsOverviewAudienceNode,
  campaign: CampaignsOverviewCampaignNode,
}

const defaultEdgeOptions = {
  type: 'step',
  style: {
    stroke: '#5B82FB',
    strokeWidth: '2px',
    strokeDasharray: '5px',
    opacity: 0.2,
  },
}

const CampaignsOverviewLoader = () => {
  return (
    <>
      <CampaignsOverviewHeader />
      <CampaignsOverview
        initialNodes={initialNodes}
        nodeTypes={nodeTypes}
        initialEdges={initialEdges}
        defaultEdgeOptions={defaultEdgeOptions}
      />
    </>
  )
}

export default CampaignsOverviewLoader
