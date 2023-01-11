import get from 'lodash/get'
import moment from 'moment'
import slugify from 'slugify'

import * as server from '@/app/helpers/appServer'
import * as utils from '@/helpers/utils'
import { requestWithCatch } from '@/helpers/api'
import brandColors from '@/constants/brandColors'

// TRANSLATE PROMOTION NAME
export const translatePromotionName = (promotionStatus, format) => {
  let title
  switch (promotionStatus) {
    case 'active':
      title = 'running'
      break
    case 'inactive':
      title = 'not run'
      break
    case 'archived':
      title = 'inactive'
      break
    default:
      title = promotionStatus
  }
  if (format === 'capitalize') return utils.capitalise(title)
  if (format === 'slugify') return slugify(title)
  return title
}

// POST TYPE FILTERS
export const postTypes = [
  {
    id: 'all',
    title: translatePromotionName('all', 'capitalize'),
    slug: translatePromotionName('all', 'slugify'),
    color: brandColors.black,
    activeTextColor: brandColors.white,
  },
  {
    id: 'active',
    title: translatePromotionName('active', 'capitalize'),
    slug: translatePromotionName('active', 'slugify'),
    color: brandColors.green,
    activeTextColor: brandColors.white,
  },
  {
    id: 'archived',
    title: translatePromotionName('archived', 'capitalize'),
    slug: translatePromotionName('archived', 'slugify'),
    color: brandColors.black,
    activeTextColor: brandColors.white,
  },
  {
    id: 'inactive',
    title: translatePromotionName('inactive', 'capitalize'),
    slug: translatePromotionName('inactive', 'slugify'),
    color: brandColors.greyDark,
    activeTextColor: brandColors.white,
  },
]

// POST SORT TYPES
export const sortTypes = [
  {
    id: 'published_time',
    slug: 'published_time',
    title: 'Date',
    color: brandColors.black,
    activeTextColor: 'white',
  },
  {
    id: 'normalized_score',
    slug: 'normalized_score',
    title: 'Score',
    color: brandColors.black,
    activeTextColor: 'white',
  },
]

export const filters = ['promotion_status', 'platform', 'internal_type', 'promotion_enabled']

export const promotionStatusSlugs = {
  active: 'active',
  inReview: 'in_review',
  inActive: 'archived',
  rejected: 'rejected',
  notRun: 'inactive',
}

export const promotionStatus = [
  {
    slug: promotionStatusSlugs.active,
    title: 'Running',
  },
  {
    slug: promotionStatusSlugs.inReview,
    title: 'In Review',
  },
  {
    slug: promotionStatusSlugs.inActive,
    title: 'Inactive',
  },
  {
    slug: promotionStatusSlugs.rejected,
    title: 'Rejected',
  },
  {
    slug: promotionStatusSlugs.notRun,
    title: 'Not Run',
  },
]

export const filterTypes = [
  {
    slug: 'promotion_status',
    title: 'Status',
    options: promotionStatus,
  },
  {
    slug: 'platform',
    title: 'Platform',
    options: [
      {
        slug: 'facebook',
        title: 'Facebook',
      },
      {
        slug: 'instagram',
        title: 'Instagram',
      },
    ],
  },
  {
    slug: 'internal_type',
    title: 'Post Type',
    options: [
      {
        slug: 'post',
        title: 'Post',
      },
      {
        slug: 'story',
        title: 'Story',
      },
      {
        slug: 'reels',
        title: 'Reels',
      },
    ],
  },
  {
    slug: 'promotion_enabled',
    title: 'Promotable',
    options: [
      {
        slug: true,
        title: 'Yes',
      },
      {
        slug: false,
        title: 'No',
      },
    ],
  },
]

// CAMPAIGN TYPES
export const campaignTypes = [
  {
    title: 'Grow & Nurture',
    slug: 'all',
  },
  {
    title: 'Sales',
    slug: 'conversions',
  },
]

// DUMMY POST DATA
export const dummyPosts = [
  {
    publishedTime: moment(),
    platform: 'Instagram',
    score: 9.2,
  },
  {
    publishedTime: moment().subtract(2, 'd'),
    platform: 'Instagram',
    score: 8.1,
  },
  {
    publishedTime: moment().subtract(4, 'd'),
    platform: 'Facebook',
    score: 7.6,
  },
  {
    publishedTime: moment().subtract(8, 'd'),
    platform: 'Instagram',
    score: 8.1,
  },
  {
    publishedTime: moment().subtract(12, 'd'),
    platform: 'Facebook',
    score: 8.1,
  },
]

export const postOptions = [
  {
    name: 'details',
    title: 'Details',
  },
  {
    name: 'insights',
    title: 'Insights',
  },
  {
    name: 'settings',
    title: 'Settings',
  },
]

// CAMPAIGN TYPE GRADIENTS
const createGradient = (color) => `linear-gradient(135deg, ${color} 0%, ${brandColors.yellow} 100%)`
export const growthGradient = createGradient(brandColors.blue)
export const conversionsGradient = createGradient(brandColors.red)

export const getPostTypesTitle = (id) => {
  const { title } = postTypes.find(({ id: typeId }) => id === typeId) || {}
  return title
}

// TOGGLE POST STATUS ON SERVER
export const updatePost = async ({ artistId, postId, promotionEnabled, disabled = false, campaignType }) => {
  if (disabled) return
  return server.togglePromotionEnabled(artistId, postId, promotionEnabled, campaignType)
}

const getPaidClicks = (adsSummaryMetrics) => {
  const outboundClicks = get(adsSummaryMetrics, ['outbound_clicks', 'outbound_click'], 0)
  const clickActions = get(adsSummaryMetrics, ['actions', 'link_click'], 0)
  return Math.max(outboundClicks, clickActions)
}

const getLandingPageViews = (adsSummaryMetrics) => {
  return get(adsSummaryMetrics, ['actions', 'landing_page_view'], null)
}

// GET drilldown of paid engagments
// by adding the various action props
const getPaidEngagementsDrilldown = (adsSummaryMetrics) => {
  const { actions } = adsSummaryMetrics
  if (! actions) return null
  return {
    views: get(actions, 'video_view', null),
    clicks: get(actions, 'link_click', null),
    reactions: get(actions, 'post_reaction', null),
    comments: get(actions, 'comments', null),
    shares: get(actions, 'post', null),
    saves: get(actions, 'onsite_conversion.post_save', null),
  }
}

// Get dates when post first ran and last ran
const getPostAdDates = (ads) => {
  if (! ads) return [null, null]
  const adDates = Object.values(ads).map(({ created_at }) => {
    return created_at
  })
  // Sort dates from first to last
  const adDatesSorted = utils.sortDatesChronologically(adDates)
  const firstRan = adDatesSorted[0]
  if (adDatesSorted.length === 1) return [firstRan, null]
  const lastRan = adDates[adDatesSorted.length - 1]
  return [firstRan, lastRan]
}

// Format published time
const formatPublishedTime = (time) => {
  const publishedMoment = moment(time)
  const publishedYear = publishedMoment.format('Y')
  const currentYear = moment().format('Y')
  const publishedFormat = publishedYear === currentYear ? 'D MMM' : 'D MMM YYYY'
  return publishedMoment.format(publishedFormat)
}

// Get nested metric
const getNestedMetric = (post, metric) => {
  const metricValues = get(post, ['metrics', metric, 'data'], null)
  if (! metricValues) return null
  // Get first metric value
  return Object.values(metricValues)[0]
}

// Get post link specs
export const getPostLinkSpecData = (post) => {
  return Object.entries(post.link_specs).reduce((newObject, [key, value]) => {
    const { type: linkType = '', data: linkData = {} } = value || {}
    const linkId = linkData.id || linkData.link_spec?.data?.id || ''
    const linkHref = linkData.href || ''
    newObject[key] = {}
    newObject[key].linkType = linkType
    newObject[key].linkId = linkId
    newObject[key].linkHref = linkHref
    return newObject
  }, {})
}

// Get post link data
export const getPostCallToActionData = (post) => {
  const {
    id,
    callToAction: value,
    campaignType,
  } = post || {}
  return { id, value, campaignType }
}

// Get post ad message data
export const getPostAdMessageData = (post) => {
  const {
    id,
    message,
    campaignType,
  } = post || {}
  return { id, message, campaignType }
}

// Get ad preview links
const getAdPreviewLinks = (post) => {
  if (! post?.ads) return null

  const sortedAds = Object.values(post.ads).sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

  return sortedAds.reduce((result, ad) => {
    return {
      ...result,
      ...(ad.adset_identifier?.includes('engage') && ad.preview_shareable_link ? { engage: ad.preview_shareable_link } : null),
      ...(ad.adset_identifier?.includes('traffic') && ad.preview_shareable_link ? { nurture: ad.preview_shareable_link } : null),
      ...(ad.adset_identifier?.includes('conversions') && ad.preview_shareable_link ? { sales: ad.preview_shareable_link } : null),
    }
  }, {})
}

// FORMAT POST RESPONSES
export const formatPostsResponse = (posts) => {
  return posts.map((post) => {
    if (! post) return null

    const { message, ads_summary: adsSummary = {}, ads } = post
    const shortMessage = utils.abbreviatePostText(message)
    const mediaType = post.display?.type
    const media = post.display?.media?.original?.source || post.display?.media?.original?.picture
    const videoFallback = mediaType === 'video' ? post.display?.media?.media_library?.source : ''
    const thumbnailUrls = post.display?.thumbnails?.map((thumbnail) => thumbnail.url) || []
    const thumbnails = [
      ...(mediaType === 'video'
        ? [post.display?.media?.original?.picture, post.display?.media?.media_library?.picture]
        : [post.display?.media?.media_library?.source]
      ),
      post.display?.thumbnail_url,
      ...thumbnailUrls,
    ]
    // Organic metrics
    const organicMetrics = {
      comments: post.comments,
      impressions: post.impressions,
      likes: post.likes,
      reach: post.reach,
      shares: post.shares,
      video_views: post.views,
      engagementScore: post.engagement_score,
      score: post.score,
      normalizedScore: post.normalized_score,
      replies: getNestedMetric(post, 'replies'),
      taps_forward: getNestedMetric(post, 'taps_forward'),
      taps_back: getNestedMetric(post, 'taps_back'),
      exits: getNestedMetric(post, 'exits'),
    }
    // Paid metrics
    const adsSummaryMetrics = adsSummary.metrics || {}
    const paidMetrics = adsSummary ? {
      spend: adsSummaryMetrics.spend,
      reach: adsSummaryMetrics.reach,
      impressions: adsSummaryMetrics.impressions,
      engagements: get(adsSummaryMetrics, ['actions', 'post_engagement'], null),
      clicks: getPaidClicks(adsSummaryMetrics),
      landing_page_views: getLandingPageViews(adsSummaryMetrics),
      engagementScore: adsSummary.spend_adjusted_engagement_score,
      drilldowns: {
        engagements: getPaidEngagementsDrilldown(adsSummaryMetrics),
      },
    } : null
    // Published date
    const publishedTime = formatPublishedTime(post.published_time)
    // Ad dates
    const [firstRan, lastRan] = getPostAdDates(ads)
    // Link specs
    const linkSpecs = getPostLinkSpecData(post)
    // Promotion eligibility
    const promotionEligibility = {
      enticeEngage: post.promotion_eligibility.entice_engage,
      remindTraffic: post.promotion_eligibility.remind_traffic,
      enticeTraffic: post.promotion_eligibility.entice_traffic,
      offPlatformConversions: post.promotion_eligibility.off_platform_conversions,
      remindConversions: post.promotion_eligibility.remind_conversions,
    }
    // Ad preview links
    const adPreviewLinks = getAdPreviewLinks(post)
    return {
      id: post.id,
      postType: post.internal_type || post.subtype || post.type,
      platform: post.platform,
      permalinkUrl: post.permalink_url,
      promotionEnabled: post.promotion_enabled,
      conversionsEnabled: post.conversions_enabled,
      isRunningInConversions: post.is_running_in_conversions,
      priorityEnabled: post.priority_enabled,
      postPromotable: post.is_promotable,
      promotionStatus: post.promotion_status,
      promotableStatus: post.promotable_status,
      promotionEligibility,
      adPreviewLinks,
      linkSpecs,
      message,
      adMessageProps: post.ad_message,
      shortMessage,
      media,
      mediaType,
      videoFallback,
      thumbnails,
      organicMetrics,
      paidMetrics,
      publishedTime,
      firstRan,
      lastRan,
    }
  })
}

export const formatPostsMinimal = (posts) => {
  const formattedPosts = posts.map((post) => {
    const media = post.display?.media?.original?.source || post.display?.media?.original?.picture
    const thumbnailUrls = post.display?.thumbnails?.map((thumbnail) => thumbnail.url) || []
    const thumbnails = [
      post.display?.media?.media_library?.source,
      post.display?.thumbnail_url,
      ...thumbnailUrls,
    ]

    return {
      id: post.id,
      publishedTime: moment(post.published_time).format('YYYY-MM-DD'),
      reach: post.reach_rate * 100,
      engagement: post.engagement_rate * 100,
      media,
      thumbnails,
      postType: post.subtype || post.type,
      promotionEnabled: post.promotion_enabled,
      _links: post._links,
    }
  })

  return formattedPosts
}

// GET POST CURSOR
export const getCursor = (post = {}) => {
  const { _links: { after = {} } } = post
  const { href: afterHref } = after
  if (! afterHref) return
  return afterHref.split('after=')[1]
}

// GET POST METRIC CONFIG
export const getPostMetricsContent = (metricsType, postType) => {
  // ORGANIC METRICS
  if (metricsType === 'organic') {
    if (postType === 'story' || postType === 'reels') {
      return [
        'replies',
        'taps_forward',
        'taps_back',
        'exits',
      ]
    }
    return [
      'reach',
      'likes',
      'comments',
      'video_views',
      'shares',
      'saves',
      'taps_forward',
      'taps_back',
      'replies',
    ]
  }
  // PAID METRICS
  return [
    'spend',
    'reach',
    'landing_page_views',
    'clicks',
    'video_views',
    'engagements',
    'impressions',
  ]
}

// UPDATE CAPTION
export const updatePostCaption = async ({ artistId, assetId, adMessageId, campaignType, caption }) => {
  const isUpdating = !! adMessageId
  const endpointBase = `/artists/${artistId}/assets/${assetId}/ad_messages`
  const requestType = isUpdating ? 'patch' : 'post'
  const endpoint = isUpdating ? `${endpointBase}/${adMessageId}` : endpointBase
  const payload = isUpdating ? { message: caption } : { message: caption, assetId, campaignType }
  const errorTracking = {
    category: 'Post caption',
    action: isUpdating ? 'Update post caption' : 'Set new post caption',
  }
  const { res: newAdMessage, error } = await requestWithCatch(requestType, endpoint, payload, errorTracking)
  if (error) return { error }
  const res = getPostAdMessageData(newAdMessage)
  return { res }
}

// RESET CAPTION
export const resetPostCaption = ({ artistId, assetId, adMessageId }) => {
  const endpoint = `/artists/${artistId}/assets/${assetId}/ad_messages/${adMessageId}`
  const errorTracking = {
    category: 'Post message',
    action: 'Reset post caption',
  }
  return requestWithCatch('delete', endpoint, null, errorTracking)
}

// UPDATE POST PRIORITY
export const setPostPriority = ({ artistId, assetId, priorityEnabled }) => {
  const action = priorityEnabled ? 'deprioritize' : 'prioritize'
  const endpoint = `/artists/${artistId}/assets/${assetId}/${action}`
  const payload = null
  const errorTracking = {
    category: 'Post priority',
    action: `${utils.capitalise(action)} post`,
  }
  return requestWithCatch('post', endpoint, payload, errorTracking)
}

// UPDATE POST CALL TO ACTION
export const setPostCallToAction = async ({ artistId, callToAction, assetId, campaignType, callToActionId }) => {
  const isUpdating = !! callToActionId
  const endpointBase = `/artists/${artistId}/assets/${assetId}/call_to_actions`
  const requestType = isUpdating ? 'patch' : 'post'
  const endpoint = isUpdating ? `${endpointBase}/${callToActionId}` : endpointBase
  const payload = isUpdating ? { callToAction } : { assetId, callToAction, campaignType }
  const errorTracking = {
    category: 'Post call to action',
    action: 'Set post call to action',
  }
  const { res: newCta, error } = await requestWithCatch(requestType, endpoint, payload, errorTracking)
  if (error) return { error }
  const res = getPostCallToActionData(newCta)
  return { res }
}

// GET SINGLE POST
/**
 * @param {string} artistId
 * @param {string} assetId
 * @returns {Promise<any>}
 */
export const getPostById = async (artistId, assetId) => {
  const endpoint = `/artists/${artistId}/assets/${assetId}`
  const payload = null
  const errorTracking = {
    category: 'Post',
    action: 'Get single post by id',
  }
  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  const [formattedPost] = formatPostsResponse([res])
  return { res: formattedPost, error }
}

// GET POST CALL TO ACTIONS
/**
 * @param {string} artistId
 * @param {string} assetId
 * @returns {Promise<any>}
 */
export const getPostCallToActions = async (artistId, assetId) => {
  const endpoint = `/artists/${artistId}/assets/${assetId}/call_to_actions`
  const payload = null
  const errorTracking = {
    category: 'Post',
    action: 'Get post call to actions',
  }
  const { res = [], error } = await requestWithCatch('get', endpoint, payload, errorTracking)

  const callToActions = res.map((callToAction) => ({
    id: callToAction.id,
    value: callToAction.callToAction,
    campaignType: callToAction.campaignType,
  }))

  return { res: callToActions, error }
}

// GET POST AD MESSAGES
/**
 * @param {string} artistId
 * @param {string} assetId
 * @returns {Promise<any>}
 */
export const getPostAdMessages = async (artistId, assetId) => {
  const endpoint = `/artists/${artistId}/assets/${assetId}/ad_messages`
  const payload = null
  const errorTracking = {
    category: 'Post',
    action: 'Get post ad messages',
  }
  const { res = [], error } = await requestWithCatch('get', endpoint, payload, errorTracking)

  const adMessages = res.map((adMessage) => ({
    id: adMessage.id,
    message: adMessage.message,
    campaignType: adMessage.campaignType,
  }))

  return { res: adMessages, error }
}

// GET INITIAL POSTS IMPORT STATUS
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getInitialPostsImportStatus = async (artistId) => {
  const endpoint = `/artists/${artistId}/assets/metadata`
  const payload = null
  const errorTracking = {
    category: 'Post',
    action: 'Get initial posts import status',
  }
  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  return { res, error }
}

export const canBePromoted = (eligibility) => {
  return Object.values(eligibility).some((platformEligibility) => Object.values(platformEligibility).some(Boolean))
}

export const createAd = (artistId, formData) => {
  const endpoint = `/artists/${artistId}/custom_assets`
  const payload = formData
  const errorTracking = {
    category: 'Post',
    action: 'Create ad',
  }

  return requestWithCatch('post', endpoint, payload, errorTracking)
}
