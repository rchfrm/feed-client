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
  lookalikesOrInterest: '0',
  interests: '0-0',
  lookalikes: '0-1',
  interestsEngage: '1-0',
  enticeEngage: '1-1',
  enticeTraffic: '1-2',
  engaged1Y: '2-0',
  remindTraffic: '3-0',
  engaged28D: '4-0',
  igFollowers: '6-0',
  enticeLanding: '7',
  websiteVisitors: '8',
  remindEngage: '9-0',
  remindLanding: '11',
  remindConversions: '13',
  offPlatform: '15',
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

export interface OverviewNodeEngageAdSet extends OverviewNodeBase {
  engagementRate: number
  costPerEngagement: number
}

export interface OverviewNodeTrafficAdSet extends OverviewNodeBase {
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
