import produce from 'immer'

import host from './host'
import helper from './helper'
import facebook from './facebook'


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

export default {

  createArtist: async (artist, accessToken, token) => {
    const endpoint = `${host}artists`
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
    const endpoint = `${host}artists/${artist_id}`
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


  getNewArtistState: (currentState, action) => {
    const { type: actionType, payload } = action

    if (actionType === 'add-artists') {
      return {
        ...currentState,
        ...payload.artists,
      }
    }
    if (actionType === 'toggle-connect') {
      return {
        ...currentState,
        [payload.id]: {
          ...currentState[payload.id],
          connect: !currentState[payload.id].connect,
        },
      }
    }
    if (actionType === 'update-artist') {
      const targetedAccount = currentState[payload.id]
      const updatedAccount = {
        ...targetedAccount,
        [payload.field]: payload.value,
      }
      return {
        ...currentState,
        [payload.id]: {
          ...updatedAccount,
        },
      }
    }

    return currentState
  },


  getArtistOnSignUp: async (facebookAccessToken, verifyIdToken) => {
    const endpoint = `${host}artists/available`
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


  sortArtistsAlphabetically: (artists) => {
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
  },

  addAdAccountsToArtists: async ({ accounts, adAccounts, accessToken }) => {
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
  },
}
