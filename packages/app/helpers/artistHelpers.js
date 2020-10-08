import produce from 'immer'
import * as utils from '@/helpers/utils'
import facebook from '@/app/helpers/facebook'
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


const getInstagramUrl = async ({ instagram_id, accessToken }) => {
  if (!instagram_id) return
  const instagramUsername = await facebook.getInstagramBusinessUsername(instagram_id, accessToken)
  if (!instagramUsername) return
  return `https://instagram.com/${instagramUsername}`
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
    facebook_page_url: artist.facebook_page_url,
    spotify_url: utils.cleanSpotifyUrl(artist.spotify_url) || null,
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
  }, token)
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
  // Add data source info to artist
  artist._embedded = { data_sources: dataSources }
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
  return api.post('/artists/available', { access_token: facebookAccessToken })
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

export const addAdAccountsToArtists = async ({ accounts, adAccounts, accessToken }) => {
  const accountsArray = Object.values(accounts)
  const processAccountsPromise = accountsArray.map(async (account) => {
    const {
      facebook_page_url,
      instagram_url,
      instagram_id,
      picture,
      page_id,
    } = account
    // Sort the add accounts so that the last used ad for this artists account is placed first
    const sortedAdAccounts = sortAdAccounts(account, adAccounts)
    const selectedAdAccount = sortedAdAccounts[0]
    // Get the FB page url
    const facebookPageUrl = facebook_page_url || `https://facebook.com/${page_id}`
    // Get the Insta page url
    const instaPageUrl = instagram_url || await getInstagramUrl({ instagram_id, accessToken })
    // Return processed account
    return {
      ...account,
      available_facebook_ad_accounts: sortedAdAccounts,
      selected_facebook_ad_account: selectedAdAccount,
      facebook_page_url: facebookPageUrl,
      instagram_url: instaPageUrl || '',
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


export const musicianCategories = [
  'Musician',
  'Musician/Band',
  'Musician/band',
  'Band',
  'Orchestra',
  'Producer',
  'Artist',
  'Record label',
  'Music',
  'Album',
  'Choir',
  'Music award',
  'Music chart',
  'Music video',
  'Musical genre',
  'Playlist',
  'Podcast',
  'Record label',
  'Song',
  'Symphony',
  'Music production studio',
  'Music school',
]

/**
 * Receives array of artist category objects and
 * returns bool if any category makes this account a musician
 * @param {array} artistCategories
 * @returns {boolean}
 */
export const testIfMusician = (artistCategories = []) => {
  return artistCategories.some(({ name }) => musicianCategories.includes(name))
}

/**
 * Test whether this account has spotify connected
 * @param {string} spotifyUrl
 * @returns {boolean}
 */
export const testIfSpotifyConnected = (spotifyUrl) => {
  return !!(spotifyUrl && spotifyUrl.includes('/artist/'))
}
