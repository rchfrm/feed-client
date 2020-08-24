import * as server from '@/app/helpers/appServer'
import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'
import get from 'lodash/get'

// TRANSLATE PROMOTION NAME
export const translatePromotionName = (promotionStatus, capitalize) => {
  const name = promotionStatus === 'inactive' ? 'pending' : promotionStatus
  if (capitalize) return utils.capitalise(name)
  return name
}

// POST TYPE FILTERS
export const postTypes = [
  {
    id: 'active',
    title: translatePromotionName('active', true),
    color: brandColors.green,
    activeTextColor: brandColors.white,
  },
  {
    id: 'archived',
    title: translatePromotionName('archived', true),
    color: brandColors.black,
    activeTextColor: brandColors.white,
  },
  {
    id: 'inactive',
    title: translatePromotionName('inactive', true),
    color: brandColors.greyDark,
    activeTextColor: brandColors.white,
  },
  {
    id: 'all',
    title: translatePromotionName('all', true),
    color: brandColors.black,
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

// FORMAT POST RESPONSES
export const formatPostsResponse = (posts) => {
  return posts.map((post) => {
    const { message, ads_summary: adsSummary = {} } = post
    const firstAttachment = post.attachments[0]
    const shortMessage = utils.abbreviatePostText(message)
    const thumbnailSrc = post._metadata.thumbnail_url || utils.findPostThumbnail(firstAttachment)
    const media = utils.findPostMedia(firstAttachment) || thumbnailSrc
    // Organic metrics
    const organicMetrics = {
      comments: post.comments,
      impressions: post.impressions,
      likes: post.likes,
      reach: post.reach,
      shares: post.shares,
      video_views: post.views,
      engagementScore: post.engagement_score,
    }
    // Paid metrics
    const adsSummaryMetrics = adsSummary.metrics || {}
    const paidMetrics = adsSummary ? {
      spend: adsSummaryMetrics.spend,
      reach: adsSummaryMetrics.reach,
      engagements: get(adsSummaryMetrics, ['actions', 'post_engagement'], null),
      clicks: getPaidClicks(adsSummaryMetrics),
      engagementScore: adsSummary.engagement_score,
      drilldowns: {
        engagements: getPaidEngagementsDrilldown(adsSummaryMetrics),
      },
    } : null
    return {
      id: post.id,
      platform: post.platform,
      publishedTime: post.published_time,
      permalinkUrl: post.permalink_url,
      promotionEnabled: post.promotion_enabled,
      priorityDsp: post.priority_dsp,
      postPromotable: post.is_promotable,
      promotionStatus: post.promotion_status,
      promotableStatus: post.promotable_status,
      message,
      shortMessage,
      media,
      thumbnailSrc,
      organicMetrics,
      paidMetrics,
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
export const getPostMetricsContent = (metricsType) => {
  // ORGANIC METRICS
  if (metricsType === 'organic') {
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
    'shares',
  ]
}


export const getMetricsDrilldown = (drilldownMetrics) => {
  if (!drilldownMetrics) return null
  const metricsEntries = Object.entries(drilldownMetrics)
  const sentenceArray = metricsEntries.reduce((arr, [key, value]) => {
    if (!value) return arr
    const sentence = `${utils.capitalise(key)}: **${utils.abbreviateNumber(value)}**`
    return [...arr, sentence]
  }, [])
  return sentenceArray.join('  \n')
}
