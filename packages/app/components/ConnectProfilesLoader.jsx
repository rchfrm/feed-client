import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import useAsyncEffect from 'use-async-effect'

import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Spinner from '@/elements/Spinner'
import ButtonHelp from '@/elements/ButtonHelp'

import ConnectProfilesIsConnecting from '@/app/ConnectProfilesIsConnecting'
import ConnectProfilesList from '@/app/ConnectProfilesList'
import ConnectProfilesConnectMore from '@/app/ConnectProfilesConnectMore'

// IMPORT HELPERS
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/connectProfilesCopy'

const ConnectProfilesLoader = ({
  isConnecting,
  setIsConnecting,
  className,
}) => {
  const [artistAccounts, setArtistAccounts] = React.useState([])
  const [selectedProfile, setSelectedProfile] = React.useState(null)
  const [pageLoading, setPageLoading] = React.useState(true)
  const [errors, setErrors] = React.useState([])

  const {
    auth,
    authError,
    setAuthError,
    isFacebookRedirect,
    setIsFacebookRedirect,
  } = React.useContext(AuthContext)

  const { user, userLoading } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)

  const { missingScopes: { account: missingScopes } } = auth

  React.useEffect(() => {
    if (authError) {
      setErrors([authError])
    }
  }, [authError])

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
      setIsFacebookRedirect(false)
    }
  }, [setAuthError, authError, setIsFacebookRedirect])


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
      setErrors([...errors, error])
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

    // Remove profiles that have already been connected
    const userArtists = user?.artists || []
    const artistsFiltered = !user.artists.length ? artistAccounts : artistHelpers.removeAlreadyConnectedArtists(artistAccounts, userArtists)

    // Add ad accounts to artists
    const processedArtists = await artistHelpers.processArtists({ artists: artistsFiltered })

    if (!isMounted()) return
    setArtistAccounts(processedArtists)

    // Handle connecting a single artist
    if (Object.keys(processedArtists).length === 1 && isFacebookRedirect) {
      setPageLoading(false)
      const artistToConnect = Object.values(artistsFiltered).map((artistFiltered) => artistFiltered)

      // Santise URLs
      const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(artistToConnect)

      setIsConnecting(true)
      const { error } = await connectArtists(artistAccountsSanitised, user) || {}

      if (error) {
        setIsConnecting(false)
        setErrors(errors => [...errors, error])
        setIsConnecting(false)
        return
      }

      Router.push(ROUTES.HOME)
      return
    }
    setPageLoading(false)
  }, [userLoading, isConnecting])

  if (isConnecting && Object.keys(artistAccounts).length > 0) {
    return <ConnectProfilesIsConnecting artistAccounts={selectedProfile} />
  }

  if (pageLoading || isConnecting) return <Spinner />

  return (
    <div className={className}>
      <div className="col-span-12 sm:col-span-6">
        <ConnectProfilesList
          auth={auth}
          artistAccounts={artistAccounts}
          setSelectedProfile={setSelectedProfile}
          errors={errors}
          setErrors={setErrors}
        />
        <ButtonHelp
          content={copy.helpText}
          text="More info on permissions!"
          label="Connect accounts help"
          className="font-bold"
        />
      </div>
      <div className="hidden sm:block col-span-6">
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
