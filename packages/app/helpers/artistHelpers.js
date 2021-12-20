import produce from 'immer'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

import * as utils from '@/helpers/utils'
import * as api from '@/helpers/api'

/**
 * @param {string} artist
 * @param {string} accessToken
 * @param {string} [token]
 * @returns {Promise<any>}
 */
export const createArtist = async (artist, accessToken, token) => {
  return api.post('/artists', {
    name: artist.name,
    location: null,
    integrations: {
      facebook: {
        page_id: artist.page_id,
        access_token: accessToken,
        instagram_id: artist.instagram_id,
      },
    },
  }, token)
}

const sanitiseDataSources = (dataSources) => {
  return uniqBy(dataSources, 'name')
}

/**
 * @param {string} artistId
 * @param {string} [accessToken]
 * @returns {Promise<any>}
 */
export const getArtist = async (artistId, accessToken) => {
  const artist = await api.get(`/artists/${artistId}`, accessToken)
    .catch((error) => {
      return { error }
    })
  if (artist.error) return { error: artist.error }
  const dataSources = await api.get(`/artists/${artistId}/data_sources`, { fields: 'name', limit: 100 }, accessToken)
    .catch((error) => {
      return { error }
    })
  const sanitisedDataSources = sanitiseDataSources(dataSources)
  // Add data source info to artist
  artist._embedded = { dataSources: sanitisedDataSources }
  artist.URLs = utils.filterArtistUrls(artist)
  return { artist }
}

// Get all available ad accounts
/**
 * @param {string} artistId
 * @returns {Promise<any>}
 */
export const getAdAccounts = async (artistId) => {
  const requestUrl = `/artists/${artistId}/available_adaccounts`
  const payload = {}
  const errorTracking = {
    category: 'Artist',
    action: 'Get available ad accounts',
  }
  return api.requestWithCatch('get', requestUrl, payload, errorTracking)
}

// Update ad account
/**
* @param {string} artistId
* @param {string} adAccountId
* @returns {Promise<object>} { res, error }
*/
export const updateAdAccount = (artistId, adAccountId) => {
  const requestUrl = `/artists/${artistId}`
  const payload = {
    integrations: {
      facebook: {
        adaccount_id: adAccountId,
      },
    },
  }
  const errorTracking = {
    category: 'Artist',
    action: 'Update ad account',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

// Update country code
/**
* @param {string} artistId
* @param {string} countryCode
* @returns {Promise<object>} { res, error }
*/
export const updateLocation = (artistId, countryCode) => {
  const requestUrl = `/artists/${artistId}`
  const payload = { country_code: countryCode }
  const errorTracking = {
    category: 'Artist',
    action: 'Update country code',
  }
  return api.requestWithCatch('patch', requestUrl, payload, errorTracking)
}

/**
 * Create sorted array of artist accounts
 * First show accounts that don't already exists, then sort name alphabetically
 * @param {object} artistAccounts
 * @returns {array}
 */
export const getSortedArtistAccountsArray = (artistAccounts) => {
  return Object.values(artistAccounts).sort((a, b) => {
    return ((a.exists === b.exists) ? 0 : a.exists ? 1 : -1) || a.name.localeCompare(b.name)
  })
}

/**
 * @param {string} facebookAccessToken
 * @param {string} [verifyIdToken]
 * @returns {Promise<any>}
 */
export const getArtistOnSignUp = async (facebookAccessToken) => {
  const requestUrl = '/artists/available'
  const payload = { access_token: facebookAccessToken }
  const errorTracking = {
    category: 'Artist',
    action: 'Get available aritsts',
  }
  return api.requestWithCatch('post', requestUrl, payload, errorTracking)
}


export const sortArtistsAlphabetically = (artists) => {
  return utils.sortArrayByKey(artists, 'name')
}

/**
 * @param {object} newArtists
 * @param {array} userArtists
 * @returns {object}
 */
export const removeAlreadyConnectedArtists = (newArtists, userArtists) => {
  return produce(newArtists, draftState => {
    userArtists.forEach(({ facebook_page_id }) => {
      delete draftState[facebook_page_id]
    })
  })
}

export const processArtists = async ({ artists }) => {
  const artistsProcessed = Object.values(artists).map((artist) => {
    const {
      instagram_username,
      picture,
      page_id,
      page_token,
    } = artist
    // Get the FB page url
    const facebookPageUrl = `https://www.facebook.com/${page_token || page_id}`
    // Get the Insta page url
    const instaPageUrl = instagram_username ? `https://www.instagram.com/${instagram_username}/` : ''
    // Return processed account
    return {
      ...artist,
      facebook_page_url: facebookPageUrl,
      instagram_url: instaPageUrl,
      connect: true,
      picture: `${picture}?width=500`,
    }
  })

  // Convert array of accounts back into and object with IDs as keys
  const keyedAccounts = artistsProcessed.reduce((accountObj, account) => {
    const { page_id } = account
    return {
      ...accountObj,
      [page_id]: account,
    }
  }, {})

  return keyedAccounts
}

/**
 * Receives object of keyed artist accounts by ID
 * Converts empty strings to null
 * Returns newly formed artist account
 * @param {array} artistAccounts
 * @returns {object}
 */
export const sanitiseArtistAccountUrls = (artistAccounts) => {
  return produce(artistAccounts, draftState => {
    // Loop over artists
    draftState.forEach((artist) => {
      // Loop over artist props
      Object.entries(artist).forEach(([key, value]) => {
        if (value === '') {
          artist[key] = null
        }
      })
    })
    return draftState
  })
}


/**
 * Gets the artist integration by platform ID
 * @param {object} artist
 * @param {string} platformId
 * @returns {object} integration
 */
export const getArtistIntegrationByPlatform = (artist, platformId) => {
  if (!artist) return null
  return artist.integrations.find(({ platform }) => platform === platformId)
}


// https://developers.facebook.com/tools/explorer/145634995501895/?method=GET&path=fb_page_categories&version=v8.0
export const musicianCategories = [
  {
    name: 'Musician',
    id: 1335670856447673,
  },
  {
    name: 'Musician/Band',
    id: 180164648685982,
  },
  {
    name: 'Band',
    id: 792007097567368,
  },
  {
    name: 'Orchestra',
    id: 103436486409265,
  },
  {
    name: 'Producer',
    id: 1108,
  },
  {
    name: 'Artist',
    id: 1601,
  },
  {
    name: 'Record label',
    id: 1211,
  },
  {
    name: 'Album',
    id: 1200,
  },
  {
    name: 'Choir',
    id: 1664274330313158,
  },
  {
    name: 'Music award',
    id: 1212,
  },
  {
    name: 'Music chart',
    id: 1213,
  },
  {
    name: 'Music video',
    id: 1207,
  },
  {
    name: 'Musical genre',
    id: 1203,
  },
  {
    name: 'Playlist',
    id: 1206,
  },
  {
    name: 'Podcast',
    id: 627651640670228,
  },
  {
    name: 'Record label',
    id: 1211,
  },
  {
    name: 'Song',
    id: 1201,
  },
  {
    name: 'Symphony',
    id: 181815448531059,
  },
  {
    name: 'Music production studio',
    id: 189483194405517,
  },
  {
    name: 'Music school',
    id: 186983191324114,
  },
]



/**
 * Receives array of artist category objects and
 * returns bool if any category makes this account a musician
 * @param {array} artistCategories
 * @returns {boolean}
 */
export const testIfMusician = (artistCategories = []) => {
  const isMusician = artistCategories.some(({ id }) => {
    return musicianCategories.find(({ id: categoryId }) => {
      return id === categoryId.toString()
    })
  })
  return isMusician
}

/**
 * Test whether this account has spotify connected
 * @param {string} spotifyUrl
 * @returns {boolean}
 */
export const testIfSpotifyConnected = (integrations) => {
  const spotifyIntegration = getArtistIntegrationByPlatform({ integrations }, 'spotify')
  return !!spotifyIntegration.accountId
}

/**
 * Gets the default link from the artist
 * @param {object} artist
 * @returns {string}
 */
export const getDefaultLinkId = (artist) => {
  return get(artist, ['preferences', 'posts', 'default_link_id'], '')
}

/**
 * Gets the preferences from the artist
 * @param {object} artist
 * @returns {object}
 */
export const getPreferences = (artist, type) => {
  const { preferences } = artist
  const formattedPreferencesResponse = {
    defaultLinkId: preferences[type].default_link_id,
    callToAction: preferences[type].call_to_action,
    ...(type === 'conversions' && { facebookPixelEvent: preferences[type].facebook_pixel_event }),
    ...(type === 'posts' && { defaultPromotionEnabled: preferences[type].promotion_enabled_default }),
  }
  return formattedPreferencesResponse
}
