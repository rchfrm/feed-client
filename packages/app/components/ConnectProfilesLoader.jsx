import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'

import Spinner from '@/elements/Spinner'

import ConnectProfilesIsConnecting from '@/app/ConnectProfilesIsConnecting'
import ConnectProfilesList from '@/app/ConnectProfilesList'
import ConnectProfilesConnectMore from '@/app/ConnectProfilesConnectMore'
import ConnectProfilesButtonHelp from '@/app/ConnectProfilesButtonHelp'

// IMPORT HELPERS
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'

const ConnectProfilesLoader = ({
  isConnecting,
  setIsConnecting,
  className,
}) => {
  const [allArtistAccounts, setAllArtistAccounts] = React.useState([])
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [pageLoading, setPageLoading] = React.useState(true)
  const [errors, setErrors] = React.useState([])

  const {
    auth,
    authError,
    setAuthError,
    setIsPlatformRedirect,
  } = React.useContext(AuthContext)

  const { user, userLoading } = React.useContext(UserContext)

  const { missingScopes: { ads: missingScopes } } = auth

  React.useEffect(() => {
    if (authError) {
      setErrors([authError])
    }
  }, [authError])

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
      setIsPlatformRedirect(false)
    }
  }, [setAuthError, authError, setIsPlatformRedirect])


  // Get initial data from server
  useAsyncEffect(async (isMounted) => {
    // Stop here if user is loading or profiles are being connected
    if (userLoading || isConnecting) return

    // If missing scopes, we need to show the connect button
    if (missingScopes.length) return setPageLoading(false)

    // Stop here if we haven either auth or fb auth errors
    if (errors.length) return setPageLoading(false)

    // Start fetching artists
    const { res, error } = await artistHelpers.getArtistOnSignUp()

    if (error) {
      if (!isMounted()) return

      if (error.message !== 'user cache is not available') {
        setErrors([...errors, error])
      }
      setPageLoading(false)
      return
    }

    const { accounts: artistAccounts } = res

    // Error if no artist accounts
    if (Object.keys(artistAccounts).length === 0) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setPageLoading(false)

      // Track
      fireSentryError({
        category: 'sign up',
        action: 'No Facebook Pages were found after running artistHelpers.getArtistOnSignUp()',
      })
    }

    setAllArtistAccounts(Object.values(artistAccounts).map((artist) => artist))

    // Remove profiles that have already been connected
    const userArtists = user?.artists || []
    const artistsFiltered = !user.artists.length ? artistAccounts : artistHelpers.removeAlreadyConnectedArtists(artistAccounts, userArtists)

    // Add ad accounts to artists
    const processedArtists = await artistHelpers.processArtists({ artists: artistsFiltered })

    if (!isMounted()) return

    setArtistAccounts(processedArtists)

    setPageLoading(false)
  }, [userLoading, isConnecting])

  if (isConnecting && artistAccounts.length > 0) {
    return <ConnectProfilesIsConnecting profile={selectedProfile} />
  }

  if (pageLoading || isConnecting) return <Spinner />

  return (
    <div className={className}>
      <div className="col-span-12 sm:col-span-6">
        <ConnectProfilesList
          allArtistAccounts={allArtistAccounts}
          artistAccounts={artistAccounts}
          setSelectedProfile={setSelectedProfile}
          setIsConnecting={setIsConnecting}
        />
        <ConnectProfilesButtonHelp
          auth={auth}
          errors={errors}
          setErrors={setErrors}
          isConnecting={isConnecting}
        />
      </div>
      <div className="hidden sm:block col-span-6 lg:col-span-4">
        <ConnectProfilesConnectMore
          auth={auth}
          errors={errors}
          setErrors={setErrors}
          isConnecting={isConnecting}
        />
      </div>
    </div>
  )
}

ConnectProfilesLoader.propTypes = {
  isConnecting: PropTypes.bool.isRequired,
  setIsConnecting: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesLoader.defaultProps = {
  className: null,
}

export default ConnectProfilesLoader
