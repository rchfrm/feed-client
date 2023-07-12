export enum Platforms {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
}

export type SpecialAdCategory = 'HOUSING' | 'CREDIT' | 'EMPLOYMENT' | 'NONE'

export enum AccurateCampaignType {
  VIDEO_VIEWS = 'video_views',
  ENGAGEMENT = 'engagement',
  TRAFFIC = 'traffic',
  LANDING_PAGE_VIEWS = 'landing_page_views',
  CONVERSIONS = 'conversions',
}

enum LegacyCampaignType {
  ENTICE = 'entice',
  REMIND = 'remind',
}

export interface Campaign {
  artist_id: string
  budget_remaining: string
  created_at: Date
  daily_budget: string
  effective_status: string
  id: string
  is_current: boolean
  is_deleted: boolean
  is_external: boolean
  name: string
  objective: string
  platform: Platforms
  platform_account_id: string
  platform_created_time: string
  platform_id: string
  platform_updated_time: Date
  special_ad_categories: SpecialAdCategory[]
  special_ad_category: SpecialAdCategory
  start_time: Date
  status: string
  type: AccurateCampaignType | LegacyCampaignType
  updated_at: Date
}
