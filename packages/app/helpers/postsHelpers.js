import moment from 'moment'
import * as utils from '@/helpers/utils'
import { requestWithCatch } from '@/helpers/api'
import brandColors from '@/constants/brandColors'
import { getPostTypePlural } from '@/app/copy/PostsPageCopy'
import { capitalise } from '@/helpers/utils'

export const postsConfig = {
  active: {
    name: 'Active',
    filterBy: { promotion_status: 'active' },
    action: 'Edit ad',
  },
  rejected: {
    name: 'Rejected',
    filterBy: { promotion_status: 'rejected', promotion_enabled: true },
    action: 'Edit ad',
  },
  pending: {
    name: 'Queue',
    filterBy: {
      promotion_status: ['inactive', 'in_review'],
      promotion_enabled: true,
      is_promotable: true,
    },
    action: 'Edit ad or push to front',
  },
  inactive: {
    name: 'Library',
    filterBy: { promotion_status: ['inactive', 'rejected'], promotion_enabled: false },
    action: 'Add to queue',
  },
  archived: {
    name: 'Archive',
    filterBy: { promotion_status: 'archived' },
    action: 'Reactivate',
  },
}

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
    type: 'platform',
    options: [
      {
        title: 'All platforms',
        slug: 'all',
      },
      {
        title: 'Facebook',
        slug: 'facebook',
      },
      {
        title: 'Instagram',
        slug: 'instagram',
      },
    ],
  },
  {
    type: 'internal_type',
    options: [
      {
        title: 'All post types',
        slug: 'all',
      },
      {
        title: 'Posts',
        slug: 'post',
      },
      {
        title: 'Stories',
        slug: 'story',
      },
      {
        title: 'Reels',
        slug: 'reels',
      },
    ],
  },
]

export const sortTypes = [
  {
    name: 'Queue',
    value: ['promotionStatus', 'priorityEnabled', 'normalizedScore'],
  },
  {
    name: 'Date',
    value: 'publishedTime',
  },
  {
    name: 'Score',
    value: 'normalizedScore',
  },
]

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
    name: 'settings',
    title: 'Settings',
  },
]

// CAMPAIGN TYPE GRADIENTS
const createGradient = (color) => `linear-gradient(135deg, ${color} 0%, ${brandColors.yellowLight} 100%)`
export const growthGradient = createGradient(brandColors.blue)
export const conversionsGradient = createGradient(brandColors.red)

// Format published time
const formatPublishedTime = (time) => {
  const publishedMoment = moment(time)
  const publishedYear = publishedMoment.format('Y')
  const currentYear = moment().format('Y')
  const publishedFormat = publishedYear === currentYear ? 'D MMM' : 'D MMM YYYY'
  return publishedMoment.format(publishedFormat)
}

// Format rejection reason
export const formatAdRejectionReason = (reason) => {
  let formattedReason = reason
  formattedReason = reason?.toLowerCase().replaceAll('_', ' ')
  formattedReason = capitalise(formattedReason)
  return formattedReason
}

export const getRejectionReason = (ads) => {
  const [reason] = Object.values(ads || {}).reduce((reasons, ad) => {
    const adReviewFeedback = ad?.ad_review_feedback?.global
    const issuesInfo = ad?.issues_info
    if (adReviewFeedback) {
      return [...reasons, Object.keys(adReviewFeedback)[0]]
    }
    if (issuesInfo) {
      return [...reasons, issuesInfo[0].error_summary]
    }
    return reasons
  }, [])

  return formatAdRejectionReason(reason)
}

export const getPostStatus = (post, status) => {
  const { isPromotable, notPromotableReason } = post

  if (status === 'rejected') {
    return getRejectionReason(post?.ads) || 'Unknown'
  }

  if (! isPromotable && notPromotableReason) {
    return notPromotableReason
  }

  if (post.promotionStatus === 'in_review') {
    return 'In Review'
  }

  return ''
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
  if (! posts) {
    return []
  }

  return posts.map((post) => {
    const { message } = post
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
    // Published date
    const publishedTime = formatPublishedTime(post.published_time)
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
      ads: post?.ads,
      postType: post.internal_type,
      platform: post.platform,
      permalinkUrl: post.permalink_url,
      promotionEnabled: post.promotion_enabled,
      conversionsEnabled: post.conversions_enabled,
      isRunningInConversions: post.is_running_in_conversions,
      priorityEnabled: post.priority_enabled,
      isPromotable: post.is_promotable,
      notPromotableReason: post?.not_promotable_reason,
      promotionStatus: post.promotion_status,
      promotableStatus: post.promotable_status,
      normalizedScore: post.normalized_score,
      promotionEligibility,
      adPreviewLinks,
      message,
      media,
      mediaType,
      videoFallback,
      thumbnails,
      publishedTime,
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
      media,
      thumbnails,
      postType: post.internal_type,
      promotionEnabled: post.promotion_enabled,
    }
  })

  return formattedPosts
}

// GET POST RESULTS CONFIG
export const postResultsConfig = [
  'spend',
  'reach',
  'landing_page_views',
  'clicks',
  'video_views',
  'engagements',
  'impressions',
]

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
export const setPostPriority = async ({ artistId, assetId, priorityEnabled }) => {
  const action = priorityEnabled ? 'prioritize' : 'deprioritize'
  const endpoint = `/artists/${artistId}/assets/${assetId}/${action}`
  const payload = null
  const errorTracking = {
    category: 'Post priority',
    action: `${utils.capitalise(action)} post`,
  }

  const { res, error } = await requestWithCatch('post', endpoint, payload, errorTracking)
  const [formattedPost] = formatPostsResponse([res])

  return { res: formattedPost, error }
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

// UPDATE POST LINK
export const setPostLink = async ({ artistId, linkId, assetId, campaignType, id }) => {
  const isUpdating = Boolean(id)
  const endpointBase = `/artists/${artistId}/assets/${assetId}/links`
  const requestType = isUpdating ? 'patch' : 'post'
  const endpoint = isUpdating ? `${endpointBase}/${id}` : endpointBase

  const payload = {
    type: 'linkbank',
    linkId,
    ...(! isUpdating && { assetId }),
    ...(! isUpdating && { campaignType }),
  }

  const errorTracking = {
    category: 'Post link',
    action: 'Set post link',
  }

  const { res, error } = await requestWithCatch(requestType, endpoint, payload, errorTracking)

  if (error) {
    return { error }
  }

  return { res }
}

/**
* @param {number} limit
* @param {string} artistId
* @param {string} sortBy
* @param {object} filterBy
* @param {string} [cursor]
* @returns {Promise<any>}
*/
export const getPosts = async ({ limit = 10, artistId, sortBy, filterBy, cursor }) => {
  const endpoint = `/artists/${artistId}/assets`

  const payload = {
    limit,
    ...(cursor && { after: cursor }),
    ...(sortBy && { order_by: sortBy }),
    ...filterBy,
  }
  const errorTracking = {
    category: 'Posts',
    action: 'Get all posts',
  }

  const { res, error } = await requestWithCatch('get', endpoint, payload, errorTracking)
  const formattedPosts = formatPostsResponse(res)

  return { res, formattedPosts, error }
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

// GET POST LINKS
/**
 * @param {string} artistId
 * @param {string} assetId
 * @returns {Promise<any>}
 */
export const getPostLinks = async (artistId, assetId) => {
  const endpoint = `/artists/${artistId}/assets/${assetId}/links`
  const payload = null
  const errorTracking = {
    category: 'Post',
    action: 'Get post links',
  }
  const { res = [], error } = await requestWithCatch('get', endpoint, payload, errorTracking)

  const links = res.map(({ id, linkId, campaignType }) => ({
    id,
    linkId,
    campaignType,
  }))

  return { res: links, error }
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

export const canBePromoted = (eligibility, postType) => {
  if (postType === 'reels') {
    return Object.values(eligibility).some(Boolean)
  }
  const pluralPostType = getPostTypePlural(postType)
  return eligibility?.[pluralPostType]
}

export const createAd = async (artistId, formData) => {
  const endpoint = `/artists/${artistId}/assets`
  const payload = formData
  const errorTracking = {
    category: 'Post',
    action: 'Create ad',
  }

  const { res, error } = await requestWithCatch('post', endpoint, payload, errorTracking)
  const formattedPosts = formatPostsResponse([res])

  return { res: formattedPosts, error }
}

/**
 * @param {string} artistId
 * @param {string} postId
 * @param {boolean} promotionEnabled
 * @param {boolean} disabled
 * @param {string} campaignType
 * @returns {Promise<any>}
 */
export const togglePromotionEnabled = async ({ artistId, postId, promotionEnabled, conversionsEnabled, disabled = false, campaignType }) => {
  if (disabled) {
    return
  }

  const endpoint = `/artists/${artistId}/assets/${postId}`
  const payload = {
    ...(Array.isArray(campaignType) && { promotion_enabled: promotionEnabled, conversions_enabled: conversionsEnabled }),
    ...(campaignType === 'all' && { promotion_enabled: promotionEnabled }),
    ...(campaignType === 'conversions' && { conversions_enabled: conversionsEnabled }),
  }
  const errorTracking = {
    category: 'Posts',
    action: 'Toggle promotion enabled',
  }

  const { res, error } = await requestWithCatch('patch', endpoint, payload, errorTracking)
  const [formattedPost] = formatPostsResponse([res])

  return { res: formattedPost, error }
}
