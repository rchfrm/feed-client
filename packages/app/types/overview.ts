import { Platform } from '@/app/types/api'

export enum OverviewNodeType {
  AUDIENCE = 'audience',
  CAMPAIGN = 'campaign',
}

export enum OverviewNodeSubType {
  CUSTOM = 'custom',
  LOOKALIKE = 'lookalike',
  CREATE = 'create',
}

export interface OverviewNodeBase {
  type: OverviewNodeType
  subType?: OverviewNodeSubType
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
