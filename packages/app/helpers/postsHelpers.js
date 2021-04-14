import get from 'lodash/get'
import moment from 'moment'
import slugify from 'slugify'

import * as server from '@/app/helpers/appServer'
import * as utils from '@/helpers/utils'
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

export const getPostTypesTitle = (id) => {
  const { title } = postTypes.find(({ id: typeId }) => id === typeId) || {}
  return title
}

// TOGGLE POST STATUS ON SERVER
export const updatePost = async ({ artistId, postId, promotionEnabled, disabled = false }) => {
  if (disabled) return
  return server.togglePromotionEnabled(artistId, postId, promotionEnabled)
}

const getPaidClicks = (adsSummaryMetrics) => {
  const outboundClicks = get(adsSummaryMetrics, ['outbound_clicks', 'outbound_click'], 0)
  const clickActions = get(adsSummaryMetrics, ['actions', 'link_click'], 0)
  return Math.max(outboundClicks, clickActions)
}

// GET drilldown of paid engagments
// by adding the various action props
const getPaidEngagementsDrilldown = (adsSummaryMetrics) => {
  const { actions } = adsSummaryMetrics
  if (!actions) return null
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
  if (!ads) return [null, null]
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
  const publishedFormat = publishedYear === currentYear ? 'D MMMM' : 'D MMM YYYY'
  return publishedMoment.format(publishedFormat)
}

// Get nested metric
const getNestedMetric = (post, metric) => {
  const metricValues = get(post, ['metrics', metric, 'data'], null)
  if (!metricValues) return null
  // Get first metric value
  return Object.values(metricValues)[0]
}

// Get post link data
export const getPostLinkData = (post) => {
  const { type: linkType = '', data: linkData = {} } = post.link_spec || {}
  const linkId = linkData.id || ''
  const linkHref = linkData.href || ''
  return { linkType, linkId, linkHref }
}

// FORMAT POST RESPONSES
export const formatPostsResponse = (posts) => {
  return posts.map((post) => {
    const { message, ads_summary: adsSummary = {}, ads } = post
    const firstAttachment = post.attachments[0]
    const shortMessage = utils.abbreviatePostText(message)
    // Get thumbnails
    const thumbnailSrc = post._metadata.thumbnail_url || utils.findPostThumbnail(firstAttachment)
    const initialThumbnails = post.thumbnails.map(({ url }) => url)
    const thumbnails = [...initialThumbnails, thumbnailSrc]
    const media = utils.findPostMedia(firstAttachment) || thumbnails[0]
    // Organic metrics
    const organicMetrics = {
      comments: post.comments,
      impressions: post.impressions,
      likes: post.likes,
      reach: post.reach,
      shares: post.shares,
      video_views: post.views,
      engagementScore: post.engagement_score,
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
      engagementScore: adsSummary.spend_adjusted_engagement_score,
      drilldowns: {
        engagements: getPaidEngagementsDrilldown(adsSummaryMetrics),
      },
    } : null
    // Published date
    const publishedTime = formatPublishedTime(post.published_time)
    // Ad dates
    const [firstRan, lastRan] = getPostAdDates(ads)
    // Link type
    const { linkType, linkId, linkHref } = getPostLinkData(post)
    return {
      id: post.id,
      postType: post.subtype || post.type,
      platform: post.platform,
      permalinkUrl: post.permalink_url,
      promotionEnabled: post.promotion_enabled,
      linkId,
      linkHref,
      linkType,
      postPromotable: post.is_promotable,
      promotionStatus: post.promotion_status,
      promotableStatus: post.promotable_status,
      message,
      shortMessage,
      media,
      thumbnails,
      organicMetrics,
      paidMetrics,
      publishedTime,
      firstRan,
      lastRan,
    }
  })
}


// GET POST CURSOR
export const getCursor = (post = {}) => {
  const { _links: { after = {} } } = post
  const { href: afterHref } = after
  if (!afterHref) return
  return afterHref.split('after=')[1]
}


// GET POST METRIC CONFIG
export const getPostMetricsContent = (metricsType, postType) => {
  // ORGANIC METRICS
  if (metricsType === 'organic') {
    if (postType === 'story') {
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
    'clicks',
    'video_views',
    'engagements',
    'impressions',
  ]
}
