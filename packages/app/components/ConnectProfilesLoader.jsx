import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'

import { useImmerReducer } from 'use-immer'
import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

// IMPORT ELEMENTS
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import ButtonHelp from '@/elements/ButtonHelp'

import ConnectProfilesFacebook from '@/app/ConnectProfilesFacebook'
import ConnectProfilesList from '@/app/ConnectProfilesList'
import ConnectProfilesConnectButton from '@/app/ConnectProfilesConnectButton'
import ConnectProfilesIsConnecting from '@/app/ConnectProfilesIsConnecting'
import ConnectProfilesNoArtists from '@/app/ConnectProfilesNoArtists'
import ConnectProfilesAlreadyConnected from '@/app/ConnectProfilesAlreadyConnected'

// IMPORT HELPERS
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'

import * as ROUTES from '@/app/constants/routes'
import copy from '@/app/copy/connectProfilesCopy'

const artistsReducer = (draftState, action) => {
  const { type: actionType, payload } = action

  switch (actionType) {
    case 'add-artists':
      Object.entries(payload.artists).forEach(([key, value]) => {
        draftState[key] = value
      })
      break
    case 'toggle-connect':
      draftState[payload.id].connect = !draftState[payload.id].connect
      break
    default:
      throw new Error(`Could not find ${actionType} in artistsReducer`)
  }
}

const ConnectProfilesLoader = ({
  isConnecting,
  setIsConnecting,
  className,
}) => {
  // IMPORT CONTEXTS
  const {
    auth,
    authError,
    setAuthError,
    isFacebookRedirect,
    setIsFacebookRedirect,
  } = React.useContext(AuthContext)
  const { user, userLoading } = React.useContext(UserContext)
  const { connectArtists } = React.useContext(ArtistContext)
  // Get any missing scopes
  const { missingScopes: { account: missingScopes } } = auth

  // DEFINE LOADING VERSIONS
  const [pageLoading, setPageLoading] = React.useState(true)
  const [fetchedArtistsFinished, setFetchedArtistsFinished] = React.useState(false)

  // DEFINE BUTTON STATE (disabled if required fields are absent)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [disabledReason, setDisabledReason] = React.useState('')

  // DEFINE ERRORS
  const [errors, setErrors] = React.useState([])

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

  // DEFINE ARTIST INTEGRATIONS
  const initialArtistAccountsState = {}
  const [artistAccounts, setArtistAccounts] = useImmerReducer(artistsReducer, initialArtistAccountsState)

  // Function to UPDATE ARTIST STATE
  const updateArtists = React.useCallback((actionType, payload) => {
    setArtistAccounts({
      type: actionType,
      payload,
    })
  }, [setArtistAccounts])

  // * GET INITIAL DATA FROM SERVER
  useAsyncEffect(async (isMounted) => {
    // Stop here if user is loading or profiles are being connected
    if (userLoading || isConnecting) return
    // If missing scopes, we need to show the connect button
    if (missingScopes.length) return setPageLoading(false)
    // Stop here if we haven either auth or fb auth errors
    if (errors.length) return setPageLoading(false)
    // START FETCHING ARTISTS
    const { res, error } = await artistHelpers.getArtistOnSignUp()
    if (error) {
      if (!isMounted()) return
      setErrors([...errors, error])
      setPageLoading(false)
      return
    }
    setFetchedArtistsFinished(true)
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
    setArtistAccounts({
      type: 'add-artists',
      payload: {
        artists: processedArtists,
      },
    })
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
    return <ConnectProfilesIsConnecting artistAccounts={artistAccounts} />
  }

  if (pageLoading || isConnecting) return <Spinner />

  // If no artists accounts, show FB BUTTON
  if (Object.keys(artistAccounts).length === 0) {
    return (
      <div className={className}>
        <div className="col-span-12 sm:col-span-6">
          <ConnectProfilesFacebook
            auth={auth}
            errors={errors}
            setErrors={setErrors}
            isFindMore={user?.artists.length > 0}
            isConnecting={isConnecting}
          />
          {fetchedArtistsFinished && (
            <ConnectProfilesNoArtists className="max-w-xl mb-8" />
          )}
          {!isConnecting && (
            <ConnectProfilesAlreadyConnected className="mb-12" />
          )}
          <ButtonHelp
            content={copy.helpText}
            text="Need help?"
            label="Connect accounts help"
            className="font-bold"
          />
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* ERRORS */}
      {errors.map((error, index) => {
        return <Error error={error} key={index} className="col-span-12" />
      })}

      {/* BUTTON TO CONNECT ACCOUNT */}
      <ConnectProfilesConnectButton
        artistAccounts={artistAccounts}
        setErrors={setErrors}
        setIsConnecting={setIsConnecting}
        disabled={buttonDisabled}
        disabledReason={disabledReason}
        className="col-span-12 sm:col-span-8 mb-12"
      />

      {/* LIST OF PROFILES */}
      <ConnectProfilesList
        auth={auth}
        artistAccounts={artistAccounts}
        updateArtists={updateArtists}
        setButtonDisabled={setButtonDisabled}
        setDisabledReason={setDisabledReason}
        errors={errors}
        setErrors={setErrors}
        className="col-span-12 mb-12"
      />
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
