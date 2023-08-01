import { Nullable } from '@/types/common'
import { Dictionary } from 'ts-essentials'

export enum Platform {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  SPOTIFY = 'spotify',
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
  platform: Platform
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

export interface AdSet {
  artist_id: string
  attribution_spec: Dictionary<any>[]
  budget_remaining: string
  campaign_id: string
  created_at: Date
  daily_budget: string
  daily_min_spend_target: string
  effective_status: string
  id: string
  identifier: string
  is_deleted: boolean
  is_enabled: boolean
  is_external: boolean
  lifetime_metrics: Dictionary<AdSetInsightsLifetimeResponse>
  metrics: Dictionary<AdSetInsightsDailyResponse>
  name: string
  next_recovery_check_at: Nullable<Date>
  optimization_goal: string
  performance_criteria_check_failed_at: Nullable<Date>
  platform_created_time: Date
  platform_id: string
  platform_updated_time: Date
  promoted_object: PromotedObject
  should_be_recreated: boolean
  start_time: Date
  started_running_at: Nullable<Date>
  status: string
  targeting: TargetingResponse
  updated_at: string
}

export interface AdSetWithPlatform extends AdSet {
  platform: Platform
}

export interface AdInsightsDailyResponse {
  date_start: string
  date_stop: string
  actions?: AdActions
  action_values?: AdActions
  impressions?: string
  clicks?: Dictionary<string>
  outbound_clicks?: Dictionary<string>
  spend?: string
  video_thruplay_watched_actions?: Dictionary<string>
  unique_outbound_clicks?: Dictionary<string>
  unique_inline_link_clicks?: string
}

export interface AdActions {
  onsite_conversion: {
    post_save: string
  }
  page_engagement: string
  post_engagement: string
  post_reaction: string
  video_view: string
  posts: string
  comment: string
}

export type AdSetInsightsDailyResponse = AdInsightsDailyResponse

export interface AdInsightsLifetimeResponse {
  date_start: string
  date_stop: string
  cpc?: string
  cpm?: string
  cpp?: string
  ctr?: string
  cost_per_10_sec_video_view?: Dictionary<string>
  cost_per_thruplay?: Dictionary<string>
  cost_per_unique_click?: string
  frequency?: string
  reach?: string
  cost_per_action_type?: Dictionary<string>
  cost_per_unique_outbound_click?: Dictionary<string>
  cost_per_unique_inline_link_click?: string
}

export type AdSetInsightsLifetimeResponse = AdInsightsLifetimeResponse

export type ITikTokMetrics = Record<string, string>

export interface PromotedObject {
  pixel_id: string
  custom_event_type: string
}

export interface TargetingResponse {
  age_max: number
  age_min: number
  excluded_connections?: IdName[]
  excluded_custom_audiences?: IdName[]
  custom_audiences?: IdName[]
  flexible_spec?:
    ({
      [key: string]: IdName[]
    } | {
      interests: IdName[]
    })[]
  genders?: number[]
  geo_locations: {
    cities?: {
      country?: string
      distance_unit?: string
      key: string
      name?: string
      radius?: number
      region?: string
      region_id?: string
    }[]
    countries?: string[]
    country_groups?: string[]
    location_types: string[]
  }
  targeting_optimization: string
  publisher_platforms?: string[]
  facebook_positions?: FacebookPositions[]
  instagram_positions?: InstagramPositions[]
  messenger_positions?: MessengerPositions[]
  device_platforms?: string[]
  brand_safety_content_filter_levels?: string[]
}

export type TargetingInterest = {
  id: number
  isActive: boolean
  platformId: string
  platform: string
  name: string
}

interface IdName {
  id: string
  name: string
}

export type FacebookPositions =
  'feed' |
  'groups_feed' |
  'instant_article' |
  'marketplace' |
  'right_hand_column' |
  'search' |
  'story' |
  'video_feeds'

export type InstagramPositions =
  'stream' |
  'story' |
  'explore' |
  'reels'

export type MessengerPositions =
  'messenger_home' |
  'sponsored_messages' |
  'story'

export interface Audience {
  approximate_count: number
  artist_id: string
  created_at: Date
  events: (FacebookPixelEvent | AudienceEvent)[]
  id: string
  is_current: boolean
  is_deleted: boolean
  name: string
  platform: Platform
  platform_account_id: string
  platform_id: string
  retention_days: RetentionPeriods
  rule: CustomAudienceRule
  subtype?: string
  updated_at: Date
}

export enum FacebookPixelEvent {
  COMPLETE_REGISTRATION = 'CompleteRegistration',
  CONTACT = 'Contact',
  LEAD = 'Lead',
  PURCHASE = 'Purchase',
  SUBSCRIBE = 'Subscribe',
  VIEW_CONTENT = 'ViewContent',
  // internal
  PAGE_VIEW = 'PageView'
}

export enum FollowerAudienceEvent {
  INSTAGRAM_FOLLOWERS = 'INSTAGRAM_PROFILE_FOLLOW',
}

export enum IgEngagerAudienceEvent {
  INSTAGRAM_ENGAGERS = 'ig_business_profile_all',
}

export enum IgPaidCommenterAudienceEvent {
  INSTAGRAM_AD_COMMENTERS = 'ig_ad_comment',
  INSTAGRAM_AD_SHARERS = 'ig_ad_share',
}

export enum IgOrganicCommenterAudienceEvent {
  INSTAGRAM_ORGANIC_COMMENTERS = 'ig_organic_comment',
  INSTAGRAM_ORGANIC_SHARERS = 'ig_organic_share',
}

export type IgCommenterAudienceEvent = IgPaidCommenterAudienceEvent | IgOrganicCommenterAudienceEvent

export enum FbEngagerAudienceEvent {
  FACEBOOK_ENGAGERS = 'page_engaged',
}

export type AudienceEvent = FollowerAudienceEvent | IgEngagerAudienceEvent | IgCommenterAudienceEvent | FbEngagerAudienceEvent

export enum RetentionPeriods {
  NONE = 0,
  WEEK = 7,
  DAYS_28 = 28,
  MONTH = 30,
  DAYS_180 = 180,
  YEAR = 365,
  YEAR_2 = 730, // Shows error in Ads Manager, but API accepts it
}

export interface CustomAudienceRule {
  inclusions: {
    operator: string
    rules: {
      event_sources: {
        type: string
        id: string
        owner_id: string
      }[]
      retention_seconds: number
      filter: {
        operator: string
        filters: {
          field: string
          operator: string
          value: string
        }[]
      }
    }[]
  }[]
}

export interface Lookalike {
  approximate_count: number
  artist_id: string
  audience_id: string
  countries: string[]
  countries_text: string
  created_at: Date
  id: string
  is_deleted: boolean
  is_imported: boolean
  lookalike_spec: LookalikeSpec
  name: string
  platform_id: string
  ratio: number
  subtype: string
  updated_at: Date
}

export interface LookalikeWithPlatform extends Lookalike {
  platform: Platform
}

export interface LookalikeSpec {
  country: string
  origin: LookalikeSpecOrigin[]
  ratio: number
  type: string
}

export interface LookalikeSpecOrigin {
  id: string
  name: string
  type: string
}

export interface DataSourceResponse {
  id: string
  artist_id: string
  name: string
  platform: Nullable<Platform>
  period: Nullable<string>
  title: Nullable<string>
  description: Nullable<string>
  daily_data: IDataSourceData
}

export type DataType = number | string | Dictionary<number> | Dictionary<string>

export interface IDataSourceData<T = DataType> {
  [key: string]: T
}
