import { Platform } from '@/app/types/api'
import { ObjectValues } from '@/types/common'

export enum OverviewNodeType {
  AUDIENCE = 'audience',
  CAMPAIGN = 'campaign',
}

export enum OverviewNodeSubType {
  CUSTOM = 'custom',
  LOOKALIKE = 'lookalike',
  INTERESTS = 'interests',
  CREATE = 'create',
}

export const NODE_INDEXES = {
  INTERESTS: '0-0',
  LOOKALIKES: '0-1',
  INTERESTS_ENGAGE: '1-0',
  ENTICE_ENGAGE: '1-1',
  ENTICE_TRAFFIC: '1-2',
  ENGAGED_1Y: '2-0',
  REMIND_TRAFFIC: '3-0',
  ENGAGED_28D: '4-0',
  INSTAGRAM_FOLLOWERS: '6-0',
  ENTICE_LANDING: '7',
  WEBSITE_VISITORS: '8',
  REMIND_ENGAGE: '9-0',
  REMIND_LANDING: '11',
  REMIND_CONVERSIONS: '13',
  OFF_PLATFORM: '15',
} as const
export type NodeIndexes = ObjectValues<typeof NODE_INDEXES>;

export interface OverviewNodeBase {
  type: OverviewNodeType
  subType?: OverviewNodeSubType
  index: NodeIndexes
  label: string
  position?: {
    x: number
    y: number
  }
  isActive: boolean
}

export interface OverviewNodeAudience extends OverviewNodeBase {
  platforms: Platform[]
}

export interface OverviewNodeCampaign extends OverviewNodeBase {
  lastAdSpendDate: Date
}

export interface OverviewNodeEngageAdSet extends OverviewNodeCampaign {
  engagementRate: number
  costPerEngagement: number
}

export interface OverviewNodeTrafficAdSet extends OverviewNodeCampaign {
  ctr: number
  cpc: number
}

export type OverviewNode = OverviewNodeEngageAdSet | OverviewNodeTrafficAdSet

export interface OverviewPeriod {
  start?: Date
  end?: Date
}

export interface OverviewNodeGroup {
  id: string
  type: OverviewNodeType
  subType: OverviewNodeSubType
  isActive: boolean
  nodes: OverviewNodeBase[]
  handlers: OverviewNodeGroupHandler[]
}

export enum OverviewNodeGroupHandleType {
  TARGET = 'target',
  SOURCE = 'source',
}

export interface OverviewNodeGroupHandler {
  type: OverviewNodeGroupHandleType
  position: 'top' | 'right' | 'bottom' | 'left'
}

export interface Edge {
  type: 'group',
  source: string,
  target: string,
  isActive: boolean,
}
