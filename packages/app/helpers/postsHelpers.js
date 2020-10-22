import get from 'lodash/get'
import moment from 'moment'
import slugify from 'slugify'

import * as server from '@/app/helpers/appServer'
import * as utils from '@/helpers/utils'
import { dummyIntegrations } from '@/app/helpers/integrationHelpers'
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
    return {
      id: post.id,
      postType: post.subtype || post.type,
      platform: post.platform,
      permalinkUrl: post.permalink_url,
      promotionEnabled: post.promotion_enabled,
      priorityDsp: post.priority_dsp,
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


// LINKS
// ------------------------

export const defaultFolderId = '_default'

// * DEV DUMMY LINK
const dummyLinks = {
  folders: [
    {
      type: 'folder',
      name: 'Hippos',
      id: 'hippos',
      linkIds: [
        'mission-statement',
        'bolognese-recipe',
        'best-music-ever',
      ],
    },
    {
      type: 'folder',
      name: 'Shimmerings',
      id: 'shimmerings',
      linkIds: [
        'lonely-pilgrim',
        'dangerous-supermarket',
        'love-is-under-the-pavement',
      ],
    },
  ],
  links: [
    {
      name: 'Lonely pilgrim',
      id: 'lonely-pilgrim',
      href: 'https://test.com',
      folderId: 'shimmerings',
    },
    {
      name: 'Dangerous Supermarket',
      id: 'dangerous-supermarket',
      href: 'https://test.com',
      folderId: 'shimmerings',
    },
    {
      name: 'Love is under the pavement at night',
      id: 'love-is-under-the-pavement',
      href: 'https://test.com',
      folderId: 'shimmerings',
    },
    {
      name: 'Mission statement',
      id: 'mission-statement',
      href: 'https://test.com',
      folderId: 'hippos',
    },
    {
      name: 'Bolognese recipe',
      id: 'bolognese-recipe',
      href: 'https://test.com',
      folderId: 'hippos',
    },
    {
      name: 'Real hero',
      id: 'Real-hero',
      href: 'https://test.com',
      folderId: defaultFolderId,
    },
    {
      name: 'Best music ever with a really long name',
      id: 'best-music-ever',
      href: 'https://test/com',
      folderId: 'hippos',
      defaultLink: true,
    },
  ],
  integrations: dummyIntegrations,
}


// FETCH SAVED LINKS
export const fetchSavedLinks = (artistId, type) => {
  console.log(`get links for artist ${artistId}`)
  return new Promise((resolve) => {
    if (type === 'dummy') {
      setTimeout(() => {
        resolve({ data: dummyLinks })
      }, 500)
    }
  })
}

// SET NEW DEFAULT LINK
export const setDefaultLink = (link) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ res: link, error: false })
    }, 500)
  })
}

// SAVE LINK
/**
 * @param {object} link
 * @param {string} action 'add' | 'edit' | 'delete'
 * @returns {Promise<any>}
 */
export const saveLink = (link, action = 'add') => {
  // Disable deleting default link
  // (you shouldn't be able to do this, but just in case...)
  if (action === 'delete' && link.defaultLink) {
    return {
      error: { message: 'You cannot delete the default link. If you want to remove it please choose another default link.' },
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('update link:', action)
      resolve({ res: true, error: false })
    }, 500)
  })
}

// SAVE FOLDER
/**
 * @param {object} folder
 * @param {string} action 'edit' | 'delete'
 * @returns {Promise<any>}
 */
export const saveFolder = (folder, action = 'edit', isDefaultLinkInFolder) => {
  if (action === 'delete' && isDefaultLinkInFolder) {
    return {
      error: { message: 'You cannot delete the folder that contains the default link. If you want to remove it please choose another default link.' },
    }
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('update folder:', action)
      resolve({ res: true, error: false })
    }, 500)
  })
}




// LINKS ON A POST
export const setPostLink = (link) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('set post link:', link.id)
      resolve({ res: true, error: false })
    }, 500)
  })
}
