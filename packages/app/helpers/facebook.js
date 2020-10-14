/* eslint-disable import/prefer-default-export */

const url = 'https://graph.facebook.com/v4.0/'


export const getInstagramBusinessUsername = async (ig_business_id, fb_access_token) => {
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
