import helper from './helper'

const url = process.env.REACT_APP_API_URL || 'http://localhost:5000/'

export default {

  // USER
  createUser: async (first_name, last_name, verify_id_token) => {
    const endpoint = `${url}accounts/register`
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
      jsonResponse.artists = helper.sortArtistsAlphabetically(jsonResponse.artists)
      return jsonResponse
    }
  },

  getUser: async (verifyIdToken) => {
    const endpoint = `${url}users/me`
    console.log('verifyIdToken', verifyIdToken)
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${verifyIdToken}`,
      },
    }).catch((err) => {
      console.log('cannt get user')
      throw (err)
    })

    if (res.ok) {
      const jsonResponse = await res.json()
      jsonResponse.artists = helper.sortArtistsAlphabetically(jsonResponse.artists)
      return jsonResponse
    }
  },

  updateUser: async (firstName, lastName, email, verifyIdToken) => {
    const endpoint = `${url}users/me`
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

  // ARTIST
  createArtist: async (artist, accessToken, token) => {
    const endpoint = `${url}artists`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: artist.name,
        location: artist.location,
        country_code: artist.country_code,
        facebook_page_url: artist.facebook_page_url,
        spotify_url: helper.cleanSpotifyUrl(artist.spotify_url),
        instagram_url: artist.instagram_url,
        integrations: {
          facebook: {
            page_id: artist.page_id,
            access_token: accessToken,
            instagram_id: artist.instagram_id,
            adaccount_id: artist.selected_facebook_ad_account.id,
          },
        },
        priority_dsp: artist.priority_dsp,
      }),
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },

  getArtist: async (artist_id, verify_id_token) => {
    const endpoint = `${url}artists/${artist_id}`
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verify_id_token}`,
      },
    })
    if (res.ok) {
      const response = await res.json()

      // Filter out links so that they are stored in a specific 'links' key
      response.URLs = helper.filterArtistUrls(response)

      return response
    }
    throw new Error('We were unable to retrieve the selected artist from the server')
  },

  getArtistOnSignUp: async (facebookAccessToken, verifyIdToken) => {
    const endpoint = `${url}artists/available`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
      body: JSON.stringify({
        access_token: facebookAccessToken,
      }),
    })
    if (res.ok) {
      // Convert ad accounts into an array of objects, sorted alphabetically
      return res.json()
    }
    throw new Error(res.statusText)
  },
  // UPDATE ARTIST
  updateDailyBudget: async (artistId, dailyBudget, verifyIdToken) => {
    const endpoint = `${url}artists/${artistId}`
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
    const endpoint = `${url}artists/${artistId}`
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
    const endpoint = `${url}artists/${artistId}`
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
  getDataSourceValue: async (dataSources, artistId, verifyIdToken) => {
    const dataSourceString = dataSources.join(',')
    const endpoint = `${url}artists/${artistId}/data_sources?metrics=${dataSourceString}`
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
    const endpoint = `${url}artists/${artistId}/assets?promotion_status=inactive&offset=${offset}&limit=${limit}`
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

  getAssets: async (artistId, promotion_status, verifyIdToken) => {
    const query = promotion_status ? `?promotion_status=${promotion_status}` : ''
    const endpoint = `${url}artists/${artistId}/assets${query}`

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
    const endpoint = `${url}artists/${artistId}/assets/${postId}`

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
    const endpoint = `${url}artists/${artistId}/assets/${postId}`

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
  // PAYMENTS
  makePayment: async (token, verifyIdToken) => {
    const endpoint = `${url}users/me/payments`
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyIdToken}`,
      },
      body: JSON.stringify({
        token,
      }),
    })
    if (res.ok) {
      return res.json()
    }
    throw new Error(res.statusText)
  },

}
