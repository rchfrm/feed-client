import React from 'react'

import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { parseUrl, setLocalStorage, getLocalStorage } from '@/helpers/utils'
import { updateAccessToken, getMissingScopes } from '@/app/helpers/artistHelpers'
import { setFacebookAccessToken } from '@/app/helpers/facebookHelpers'

import copy from '@/app/copy/global'

const useFbRedirect = () => {
  const { setMissingScopes, setIsFacebookRedirect, setAuthError } = React.useContext(AuthContext)
  const { artistId, setArtist } = React.useContext(ArtistContext)

  const router = useRouter()

  const exchangeCodeForAccessToken = async (code, redirectPath) => {
    const redirectUrl = `${process.env.react_app_url}${redirectPath}`
    const { res, error } = await setFacebookAccessToken(code, redirectUrl)

    return { res, error }
  }

  const checkAndSetMissingScopes = (grantedScopes) => {
    const missingScopes = getMissingScopes({ grantedScopes })
    setMissingScopes(missingScopes)
  }

  const saveAccessToken = async () => {
    const { res, error } = await updateAccessToken(artistId)

    // Update facebook granted scopes in artist context
    if (res) {
      setArtist({
        type: 'update-facebook-integration-scopes',
        payload: {
          scopes: res.scopes,
        },
      })
    }

    return { res, error }
  }

  const checkAndHandleFbRedirect = async () => {
    // Try to grab query params from Facebook redirect
    const { query } = parseUrl(router.asPath)
    const code = decodeURIComponent(query?.code || '')
    const state = decodeURIComponent(query?.state)
    const redirectError = decodeURIComponent(query?.error || '').replace('+', ' ')
    const errorReason = decodeURIComponent(query?.error_reason || '')
    const errorMessage = copy.fbRedirectError(errorReason)

    /*
    Return early if:
    - Unmounted
    - No FB redirect code
    - Redirect error
    - The state param from the callback doesn't match the state we passed during the redirect request
    */
    if (!code) {
      return
    }

    router.replace(router.pathname, null)
    const { state: storedState, redirectPath } = JSON.parse(getLocalStorage('fbRedirect'))

    if (redirectError || state !== storedState) {
      setLocalStorage('fbRedirect', null)

      if (redirectError) {
        setAuthError({ message: errorMessage })
      }
      return
    }

    let grantedScopes = []
    setLocalStorage('fbRedirect', null)

    // Exchange the FB redirect code for an access token
    const { res: exchangeCodeforTokenRes, error } = await exchangeCodeForAccessToken(code, redirectPath)

    if (error) {
      setAuthError({ message: errorMessage })
      return
    }
    grantedScopes = exchangeCodeforTokenRes.scopes

    // If user has an artist make sure to update the access token in the db
    if (artistId) {
      const { res: saveAccessTokenRes, error } = await saveAccessToken()

      if (error) {
        setAuthError({ message: error.message })
        return
      }
      grantedScopes = saveAccessTokenRes.scopes
    }

    // Set missing scopes in auth context
    checkAndSetMissingScopes(grantedScopes)
    setIsFacebookRedirect(true)
  }

  return { checkAndHandleFbRedirect }
}

export default useFbRedirect
