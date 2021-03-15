import produce from 'immer'
import uniqBy from 'lodash/uniqBy'
import get from 'lodash/get'

import * as utils from '@/helpers/utils'
import * as api from '@/helpers/api'

// Sort Ad accounts so the previously used one is on top
const sortAdAccounts = (account, adAccounts) => {
  // Get Ad account ID used in the account
  const { adaccount_id: adId } = account
  // If the Facebook page hasn't been promoted by an ad account before,
  // return the array of ad accounts unchanged
  if (!adId) {
    return adAccounts
  }

  // Find the index of the ad account that has been used to promote the Facebook page before
  const indexOfUsedAdAccount = adAccounts.findIndex(adAccount => adAccount.id === adId)
  // If the ad account has not been used in main account, return unsorted
  if (indexOfUsedAdAccount === -1) {
    return adAccounts
  }

  // Remove the ad account that has been used before from the list of ad accounts
  // and put it at front of list
  const usedAccount = adAccounts[indexOfUsedAdAccount]
  return produce(adAccounts, draft => {
    draft.splice(indexOfUsedAdAccount, 1)
    draft.unshift(usedAccount)
  })
}

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
    country_code: artist.country_code,
    integrations: {
      facebook: {
        page_id: artist.page_id,
        access_token: accessToken,
        instagram_id: artist.instagram_id,
        adaccount_id: artist.selected_facebook_ad_account.id,
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


/**
 * Create array of artist accounts, sorted alphabetically
 * @param {object} artistAccounts
 * @returns {array}
 */
export const getSortedArtistAccountsArray = (artistAccounts) => {
  const accountsArray = Object.values(artistAccounts)
  // Return sorted array
  const sortedArray = accountsArray.sort((a, b) => {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  })
  return sortedArray
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
  // Convert object to array
  const artistArr = Array.isArray(artists) ? artists : Object.values(artists)
  // Return here if empty or only one entry
  if (artistArr.length <= 1) {
    return artistArr
  }

  return artistArr.sort((a, b) => {
    const lowerA = a.name.toLowerCase()
    const lowerB = b.name.toLowerCase()
    if (lowerA === lowerB) {
      return 0
    }
    const array = [lowerA, lowerB].sort()
    if (array[0] === lowerA) {
      return -1
    }
    return 1
  })
}

export const addAdAccountsToArtists = async ({ accounts, adAccounts }) => {
  const accountsArray = Object.values(accounts)
  const processAccountsPromise = accountsArray.map(async (account) => {
    const {
      instagram_username,
      picture,
      page_id,
      page_token,
    } = account
    // Sort the add accounts so that the last used ad for this artists account is placed first
    const sortedAdAccounts = sortAdAccounts(account, adAccounts)
    const selectedAdAccount = sortedAdAccounts[0]
    // Get the FB page url
    const facebookPageUrl = `https://www.facebook.com/${page_token || page_id}`
    // Get the Insta page url
    const instaPageUrl = instagram_username ? `https://www.instagram.com/${instagram_username}/` : ''
    // Return processed account
    return {
      ...account,
      available_facebook_ad_accounts: sortedAdAccounts,
      selected_facebook_ad_account: selectedAdAccount,
      facebook_page_url: facebookPageUrl,
      instagram_url: instaPageUrl,
      connect: true,
      picture: `${picture}?width=500`,
    }
  })

  const accountsProcessed = await Promise.all(processAccountsPromise)

  // Convert array of accounts back into and object with IDs as keys
  const keyedAccounts = accountsProcessed.reduce((accountObj, account) => {
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
 * @param {object} artistAccounts
 * @returns {object}
 */
export const sanitiseArtistAccountUrls = (artistAccounts) => {
  return produce(artistAccounts, draft => {
    // Loop over artists
    Object.values(draft).forEach((artist) => {
      // Loop over artist props
      Object.entries(artist).forEach(([key, value]) => {
        if (value === '') {
          artist[key] = null
        }
      })
    })
    return draft
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
