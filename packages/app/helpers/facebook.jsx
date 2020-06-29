const url = 'https://graph.facebook.com/v4.0/'


const getFacebookPages = async (fb_user_id, fb_access_token) => {
  const endpoint = `${url + fb_user_id}/accounts?fields=name,id,instagram_business_account&access_token=${fb_access_token}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
    })
    if (res.ok) {
      const jsonResponse = await res.json()
      return jsonResponse.data
    }
    throw new Error('Request to GET Facebook Pages failed')
  } catch (err) {
    console.log(err)
  }
}

const getAllFacebookAdAccounts = async (fb_user_id, fb_access_token) => {
  const endpoint = `${url}${fb_user_id}/adaccounts?fields=name,id&access_token=${fb_access_token}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
    })
    if (res.ok) {
      const jsonResponse = await res.json()
      return jsonResponse.data
    }
    throw new Error('Request to GET All Facebook Ad Accounts failed')
  } catch (err) {
    console.log(err)
  }
}


const getInstagramBusinessUsername = async (ig_business_id, fb_access_token) => {
  const endpoint = `${url + ig_business_id}?fields=username&access_token=${fb_access_token}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
    })
    if (res.ok) {
      const jsonResponse = await res.json()
      return jsonResponse.username
    }
    throw new Error('Request to GET Instagram Username failed')
  } catch (err) {
    console.log(err)
  }
}


const getFacebookPropertyIDs = async (fb_user_id, fb_access_token) => {
  const facebook_pages = await getFacebookPages(fb_user_id, fb_access_token)
  const properties = {}
  for (const page of facebook_pages) {
    const fb_page_id = page.id
    const fb_page_name = page.name
    let instagram_id = null
    let instagram_username = null
    if (page.instagram_business_account) {
      instagram_id = page.instagram_business_account.id
      instagram_username = await getInstagramBusinessUsername(instagram_id, fb_access_token)
    }
    const adaccounts = await getFacebookAdAccounts(fb_user_id, fb_access_token, fb_page_id)
    Object.assign(properties, {
      [fb_page_id]: {
        page_name: fb_page_name,
        instagram: {
          id: instagram_id,
          username: instagram_username,
        },
        adaccounts,
      },
    })
  }
  return properties
}

const getFacebookAdAccounts = async (fb_user_id, fb_access_token, fb_page_id) => {
  const endpoint = `${url}${fb_user_id}/adaccounts?fields=name,id,promote_pages&access_token=${fb_access_token}`
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
    })
    if (res.ok) {
      const jsonResponse = await res.json()
      const adaccounts = []
      jsonResponse.data.forEach(adaccount => {
        if (adaccount.promote_pages) {
          adaccount.promote_pages.data.forEach(promote_page => {
            if (promote_page.id === fb_page_id) {
              adaccounts.push({
                name: adaccount.name,
                id: adaccount.id,
              })
            }
          })
        }
      })
      return adaccounts
    }
    throw new Error('Request to GET Facebook Ad Accounts failed')
  } catch (err) {
    console.log(err)
  }
}

export default {
  getFacebookPropertyIDs,
  getFacebookPages,
  getAllFacebookAdAccounts,
  getFacebookAdAccounts,
  getInstagramBusinessUsername,
}
