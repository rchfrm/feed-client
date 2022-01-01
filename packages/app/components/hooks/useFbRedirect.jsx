import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import { parseUrl, setLocalStorage, getLocalStorage } from '@/helpers/utils'
import { updateAccessToken } from '@/app/helpers/artistHelpers'
import { setFacebookAccessToken } from '@/app/helpers/facebookHelpers'
import { requiredScopesAccount } from '@/helpers/firebaseHelpers'

import * as ROUTES from '@/app/constants/routes'

const useFbRedirect = (errors, setErrors) => {
  const [hasCheckedFbRedirect, setHasCheckedFbRedirect] = React.useState(false)

  const { setIsFacebookRedirect, setMissingScopes } = React.useContext(AuthContext)
  const { artistId, setArtist } = React.useContext(ArtistContext)

  const stateLocalStorageKey = 'redirectState'
  const router = useRouter()

  const exchangeCodeForAccessToken = async (code) => {
    const redirectUrl = `${process.env.react_app_url}${ROUTES.CONNECT_ACCOUNTS}`
    const { res, error } = await setFacebookAccessToken(code, redirectUrl)

    setLocalStorage(stateLocalStorageKey, '')
    router.replace(router.pathname, null)

    if (error) {
      setErrors([error])
    }

    return res
  }

  const checkAndSetMissingScopes = (grantedScopes) => {
    const missingScopes = requiredScopesAccount.filter((scope) => !grantedScopes.includes(scope))

    if (missingScopes.length) {
      setMissingScopes(missingScopes)
    }
  }

  const saveAccessToken = async () => {
    const { res, error } = await updateAccessToken(artistId)

    if (error) {
      setErrors([error])
    }

    // Update facebook granted scopes in artist context
    setArtist({
      type: 'update-facebook-integration-scopes',
      payload: {
        scopes: res.scopes,
      },
    })

    return res
  }

  useAsyncEffect(async (isMounted) => {
    // Try to grab query params from Facebook redirect
    const { query } = parseUrl(router.asPath)
    const code = decodeURIComponent(query?.code || '')
    const state = decodeURIComponent(query?.state)
    const redirectError = decodeURIComponent(query?.error_description || '').replace('+', ' ')

    /*
    Return early if:
    - Unmounted
    - No FB redirect code
    - Redirect error
    - The state param from the callback doesn't match the state we passed during the redirect request
    */
    if (!isMounted() || !code || redirectError || state !== getLocalStorage(stateLocalStorageKey)) {
      setHasCheckedFbRedirect(true)
      setLocalStorage(stateLocalStorageKey, '')
      router.replace(router.pathname, null)

      if (redirectError) {
        setErrors([...errors, { message: redirectError }])
      }
      return
    }

    const { scopes: grantedScopes } = await exchangeCodeForAccessToken(code)

    checkAndSetMissingScopes(grantedScopes)

    if (artistId) {
      await saveAccessToken()
    }

    setIsFacebookRedirect(true)
    setHasCheckedFbRedirect(true)
  }, [])

  React.useEffect(() => {
    return () => setIsFacebookRedirect(false)
  }, [setIsFacebookRedirect])

  return { hasCheckedFbRedirect }
}

export default useFbRedirect
