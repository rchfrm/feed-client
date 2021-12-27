import React from 'react'
import useAsyncEffect from 'use-async-effect'
import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'

import { parseUrl, setLocalStorage, getLocalStorage } from '@/helpers/utils'
import { setFacebookAccessToken } from '@/app/helpers/facebookHelpers'
import { requiredScopesAccount } from '@/helpers/firebaseHelpers'

import * as ROUTES from '@/app/constants/routes'

const useFbRedirect = (errors, setErrors) => {
  const [hasCheckedFbRedirect, setHasCheckedFbRedirect] = React.useState(false)

  const { setIsFacebookRedirect, setMissingScopes } = React.useContext(AuthContext)

  const router = useRouter()

  useAsyncEffect(async (isMounted) => {
    // Try to grab query params from Facebook redirect
    const { query } = parseUrl(router.asPath)
    const code = decodeURIComponent(query?.code || '')
    const state = decodeURIComponent(query?.state)
    const redirectError = decodeURIComponent(query?.error_description || '').replace('+', ' ')
    const stateLocalStorageKey = 'redirectState'

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

    // Exchange Facebook code for an access token which will be stored in the back-end
    const redirectUrl = `${process.env.react_app_url}${ROUTES.CONNECT_ACCOUNTS}`
    const { res, error } = await setFacebookAccessToken(code, redirectUrl)

    setLocalStorage(stateLocalStorageKey, '')
    router.replace(router.pathname, null)

    if (error) {
      setErrors([error])
    }

    if (res) {
      const { scopes: grantedScopes } = res
      const missingScopes = requiredScopesAccount.filter((scope) => !grantedScopes.includes(scope))

      if (missingScopes.length) {
        // Set missing scopes in Auth context
        setMissingScopes(missingScopes)
      }
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
