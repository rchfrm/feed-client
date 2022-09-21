import React from 'react'

import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'

import { parseUrl, getLocalStorage } from '@/helpers/utils'
import { setTikTokAccessToken, updateTikTokAccessToken } from '@/app/helpers/tikTokHelpers'

const useTikTokRedirect = () => {
  const { setIsTikTokRedirect, setAuthError } = React.useContext(AuthContext)
  const router = useRouter()

  const exchangeCodeForAccessToken = async (code, redirectPath) => {
    const redirectUrl = `${process.env.react_app_url}${redirectPath}`

    return setTikTokAccessToken(code, redirectUrl)
  }

  const saveAccessToken = async (artistId) => {
    return updateTikTokAccessToken(artistId)
  }

  const checkAndHandleTikTokRedirect = async (artistId) => {
    // Try to grab query params from TikTok redirect
    const { query } = parseUrl(router.asPath)
    const code = decodeURIComponent(query?.code || '')

    /*
    Return early if:
    - No TikTok redirect code
    */
    if (!code) {
      return
    }

    router.replace(router.pathname, null)
    const { redirectPath } = JSON.parse(getLocalStorage('tikTokRedirect'))

    // Exchange the redirect code for an access token
    const { error } = await exchangeCodeForAccessToken(code, redirectPath)

    if (error) {
      return
    }

    // If user has an artist make sure to update the access token in the db
    if (artistId) {
      const { error } = await saveAccessToken(artistId)

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
