import React from 'react'
import Router from 'next/router'
import { useImmerReducer } from 'use-immer'
import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { AuthContext } from '@/contexts/AuthContext'
import { ArtistContext } from '@/contexts/ArtistContext'
import { UserContext } from '@/contexts/UserContext'
import { InterfaceContext } from '@/contexts/InterfaceContext'
// IMPORT ELEMENTS
import ConnectAccountsFacebook from '@/app/ConnectAccountsFacebook'
import ConnectAccounts from '@/app/ConnectAccounts'
import Button from '@/elements/Button'
import Error from '@/elements/Error'

// IMPORT CONSTANTS
import * as ROUTES from '@/app/constants/routes'

// IMPORT HELPERS
import { fireSentryError } from '@/app/helpers/sentryHelpers'
import * as artistHelpers from '@/app/helpers/artistHelpers'
import styles from '@/app/ConnectAccounts.module.css'
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

const ConnectAccountsLoader = ({ onSignUp }) => {
  // IMPORT CONTEXTS
  const { auth, accessToken, authError, setAuthError } = React.useContext(AuthContext)
  const { connectArtists, setArtistLoading } = React.useContext(ArtistContext)

  const { user } = React.useContext(UserContext)
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
  // Function to update artist state
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
    setPageLoading(true)
    const availableArtists = await artistHelpers.getArtistOnSignUp(accessToken)
      .catch((error) => {
        // Track
        fireSentryError({
          category: 'sign up',
          action: 'Error with artistHelpers.getArtistOnSignUp()',
          description: error.message,
        })
        if (!isMounted) return
        setErrors([error])
      })
    if (!availableArtists) {
      setPageLoading(false)
      toggleGlobalLoading(false)
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
    const processedArtists = await artistHelpers.addAdAccountsToArtists({ accounts, adAccounts })
    if (!isMounted) return
    // Error if no ad accounts
    if (!adaccounts.length) {
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

    // Error if no artist accounts
    if (Object.keys(accounts).length === 0) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setPageLoading(false)
      toggleGlobalLoading(false)
      // Track
      fireSentryError({
        category: 'sign up',
        action: 'No Facebook Pages were found after running artistHelpers.getArtistOnSignUp()',
      })
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


  // Run this to create artist
  const runCreateArtist = async e => {
    e.preventDefault()

    // Santise URLs
    const artistAccountsSanitised = artistHelpers.sanitiseArtistAccountUrls(artistAccounts)

    try {
      toggleGlobalLoading(true)
      await connectArtists(artistAccountsSanitised, accessToken, user)
      Router.push(ROUTES.HOME)
    } catch (err) {
      toggleGlobalLoading(false)
      setArtistLoading(false)
      setErrors([err])
    }
  }

  if (pageLoading) return null

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

      <div style={{ textAlign: 'right' }}>

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

      {/* Button to find more profiles */}
      <ConnectAccountsFacebook
        auth={auth}
        errors={errors}
        setErrors={setErrors}
        showFindMore
      />

    </div>
  )
}

export default ConnectAccountsLoader
