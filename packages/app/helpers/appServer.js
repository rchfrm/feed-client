import * as utils from '@/helpers/utils'
import * as api from '@/helpers/api'


const formatPostsResponse = (posts) => {
  // Process certain parts of the response to make it easier to handle
  posts.forEach(post => {
    // Abbreviate text to <100 characters long
    post.short_message = utils.abbreviatePostText(post.message)

    // Find the correct media source
    post.media = utils.findPostMedia(post.attachments[0])

    // Set the thumbnail
    if (!post._metadata.thumbnail_url) {
      post._metadata.thumbnail_url = utils.findPostThumbnail(post.attachments[0])
    }

    // Use thumbnail as media if attachments are empty
    if (!post.media && post._metadata.thumbnail_url) {
      post.media = post._metadata.thumbnail_url
    }

    // Create field for insights
    const insights = {
      comments: post.comments,
      engagement_score: post.engagement_score,
      impressions: post.impressions,
      likes: post.likes,
      reach: post.reach,
      shares: post.shares,
      video_views: post.views,
    }

    // If there are 0 'views', but post metrics has information for video_views,
    // use that instead
    if (insights.video_views === 0 && post.metrics.video_views) {
      insights.video_views = utils.returnLatestValue(post.metrics.video_views.data)
    }

    // Look for other available insights in the metrics field
    const metricNames = Object.keys(post.metrics)
    const insightNames = Object.keys(insights)
    let metricsToAdd = {}
    for (let i = 0; i < metricNames.length; i += 1) {
      const metric = metricNames[i]
      if (insightNames.indexOf(metric) === -1 && metric !== 'engagement') {
        metricsToAdd = {
          ...metricsToAdd,
          [metric]: utils.returnLatestValue(post.metrics[metric].data),
        }
      }
    }

    // Attach all metrics to post.insights
    post.insights = {
      ...insights,
      ...metricsToAdd,
    }
  })

  return posts
}


// UPDATE ARTIST
/**
 * @param {string} artistId
 * @param {number} dailyBudget
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const updateDailyBudget = async (artistId, dailyBudget, verifyIdToken) => {
  return api.patch(`/artists/${artistId}`, { daily_budget: dailyBudget }, verifyIdToken)
}

/**
 * @param {string} artistId
 * @param {string} link
 * @param {string} linkLabel
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const saveLink = async (artistId, link, linkLabel, verifyIdToken) => {
  return api.patch(`/artists/${artistId}`, { [linkLabel]: link }, verifyIdToken)
}

/**
 * @param {string} artistId
 * @param {string} priorityDSP
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const updatePriorityDSP = async (artistId, priorityDSP, verifyIdToken) => {
  return api.patch(`/artists/${artistId}`, { priority_dsp: priorityDSP }, verifyIdToken)
}

// DATA SOURCES
/**
 * @param {string} endpoint
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getEndpoint = async (endpoint, verifyIdToken) => {
  return api.get(endpoint, verifyIdToken)
}

/**
 * @param {string} path
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getPath = async (path, verifyIdToken) => {
  return api.get(path, verifyIdToken)
}

/**
 * @param {array} dataSources
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getDataSourceValue = async (dataSources, artistId) => {
  return api
    .get(`/artists/${artistId}/data_sources`, {
      name: dataSources.join(','),
    })
    .then(res => {
      // convert array to object with data source name as keys
      return res.reduce((obj, dataSource) => {
        obj[dataSource.name] = dataSource
        return obj
      }, {})
    })
}

/**
 * @param {string} dataSource
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getDataSourceProjection = async (dataSource, artistId) => {
  return api.get(`/artists/${artistId}/data_sources/${dataSource}/annualized`)
}

// ASSETS
/**
 * @param {number} offset
 * @param {number} limit
 * @param {string} artistId
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getUnpromotedPosts = async (offset, limit, artistId, verifyIdToken) => {
  return api
    .get(`/artists/${artistId}/assets`, {
      promotion_status: 'inactive',
      offset,
      limit,
    }, verifyIdToken)
    .then(formatPostsResponse)
}

/**
 * @param {string} href
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getUnpromotedPostsAfter = async (href, verifyIdToken) => {
  return api.get(href, verifyIdToken).then(formatPostsResponse)
}

/**
 * @param {string} artistId
 * @param {string} [promotionStatus]
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getAssets = async (artistId, promotionStatus, verifyIdToken) => {
  const query = promotionStatus ? { promotion_status: promotionStatus } : {}

  return api.get(`/artists/${artistId}/assets`, query, verifyIdToken)
}

/**
 * @param {string} artistId
 * @param {string} postId
 * @param {boolean} promotionEnabled
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const togglePromotionEnabled = async (artistId, postId, promotionEnabled, verifyIdToken) => {
  return api.patch(`/artists/${artistId}/assets/${postId}`, { promotion_enabled: promotionEnabled }, verifyIdToken)
}

/**
 * @param {string} artistId
 * @param {boolean} enabled
 * @returns {Promise<any>}
 */
export const toggleDefaultPromotionStatus = async (artistId, enabled) => {
  return api.post('/actions/batchSetPromotionEnabled', { artist_id: artistId, enabled })
}


/**
 * @param {string} artistId
 * @param {boolean} enabled
 * @returns {Promise<any>}
 */
export const patchArtistPromotionStatus = async (artistId, enabled) => {
  return api.patch(`/artists/${artistId}`, { preferences: { posts: { promotion_enabled_default: enabled } } })
}

/**
 * @param {string} artistId
 * @param {string} postId
 * @param {string} link
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const updateAssetLink = async (artistId, postId, link, verifyIdToken) => {
  return api.patch(`/artists/${artistId}/assets/${postId}`, { priority_dsp: link }, verifyIdToken)
}

/**
 * @param {string} artistId
 * @param {string} accessToken
 * @returns {Promise<any>}
 * Returns errors as if the request were succesful with a `error` key filled out
 */
export const updateAccessToken = async (artistId, accessToken) => {
  const res = await api.patch(`/artists/${artistId}`, {
    integrations: {
      facebook: {
        access_token: accessToken,
      },
    },
  })
    .catch((error) => { return { error } })
  if (res.error && typeof res.error.response === 'object') {
    const errorMessage = res.error.response.data.error
    return { error: { message: errorMessage } }
  }
  return res
}


/**
 * @param {string} artistId
 * @param {string} postId
 * @param {string} link
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getIntegrationErrors = async (artistId) => {
  return api.get(`/artists/${artistId}/integrations/errors`)
}

export const catchAxiosError = (error) => {
  if (error.response) {
    /*
      * The request was made and the server responded with a
      * status code that falls out of the range of 2xx
      */
    console.log('error.response.data', error.response.data)
    console.log('error.response.status', error.response.status)
    console.log('error.response.headers', error.response.headers)
  } else if (error.request) {
    /*
      * The request was made but no response was received, `error.request`
      * is an instance of XMLHttpRequest in the browser and an instance
      * of http.ClientRequest in Node.js
      */
    console.log('error.request', error.request)
  } else {
    // Something happened in setting up the request and triggered an Error
    console.log('Error', error.message)
  }
  console.log(error)
  throw new Error(error.message)
}
