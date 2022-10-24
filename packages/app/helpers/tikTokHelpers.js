import tiktok from '@/app/constants/tiktok'
import { setLocalStorage } from '@/helpers/utils'


export const getTikTokAuthUrl = (csrfState) => {
  const redirectUrl = `${process.env.react_app_url}`

  return `
${tiktok.OAUTH_URL}?
app_id=${tiktok.APP_ID}&
redirect_uri=${redirectUrl}&
state=${csrfState}`
}

export const handleTikTokAuthRedirect = () => {
  const csrfState = (Math.random() + 1).toString(36).substring(4)
  const url = getTikTokAuthUrl(csrfState)

  setLocalStorage('platformRedirect', JSON.stringify({ state: csrfState, redirectPath: '' }))
  window.location.href = url
}
