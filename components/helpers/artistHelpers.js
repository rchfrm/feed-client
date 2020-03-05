import host from './host'
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
  const remainingAdAccounts = [...adAccounts]
  remainingAdAccounts.splice(indexOfUsedAdAccount, 1)

  // Return the array of ad accounts, with the one previously used
  // to promote the Facebook page in the first position
  return [adAccounts[indexOfUsedAdAccount], ...remainingAdAccounts]
}


export default {
  getNewArtistState: (currentState, action) => {
    const { type: actionType, payload } = action

    if (actionType === 'add-artist') {
      return {
        ...currentState,
        ...payload.artist,
      }
    }

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
    // README: https://gyandeeps.com/array-reduce-async-await/
    const accountsProcessed = await accountsArray.reduce(async (accumulator, account) => {
      const accountsAcc = await accumulator
      const {
        facebook_page_url,
        instagram_url,
        instagram_id,
        picture,
      } = account
      const availableAccounts = sortAdAccounts(account, adAccounts)

      // Stop here if no ad accounts
      if (!availableAccounts || !availableAccounts.length) {
        return accountsAcc
      }
      // Sort available ad accounts, priotising any that have
      // been used to promote the Facebook page before
      // Set the first ad account in the array as the default selected ad account
      const selectedFacebookAdAccount = {
        id: availableAccounts[0].id,
        name: availableAccounts[0].name,
      }
      // Set a Facebook URL if there isn't one already
      let facebookUrlFallback
      if (!facebook_page_url) {
        facebookUrlFallback = `https://facebook.com/${account.page_id}`
      }
      // Set an Instagram URL if there isn't one already
      let instagramUrlFallback
      if (!instagram_url && instagram_id) {
        const instagramUsername = await facebook.getInstagramBusinessUsername(instagram_id, accessToken)
        if (instagramUsername) {
          instagramUrlFallback = `https://instagram.com/${instagramUsername}`
        }
      }

      const processedAccount = {
        ...account,
        available_facebook_ad_accounts: availableAccounts,
        selected_facebook_ad_account: selectedFacebookAdAccount,
        facebook_page_url: facebook_page_url || facebookUrlFallback,
        instagram_url: instagram_url || instagramUrlFallback,
        connect: true,
        picture: `${picture}?width=500`,
      }
      return [...accountsAcc, processedAccount]
    }, [])

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
