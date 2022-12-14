import React from 'react'

import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { getLocalStorage, setLocalStorage } from '@/helpers/utils'
import { getMissingScopes, updateAccessToken } from '@/app/helpers/artistHelpers'
import { setAccessToken } from '@/app/helpers/userHelpers'

import copy from '@/app/copy/global'

const usePlatformRedirect = () => {
  const { setMissingScopes, setIsPlatformRedirect, setAuthError } = React.useContext(AuthContext)
  const { setArtist } = React.useContext(ArtistContext)
  const router = useRouter()

  const updateIntegration = (res, platform) => {
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

    if (platform === 'tiktok') {
      setArtist({
        type: 'update-tiktok-integration-account-id',
      })
    }
  }

  const checkAndHandlePlatformRedirect = async (artistId) => {
    // Try to grab query params from redirect
    const queryParams = new URLSearchParams(window.location.search)
    const facebookAuthCode = decodeURIComponent(queryParams.get('code') || '')
    const tikTokAuthCode = decodeURIComponent(queryParams.get('auth_code') || '')
    const state = decodeURIComponent(queryParams.get('state'))
    const redirectError = decodeURIComponent(queryParams.get('error') || '').replace('+', ' ')
    const errorReason = decodeURIComponent(queryParams.get('error_reason') || '')
    const errorMessage = copy.fbRedirectError(errorReason)

    /*
    Return early if:
    - No Facebook or TikTok auth code
    - Redirect error
    - The state param from the callback doesn't match the state we passed during the redirect request
    */
    if (! facebookAuthCode && ! tikTokAuthCode) {
      return
    }

    router.replace(window.location.pathname, null)

    const { state: storedState, redirectPath } = JSON.parse(getLocalStorage('platformRedirect'))
    setLocalStorage('platformRedirect', null)

    if (state !== storedState) {
      return
    }

    if (redirectError) {
      setAuthError({ message: errorMessage })
      return
    }

    const platform = tikTokAuthCode ? 'tiktok' : 'facebook'
    const authCode = tikTokAuthCode || facebookAuthCode

    // Exchange the redirect auth code for an access token
    const redirectUrl = `${process.env.react_app_url}${redirectPath}`
    const { error } = await setAccessToken(authCode, platform, redirectUrl)

    if (error) {
      setAuthError({ message: error.message })
      return
    }

    // If user has an artist make sure to update the access token in the db
    if (artistId) {
      const { res, error } = await updateAccessToken(artistId, platform)

      if (error) {
        setAuthError({ message: error.message })
        return
      }

      // Update integration in artist context
      updateIntegration(res, platform)
    }

    setIsPlatformRedirect(true)
  }

  return { checkAndHandlePlatformRedirect }
}

export default usePlatformRedirect
