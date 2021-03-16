import React from 'react'
import PropTypes from 'prop-types'

import { useImmerReducer } from 'use-immer'
import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import Error from '@/elements/Error'

import ConnectProfilesFacebook from '@/app/ConnectProfilesFacebook'
import ConnectProfilesList from '@/app/ConnectProfilesList'
import ConnectProfilesConnectButton from '@/app/ConnectProfilesConnectButton'

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

const ConnectProfilesLoader = ({ isSignupStep }) => {
  // IMPORT CONTEXTS
  const { auth, accessToken, authError, setAuthError } = React.useContext(AuthContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)
  // Get any missing scopes
  const { missingScopes } = auth

  // DEFINE LOADING
  const [pageLoading, setPageLoading] = React.useState(false)

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
    // If missing scopes, we need to show the connect button
    if (missingScopes.length) return toggleGlobalLoading(false)
    // If no access token, then there will be no way to talk to facebook
    // so don't set artists accounts
    if (!accessToken) return toggleGlobalLoading(false)
    // START FETCHING ARTISTS
    setPageLoading(true)
    const { res: artistsAndAccounts, error } = await artistHelpers.getArtistOnSignUp(accessToken)
    if (error) {
      if (!isMounted) return
      setErrors([error])
      setPageLoading(false)
      toggleGlobalLoading(false)
      return
    }
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
    // Sort ad accounts
    // Error if no artist accounts
    const adAccountsSorted = sortArrayByKey(adAccounts, 'name')
    // Add ad accounts to artists
    const processedArtists = await artistHelpers.addAdAccountsToArtists({ artists, adAccounts: adAccountsSorted })
    if (!isMounted) return
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
  }, [])


  // Set initial error (if any)
  React.useEffect(() => {
    setErrors([authError])
  }, [authError])

  if (pageLoading) return null

  // If no artists accounts, show FB BUTTON
  if (Object.keys(artistAccounts).length === 0) {
    return (
      <ConnectProfilesFacebook
        auth={auth}
        errors={errors}
        setErrors={setErrors}
        isSignupStep={isSignupStep}
      />
    )
  }

  return (
    <div>
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
        className="max-w-3xl pt-16"
      />

    </div>
  )
}

ConnectProfilesLoader.propTypes = {
  isSignupStep: PropTypes.bool,
}

ConnectProfilesLoader.defaultProps = {
  isSignupStep: false,
}

export default ConnectProfilesLoader
