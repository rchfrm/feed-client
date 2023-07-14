import { Platform } from '@/app/types/api'

export enum OverviewNodeType {
  AUDIENCE = 'audience',
  CAMPAIGN = 'campaign',
}

export enum OverviewNodeSubType {
  CUSTOM = 'custom',
  LOOKALIKE = 'lookalike',
}

export interface OverviewNode {
  type: OverviewNodeType
  subType?: OverviewNodeSubType
  label: string
  platform?: Platform
  engagementRate?: number,
  costPerEngagement?: number,
}

export interface OverviewNodeGroup {
  id: string
  type: OverviewNodeType
  subType: OverviewNodeSubType
  isActive: boolean
  nodes: OverviewNode[]
  handlers: OverviewNodeGroupHandler[]
}

export enum OverviewNodeGroupHandleType {
  TARGET = 'target',
  SOURCE = 'source',
}

interface OverviewNodeGroupHandler {
  type: OverviewNodeGroupHandleType
  position: 'top' | 'right' | 'bottom' | 'left'
}

export interface Edge {
  type: string,
  source: string,
  target: string,
  isActive: boolean,
}
