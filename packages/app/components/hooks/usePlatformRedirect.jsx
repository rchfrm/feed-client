import React from 'react'

import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { parseUrl, getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { getMissingScopes, updateAccessToken } from '@/app/helpers/artistHelpers'
import { setAccessToken } from '@/app/helpers/userHelpers'

import copy from '@/app/copy/global'

const usePlatformRedirect = () => {
  const { setMissingScopes, setIsPlatformRedirect, setAuthError } = React.useContext(AuthContext)
  const { setArtist } = React.useContext(ArtistContext)
  const router = useRouter()

  const checkAndHandlePlatformRedirect = async (artistId) => {
    // Try to grab query params from redirect
    const { query } = parseUrl(router.asPath)
    const facebookAuthCode = decodeURIComponent(query?.code || '')
    const tikTokAuthCode = decodeURIComponent(query?.auth_code || '')
    const state = decodeURIComponent(query?.state)
    const redirectError = decodeURIComponent(query?.error || '').replace('+', ' ')
    const errorReason = decodeURIComponent(query?.error_reason || '')
    const errorMessage = copy.fbRedirectError(errorReason)

    /*
    Return early if:
    - No Facebook or TikTok redirect code
    - Redirect error
    - The state param from the callback doesn't match the state we passed during the redirect request
    */
    if (!facebookAuthCode && !tikTokAuthCode) {
      return
    }

    router.replace(router.pathname, null)
    const { state: storedState, redirectPath } = JSON.parse(getLocalStorage('platformRedirect'))

    if (state !== storedState) {
      setLocalStorage('platformRedirect', null)
      return
    }

    if (redirectError) {
      setAuthError({ message: errorMessage })
      setLocalStorage('fbRedirect', null)
      return
    }

    setLocalStorage('platformRedirect', null)

    const platform = tikTokAuthCode ? 'tiktok' : 'facebook'
    const authCode = tikTokAuthCode || facebookAuthCode

    // Exchange the redirect auth code for an access token
    const redirectUrl = `${process.env.react_app_url}${redirectPath}`
    const { res, error } = await setAccessToken(authCode, platform, redirectUrl)

    if (error) {
      setAuthError({ message: error.message })
      return
    }

    // Update facebook granted scopes in artist context
    if (platform === 'facebook') {
      setArtist({
        type: 'update-facebook-integration-scopes',
        payload: {
          scopes: res?.scopes,
        },
      })

      const missingScopes = getMissingScopes({ grantedScopes: res?.scopes })
      setMissingScopes(missingScopes)
    }

    // If user has an artist make sure to update the access token in the db
    if (artistId) {
      const { error } = await updateAccessToken(artistId, platform)

      if (error) {
        setAuthError({ message: error.message })
        return
      }
    }

    setIsPlatformRedirect(true)
  }

  return { checkAndHandlePlatformRedirect }
}

export default usePlatformRedirect