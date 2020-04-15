import produce from 'immer'

import helper from './helper'
import artistHelpers from './artistHelpers'
import firebase from './firebase'
import * as api from './api'


export default {

  // USER
  /**
   * @param {string} first_name
   * @param {string} last_name
   * @param {string} [verify_id_token]
   * @returns {Promise<any>}
   */
  createUser: async (first_name, last_name, verify_id_token) => {
    if (!verify_id_token) verify_id_token = await firebase.getIdTokenOrFail()
    return api
      .post('/accounts/register', {
        first_name,
        last_name,
        token: verify_id_token,
      }, false)
      .then(res => {
        res.artists = artistHelpers.sortArtistsAlphabetically(res.artists)
        return res
      })
  },

  /**
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  getUser: async (verifyIdToken) => {
    const user = await api.get('/users/me', verifyIdToken)
    if (!user) return
    const userSortedArtists = produce(user, draft => {
      const { artists } = draft
      draft.artists = artistHelpers.sortArtistsAlphabetically(artists)
      return draft
    })
    return userSortedArtists
  },

  /**
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} email
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  updateUser: async (firstName, lastName, email, verifyIdToken) => {
    return api
      .patch('/users/me', {
        first_name: firstName,
        last_name: lastName,
        email,
      }, verifyIdToken)
  },


  // UPDATE ARTIST
  /**
   * @param {string} artistId
   * @param {number} dailyBudget
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  updateDailyBudget: async (artistId, dailyBudget, verifyIdToken) => {
    return api.patch(`/artists/${artistId}`, { daily_budget: dailyBudget }, verifyIdToken)
  },

  /**
   * @param {string} artistId
   * @param {string} link
   * @param {string} linkLabel
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  saveLink: async (artistId, link, linkLabel, verifyIdToken) => {
    return api.patch(`/artists/${artistId}`, { [linkLabel]: link }, verifyIdToken)
  },

  /**
   * @param {string} artistId
   * @param {string} priorityDSP
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  updatePriorityDSP: async (artistId, priorityDSP, verifyIdToken) => {
    return api.patch(`/artists/${artistId}`, { priority_dsp: priorityDSP }, verifyIdToken)
  },

  // DATA SOURCES
  /**
   * @param {string} endpoint
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  getEndpoint: async (endpoint, verifyIdToken) => {
    return api.get(endpoint, verifyIdToken)
  },

  /**
   * @param {string} path
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  getPath: async (path, verifyIdToken) => {
    return api.get(path, verifyIdToken)
  },

  /**
   * @param {string[]} dataSources
   * @param {string} artistId
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  getDataSourceValue: async (dataSources, artistId, verifyIdToken) => {
    return api
      .get(`/artists/${artistId}/data_sources`, {
        metrics: dataSources.join(','),
      }, verifyIdToken)
  },

  // ASSETS
  /**
   * @param {number} offset
   * @param {number} limit
   * @param {string} artistId
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  getUnpromotedPosts: async (offset, limit, artistId, verifyIdToken) => {
    return api
      .get(`/artists/${artistId}/assets`, {
        promotion_status: 'inactive',
        offset,
        limit,
      }, verifyIdToken)
      .then(jsonResponse => {
      // Process certain parts of the response to make it easier to handle
        jsonResponse.forEach(post => {
        // Abbreviate text to <100 characters long
          post.short_message = helper.abbreviatePostText(post.message)

          // Find the correct media source
          post.media = helper.findPostMedia(post.attachments[0])

          // Set the thumbnail
          if (!post._metadata.thumbnail_url) {
            post._metadata.thumbnail_url = helper.findPostThumbnail(post.attachments[0])
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
            insights.video_views = helper.returnLatestValue(post.metrics.video_views.data)
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
                [metric]: helper.returnLatestValue(post.metrics[metric].data),
              }
            }
          }

          // Attach all metrics to post.insights
          post.insights = {
            ...insights,
            ...metricsToAdd,
          }
        })

        return jsonResponse
      })
  },

  /**
   * @param {string} artistId
   * @param {string} [promotionStatus]
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  getAssets: async (artistId, promotionStatus, verifyIdToken) => {
    const query = promotionStatus ? { promotion_status: promotionStatus } : {}

    return api.get(`/artists/${artistId}/assets`, query, verifyIdToken)
  },

  /**
   * @param {string} artistId
   * @param {string} postId
   * @param {boolean} promotionEnabled
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  togglePromotionEnabled: async (artistId, postId, promotionEnabled, verifyIdToken) => {
    return api.patch(`/artists/${artistId}/assets/${postId}`, { promotion_enabled: promotionEnabled }, verifyIdToken)
  },

  /**
   * @param {string} artistId
   * @param {string} postId
   * @param {string} link
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  updateAssetLink: async (artistId, postId, link, verifyIdToken) => {
    return api.patch(`/artists/${artistId}/assets/${postId}`, { priority_dsp: link }, verifyIdToken)
  },

  /**
   * @param {string[]} artistIds
   * @param {string} accessToken
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  updateAccessToken: async (artistIds, accessToken, verifyIdToken) => {
    const response = []
    for (let i = 0; i < artistIds.length; i += 1) {
      const artistId = artistIds[i]
      if (
        artistId === 'e1dDjAC5jXjCMk0dhqH1'
        || artistId === 'z86bIwfwlIXwEtmKIML6'
        || artistId === 'PjUuyt5uJhTRIbv5T4D1'
        || artistId === 'Y8uCfxBZkAVcpokW4S4b'
        || artistId === '4FwK6p6y9xhpxZSGW2fR'
        || artistId === 'dSzNAx3SL1Jo6q6GdM8v'
        || artistId === 'vpdEYAT65K8gVcIuLpvO'
      ) {
        const res = await api.patch(`/artists/${artistId}`, {
          integrations: {
            facebook: {
              access_token: accessToken,
            },
          },
        }, verifyIdToken)
        response.push(res)
      } else {
        response.push(`Not updating access token for ${artistId}`)
      }
    }
    return response
  },


  /**
   * @param {string} artistId
   * @param {string} postId
   * @param {string} link
   * @param {string} [verifyIdToken]
   * @returns {Promise<any>}
   */
  getIntegrationErrors: async (artistId) => {
    return api.get(`/artists/${artistId}/integrations/errors`)
  },

  catchAxiosError: (error) => {
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
  },
}
