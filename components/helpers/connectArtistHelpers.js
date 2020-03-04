import facebook from './facebook'


const getNewArtistState = (currentState, action) => {
  const { type: actionType, payload } = action

  if (actionType === 'add-artist') {
    console.log('addArtist')
    return {
      ...currentState,
      ...payload.artist,
    }
  }

  if (actionType === 'add-artists') {
    console.log('addArtists')
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
}


// DEFINE FUNCTION TO SORT AD ACCOUNTS FOR EACH FACEBOOK PAGE
const sortAdAccounts = (account, adaccounts) => {
  // If the Facebook page hasn't been promoted by an ad account before,
  // return the array of ad accounts unchanged
  if (!account.adaccount_id) {
    return adaccounts
  }

  // Find the index of the ad account that has been used to promote the Facebook page before
  const indexOfUsedAdAccount = adaccounts.findIndex(adaccount => adaccount.id === account.adaccount_id)
  if (indexOfUsedAdAccount === -1) {
    return adaccounts
  }
  // Remove the ad account that has been used before from the list of ad accounts
  const remainingAdAccounts = [...adaccounts]
  remainingAdAccounts.splice(indexOfUsedAdAccount, 1)

  // Return the array of ad accounts, with the one previously used
  // to promote the Facebook page in the first position
  return [adaccounts[indexOfUsedAdAccount], ...remainingAdAccounts]
}


const sortArtistsAlphabetically = (artists) => {
  // Convert object to array
  const artistArr = Array.isArray(artists) ? artists : Object.values(artists)
  console.log('artistArr', artistArr)
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


const addAdAccountsToArtists = async ({ accounts, adAccounts, accessToken }) => {
  const accountsArray = Object.values(accounts)
  // README: https://gyandeeps.com/array-reduce-async-await/
  const accountsProcessed = await accountsArray.reduce(async (accumulator, account) => {
    const {
      facebook_page_url,
      instagram_url,
      instagram_id,
      picture,
    } = account
    const accountsAcc = await accumulator
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
    // Set an Instagram URL if there isn't on already
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
  return accountsProcessed
}


export default {
  getNewArtistState,
  sortAdAccounts,
  sortArtistsAlphabetically,
  addAdAccountsToArtists,
}
