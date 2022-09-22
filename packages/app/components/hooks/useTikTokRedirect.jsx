import React from 'react'

import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'

import { parseUrl, getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { setTikTokAccessToken, updateTikTokAccessToken } from '@/app/helpers/tikTokHelpers'

const useTikTokRedirect = () => {
  const { setIsTikTokRedirect, setAuthError } = React.useContext(AuthContext)
  const router = useRouter()

  const checkAndHandleTikTokRedirect = async (artistId) => {
    // Try to grab query params from TikTok redirect
    const { query } = parseUrl(router.asPath)
    const authCode = decodeURIComponent(query?.auth_code || '')
    const state = decodeURIComponent(query?.state)

    /*
    Return early if:
    - No TikTok redirect code
    - The state param from the callback doesn't match the state we passed during the redirect request
    */
    if (!authCode) {
      return
    }

    router.replace(router.pathname, null)
    const { state: storedState } = JSON.parse(getLocalStorage('tikTokRedirect'))

    if (state !== storedState) {
      setLocalStorage('tikTokRedirect', null)

      return
    }

    setLocalStorage('tikTokRedirect', null)

    // Exchange the redirect auth code for an access token
    const { error } = await setTikTokAccessToken(authCode)

    if (error) {
      setAuthError({ message: error.message })
      return
    }

    // If user has an artist make sure to update the access token in the db
    if (artistId) {
      const { error } = await updateTikTokAccessToken(artistId)

      if (error) {
        setAuthError({ message: error.message })
        return
      }
    }

    setIsTikTokRedirect(true)
  }

  return { checkAndHandleTikTokRedirect }
}

export default useTikTokRedirect
