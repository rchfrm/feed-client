import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { parseUrl, setLocalStorage, getLocalStorage } from '@/helpers/utils'
import { updateAccessToken, getMissingScopes } from '@/app/helpers/artistHelpers'
import { setFacebookAccessToken } from '@/app/helpers/facebookHelpers'

import copy from '@/app/copy/global'

const useFbRedirect = (redirectPath, errors, setErrors) => {
  const redirectUrl = `${process.env.react_app_url}${redirectPath}`
  const [hasCheckedFbRedirect, setHasCheckedFbRedirect] = React.useState(false)

  const { setIsFacebookRedirect, setMissingScopes } = React.useContext(AuthContext)
  const { artistId, setArtist } = React.useContext(ArtistContext)

  const stateLocalStorageKey = 'redirectState'
  const router = useRouter()

  const exchangeCodeForAccessToken = async (code) => {
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

  useAsyncEffect(async (isMounted) => {
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
    if (!isMounted || !code) {
      setHasCheckedFbRedirect(true)
      return
    }

    router.replace(router.pathname, null)

    if (redirectError || state !== getLocalStorage(stateLocalStorageKey)) {
      setLocalStorage(stateLocalStorageKey, '')

      if (redirectError) {
        setErrors([...errors, { message: errorMessage }])
      }
      setHasCheckedFbRedirect(true)
      return
    }

    let grantedScopes = []
    setLocalStorage(stateLocalStorageKey, '')

    // Exchange the FB redirect code for an access token
    const { res: exchangeCodeforTokenRes, error } = await exchangeCodeForAccessToken(code)

    if (error) {
      setErrors([...errors, { message: errorMessage }])
      setHasCheckedFbRedirect(true)
      return
    }
    grantedScopes = exchangeCodeforTokenRes.scopes

    // If user has an artist make sure to update the access token in the db
    if (artistId) {
      const { res: saveAccessTokenRes, error } = await saveAccessToken()

      if (error) {
        setErrors([...errors, { message: error.message }])
        setHasCheckedFbRedirect(true)
        return
      }
      grantedScopes = saveAccessTokenRes.scopes
    }

    // Set missing scopes in auth context
    checkAndSetMissingScopes(grantedScopes)

    setIsFacebookRedirect(true)
    setHasCheckedFbRedirect(true)
  }, [])

  React.useEffect(() => {
    return () => setIsFacebookRedirect(false)
  }, [setIsFacebookRedirect])

  return { hasCheckedFbRedirect }
}

export default useFbRedirect
