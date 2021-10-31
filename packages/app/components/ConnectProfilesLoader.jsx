import React from 'react'
import PropTypes from 'prop-types'

import Router from 'next/router'

import { useImmerReducer } from 'use-immer'
import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/app/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'

import ConnectProfilesFacebook from '@/app/ConnectProfilesFacebook'
import ConnectProfilesList from '@/app/ConnectProfilesList'
import ConnectProfilesConnectButton from '@/app/ConnectProfilesConnectButton'
import ConnectProfilesNoArtists from '@/app/ConnectProfilesNoArtists'
import ButtonHelp from '@/elements/ButtonHelp'

// IMPORT HELPERS
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import { sortArrayByKey } from '@/helpers/utils'
import * as artistHelpers from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/connectProfilesCopy'

const artistsReducer = (draftState, action) => {
  const { type: actionType, payload } = action
  const artistAccount = draftState[payload.id] || {}
  const { available_facebook_ad_accounts: availableAdAccounts } = artistAccount
  const selectedAdAccount = actionType === 'update-artist-adaccount' ? availableAdAccounts.find(({ id }) => id === payload.value) : null
  switch (actionType) {
    case 'add-artists':
      Object.entries(payload.artists).forEach(([key, value]) => {
        draftState[key] = value
      })
      break
    case 'toggle-connect':
      draftState[payload.id].connect = !draftState[payload.id].connect
      break
    case 'update-artist':
      draftState[payload.id][payload.field] = payload.value
      break
    case 'update-artist-adaccount':
      draftState[payload.id].adaccount_id = payload.value
      draftState[payload.id].selected_facebook_ad_account = selectedAdAccount
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
  const { auth, accessToken, authError, setAuthError } = React.useContext(AuthContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const { user, userLoading } = React.useContext(UserContext)
  // Get any missing scopes
  const { missingScopes } = auth

  // DEFINE LOADING VERSIONS
  const [pageLoading, setPageLoading] = React.useState(false)
  const [fetchedArtistsFinished, setFetchedArtistsFinished] = React.useState(false)

  // DEFINE BUTTON STATE (disabled if required fields are absent)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [disabledReason, setDisabledReason] = React.useState('')

  // DEFINE ERRORS
  const [errors, setErrors] = React.useState([authError])

  // Clear auth error when leaving page
  React.useEffect(() => {
    return () => {
      setAuthError(null)
    }
  }, [setAuthError])

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
    if (missingScopes.length) return toggleGlobalLoading(false)
    // If no access token, then there will be no way to talk to facebook
    // so don't set artists accounts
    if (!accessToken) return toggleGlobalLoading(false)
    // START FETCHING ARTISTS
    setPageLoading(true)
    const { res: artistsAndAccounts, error } = await artistHelpers.getArtistOnSignUp(accessToken)
    if (error) {
      if (!isMounted()) return
      setErrors([error])
      setPageLoading(false)
      toggleGlobalLoading(false)
      return
    }
    setFetchedArtistsFinished(true)
    const { accounts: artists, adaccounts: adAccounts } = artistsAndAccounts
    // Error if no artist accounts
    if (Object.keys(artists).length === 0) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setPageLoading(false)
      toggleGlobalLoading(false)
      // Track
      fireSentryError({
        category: 'sign up',
        action: 'No Facebook Pages were found after running artistHelpers.getArtistOnSignUp()',
      })
    }
    // Remove profiles that have already been connected
    const userArtists = user?.artists || []
    const artistsFiltered = !user.artists.length ? artists : artistHelpers.removeAlreadyConnectedArtists(artists, userArtists)
    // Sort ad accounts
    const adAccountsSorted = sortArrayByKey(adAccounts, 'name')
    // Add ad accounts to artists
    const processedArtists = await artistHelpers.addAdAccountsToArtists({ artists: artistsFiltered, adAccounts: adAccountsSorted })
    if (!isMounted()) return
    // Error if no ad accounts
    if (!adAccounts.length) {
      setErrors([...errors, { message: copy.noAdAccountsError }])
      setPageLoading(false)
      toggleGlobalLoading(false)
      // Track
      fireSentryError({
        category: 'sign up',
        action: 'No ad accounts were found after running artistHelpers.getArtistOnSignUp()',
      })
      return
    }
    setArtistAccounts({
      type: 'add-artists',
      payload: {
        artists: processedArtists,
      },
    })
    setPageLoading(false)
    toggleGlobalLoading(false)
  }, [userLoading, isConnecting])


  // Set initial error (if any)
  React.useEffect(() => {
    setErrors([authError])
  }, [authError])

  if (pageLoading || isConnecting) return <Spinner />

  // If no artists accounts, show FB BUTTON
  if (Object.keys(artistAccounts).length === 0) {
    return (
      <div className={className}>
        <ConnectProfilesFacebook
          auth={auth}
          errors={errors}
          setErrors={setErrors}
        />
        <ButtonHelp
          content={copy.helpText}
          text="Need help?"
          label="Connect accounts help"
        />
        {fetchedArtistsFinished && (
          <ConnectProfilesNoArtists className="max-w-xl mb-2 mt-6" />
        )}
      </div>
    )
  }

  return (
    <div className={className}>
      {/* ERRORS */}
      {errors.map((error, index) => {
        return <Error error={error} key={index} />
      })}

      {/* LIST OF PROFILES */}
      <ConnectProfilesList
        artistAccounts={artistAccounts}
        updateArtists={updateArtists}
        setButtonDisabled={setButtonDisabled}
        setDisabledReason={setDisabledReason}
        setErrors={setErrors}
        className="mb-12"
      >
        {/* BUTTON TO FIND MORE PROFILES */}
        <ConnectProfilesFacebook
          auth={auth}
          errors={errors}
          setErrors={setErrors}
          isFindMore
          className=""
        />
      </ConnectProfilesList>

      {/* BUTTON TO CONNECT ACCOUNT */}
      <ConnectProfilesConnectButton
        artistAccounts={artistAccounts}
        accessToken={accessToken}
        setErrors={setErrors}
        setIsConnecting={setIsConnecting}
        disabled={buttonDisabled}
        disabledReason={disabledReason}
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
