import React from 'react'
import PropTypes from 'prop-types'

import { useImmerReducer } from 'use-immer'
import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { UserContext } from '@/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import Error from '@/elements/Error'

import ConnectProfilesFacebook from '@/app/ConnectProfilesFacebook'
import ConnectProfilesList from '@/app/ConnectProfilesList'
import ConnectProfilesConnectButton from '@/app/ConnectProfilesConnectButton'
import ConnectProfilesNoArtists from '@/app/ConnectProfilesNoArtists'

// IMPORT HELPERS
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import { sortArrayByKey } from '@/helpers/utils'
import * as artistHelpers from '@/app/helpers/artistHelpers'
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
    case 'update-artist':
      draftState[payload.id][payload.field] = payload.value
      break
    default:
      throw new Error(`Could not find ${actionType} in artistsReducer`)
  }
}

const ConnectProfilesLoader = ({
  isSignupStep,
  className,
}) => {
  // IMPORT CONTEXTS
  const { auth, accessToken, authError, setAuthError } = React.useContext(AuthContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  const { user, userLoading } = React.useContext(UserContext)
  // Get any missing scopes
  const { missingScopes } = auth

  // DEFINE LOADING
  const [pageLoading, setPageLoading] = React.useState(false)
  const [fetchedArtistsFinished, setFetchedArtistsFinished] = React.useState(true)

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
    // Stop here if user is loading
    if (userLoading) return
    // If missing scopes, we need to show the connect button
    if (missingScopes.length) return toggleGlobalLoading(false)
    // If no access token, then there will be no way to talk to facebook
    // so don't set artists accounts
    if (!accessToken) return toggleGlobalLoading(false)
    // START FETCHING ARTISTS
    setPageLoading(true)
    setFetchedArtistsFinished(false)
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
  }, [userLoading])


  // Set initial error (if any)
  React.useEffect(() => {
    setErrors([authError])
  }, [authError])

  if (pageLoading) return null

  // If no artists accounts, show FB BUTTON
  if (Object.keys(artistAccounts).length === 0) {
    return (
      <div className={className}>
        {fetchedArtistsFinished && (
          <ConnectProfilesNoArtists className="max-w-xl mb-6" />
        )}
        <ConnectProfilesFacebook
          auth={auth}
          errors={errors}
          setErrors={setErrors}
          isSignupStep={isSignupStep}
        />
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
      />

      {/* BUTTON TO CONNECT ACCOUNT */}
      <ConnectProfilesConnectButton
        artistAccounts={artistAccounts}
        accessToken={accessToken}
        setErrors={setErrors}
        disabled={buttonDisabled}
        disabledReason={disabledReason}
      />

      {/* BUTTON TO FIND MORE PROFILES */}
      <ConnectProfilesFacebook
        auth={auth}
        errors={errors}
        setErrors={setErrors}
        isFindMore
        className="max-w-3xl pt-14"
      />

    </div>
  )
}

ConnectProfilesLoader.propTypes = {
  isSignupStep: PropTypes.bool,
  className: PropTypes.string,
}

ConnectProfilesLoader.defaultProps = {
  isSignupStep: false,
  className: null,
}

export default ConnectProfilesLoader
