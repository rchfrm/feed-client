import host from './host'
import helper from './helper'
import artistHelpers from './artistHelpers'


export default {

  // USER
  createUser: async (first_name, last_name, verify_id_token) => {
    const endpoint = `${host}accounts/register`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        token: verify_id_token,
      }),
    }).catch((err) => {
      throw (err)
    })

    if (res.ok) {
      const jsonResponse = await res.json()
      jsonResponse.artists = artistHelpers.sortArtistsAlphabetically(jsonResponse.artists)
      return jsonResponse
    }
  },

  getUser: async (verifyIdToken) => {
    const endpoint = `${host}users/me`
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${verifyIdToken}`,
      },
    }).catch((err) => {
      console.error('cant get user')
      throw (err)
    })

    if (res.ok) {
      const jsonResponse = await res.json()
      jsonResponse.artists = artistHelpers.sortArtistsAlphabetically(jsonResponse.artists)
      return jsonResponse
    }
  },

  updateUser: async (firstName, lastName, email, verifyIdToken) => {
    const endpoint = `${host}users/me`
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${verifyIdToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
      }),
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },


  // UPDATE ARTIST
  updateDailyBudget: async (artistId, dailyBudget, verifyIdToken) => {
    const endpoint = `${host}artists/${artistId}`
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
      body: JSON.stringify({
        daily_budget: dailyBudget,
      }),
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },

  saveLink: async (artistId, link, linkLabel, verifyIdToken) => {
    const endpoint = `${host}artists/${artistId}`
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
      body: JSON.stringify({
        [linkLabel]: link,
      }),
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },

  updatePriorityDSP: async (artistId, priorityDSP, verifyIdToken) => {
    const endpoint = `${host}artists/${artistId}`
    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
      body: JSON.stringify({
        priority_dsp: priorityDSP,
      }),
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },

  // DATA SOURCES
  getEndpoint: async (endpoint, verifyIdToken) => {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },

  getPath: async (path, verifyIdToken) => {
    const endpoint = `${host}${path}`

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
    })

    if (res.ok) {
      return res.json()
    }

    throw new Error(res.statusText)
  },

  getDataSourceValue: async (dataSources, artistId, verifyIdToken) => {
    const dataSourceString = dataSources.join(',')
    const endpoint = `${host}artists/${artistId}/data_sources?metrics=${dataSourceString}`
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },

  // ASSETS
  getUnpromotedPosts: async (offset, limit, artistId, verifyIdToken) => {
    const endpoint = `${host}artists/${artistId}/assets?promotion_status=inactive&offset=${offset}&limit=${limit}`
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
    })
    if (res.ok) {
      const jsonResponse = await res.json()
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
    }
    throw new Error(res.statusText)
  },

  getAssets: async (artistId, promotionStatus, verifyIdToken) => {
    const query = promotionStatus ? `?promotion_status=${promotionStatus}` : ''
    const endpoint = `${host}artists/${artistId}/assets${query}`

    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
    })

    if (res.ok) {
      return res.json()
    }

    throw new Error(res.statusText)
  },

  togglePromotionEnabled: async (artistId, postId, promotionEnabled, verifyIdToken) => {
    const endpoint = `${host}artists/${artistId}/assets/${postId}`

    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
      body: JSON.stringify({
        promotion_enabled: promotionEnabled,
      }),
    })

    if (res.ok) {
      return res.json()
    }

    throw new Error(res.statusText)
  },

  updateAssetLink: async (artistId, postId, link, verifyIdToken) => {
    const endpoint = `${host}artists/${artistId}/assets/${postId}`

    const res = await fetch(endpoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
      body: JSON.stringify({
        priority_dsp: link,
      }),
    })

    if (res.ok) {
      return res.json()
    }

    throw new Error(res.statusText)
  },

  updateAccessToken: async (artistIds, accessToken, verifyIdToken) => {
    const response = []
    for (let i = 0; i < artistIds.length; i += 1) {
      const artistId = artistIds[i]
      if (
        artistId === 'Y8uCfxBZkAVcpokW4S4b'
        || artistId === '4FwK6p6y9xhpxZSGW2fR'
        || artistId === 'vpdEYAT65K8gVcIuLpvO'
        || artistId === 'z86bIwfwlIXwEtmKIML6'
      ) {
        const endpoint = `${this.url}artists/${artistId}`
        const res = await fetch(endpoint, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${verifyIdToken}`,
          },
          body: JSON.stringify({
            integrations: {
              facebook: {
                access_token: accessToken,
              },
            },
          }),
        })
        if (res.ok) {
          const res = await res.json()
          response.push(res)
        }
      } else {
        response.push(`Not updating access token for ${artistId}`)
      }
    }
    return response
  },
}
