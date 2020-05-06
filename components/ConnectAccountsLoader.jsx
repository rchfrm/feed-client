import React from 'react'
import Router from 'next/router'
import { useImmerReducer } from 'use-immer'
import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
import { UserContext } from './contexts/User'
// IMPORT ELEMENTS
import ConnectAccountsFacebook from './ConnectAccountsFacebook'
import ConnectAccounts from './ConnectAccounts'
import Spinner from './elements/Spinner'
import Button from './elements/Button'
import Error from './elements/Error'

// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'

// IMPORT HELPERS
import { track } from './helpers/trackingHelpers'
import artistHelpers from './helpers/artistHelpers'
import styles from './ConnectAccounts.module.css'
import copy from '../copy/ConnectAccountsCopy'

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

const ConnectAccountsLoader = ({ onSignUp }) => {
  // IMPORT CONTEXTS
  const { auth, accessToken, authError, setAuthError } = React.useContext(AuthContext)
  const { createArtist, setArtistLoading } = React.useContext(ArtistContext)
  const { user } = React.useContext(UserContext)
  // Get any missing scopes
  const { missingScopes } = auth

  // DEFINE LOADING
  const [pageLoading, setPageLoading] = React.useState(false)
  const [redirecting, setRedirecting] = React.useState(false)

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
  }, [])

  // DEFINE ARTIST INTEGRATIONS
  const initialArtistAccountsState = {}
  const [artistAccounts, setArtistAccounts] = useImmerReducer(artistsReducer, initialArtistAccountsState)
  // Function to update artist state
  const updateArtists = React.useCallback((actionType, payload) => {
    setArtistAccounts({
      type: actionType,
      payload,
    })
  }, [])


  // * GET INITIAL DATA FROM SERVER
  useAsyncEffect(async (isMounted) => {
    // If missing scopes, we need to show the connect button
    if (missingScopes.length) return
    // If no access token, then there will be no way to talk to facebook
    // so don't set artists accounts
    if (!accessToken) return
    setPageLoading(true)
    const availableArtists = await artistHelpers.getArtistOnSignUp(accessToken)
      .catch((error) => {
        // Track
        track({
          category: 'sign up',
          action: 'Error with artistHelpers.getArtistOnSignUp()',
          description: error.message,
          error: true,
        })
        if (!isMounted) return
        setErrors([error])
      })
    if (!availableArtists) {
      setPageLoading(false)
      return
    }
    const { adaccounts } = availableArtists
    // Sort ad accounts alphabetically
    const availableArtistsSorted = {
      ...availableArtists,
      adAccounts: artistHelpers.sortArtistsAlphabetically(adaccounts),
    }
    // Process the ad accounts
    const { accounts, adAccounts } = availableArtistsSorted
    const processedArtists = await artistHelpers.addAdAccountsToArtists({ accounts, adAccounts, accessToken })
    if (!isMounted) return
    // Error if no ad accounts
    if (!adaccounts.length) {
      setErrors([...errors, { message: copy.noAdAccountsError }])
      setPageLoading(false)
      // Track
      track({
        category: 'sign up',
        action: 'No add accounts were found after running artistHelpers.getArtistOnSignUp()',
        error: true,
      })
      return
    }

    // Error if no artist accounts
    if (Object.keys(accounts).length === 0) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setPageLoading(false)
      // Track
      track({
        category: 'sign up',
        action: 'No accounts were found after running artistHelpers.getArtistOnSignUp()',
        error: true,
      })
    }

    setArtistAccounts({
      type: 'add-artists',
      payload: {
        artists: processedArtists,
      },
    })
    setPageLoading(false)
  }, [])


  // Set initial error (if any)
  React.useEffect(() => {
    setErrors([authError])
  }, [authError])


  // Run this to create artist
  const runCreateArtist = async e => {
    e.preventDefault()

    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(artistAccounts)

    try {
      setRedirecting(true)
      await createArtist(artistAccountsSanitised, accessToken, user)
      Router.push(ROUTES.HOME)
    } catch (err) {
      setRedirecting(false)
      setArtistLoading(false)
      setErrors([err])
    }
  }

  if (pageLoading || redirecting) {
    return <Spinner />
  }

  // If no artists accounts, show FB BUTTON
  if (Object.keys(artistAccounts).length === 0) {
    return (
      <ConnectAccountsFacebook
        auth={auth}
        errors={errors}
        setErrors={setErrors}
        onSignUp={onSignUp}
      />
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <ConnectAccounts
        artistAccounts={artistAccounts}
        updateArtists={updateArtists}
        setButtonDisabled={setButtonDisabled}
        setDisabledReason={setDisabledReason}
        setErrors={setErrors}
      />

      <div className="ninety-wide" style={{ textAlign: 'right' }}>

        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} key={index} />
        })}

        {disabledReason && (
          <p className={styles.disabledReason}>{disabledReason}</p>
        )}

        <Button
          version="black"
          onClick={runCreateArtist}
          disabled={buttonDisabled}
        >
          next
        </Button>

      </div>

    </div>
  )
}

export default ConnectAccountsLoader
