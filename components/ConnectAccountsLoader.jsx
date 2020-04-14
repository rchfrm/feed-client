import React from 'react'
import Router from 'next/router'

import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import ConnectAccountsFacebook from './ConnectAccountsFacebook'
import ConnectAccounts from './ConnectAccounts'
import Spinner from './elements/Spinner'
import Button from './elements/Button'
import Error from './elements/Error'

// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'

// IMPORT HELPERS
import artistHelpers from './helpers/artistHelpers'

const ConnectAccountsLoader = () => {
  // IMPORT CONTEXTS
  const { auth, accessToken, authError } = React.useContext(AuthContext)
  const { createArtist, setArtistLoading } = React.useContext(ArtistContext)
  // Get any missing scopes
  const { missingScopes } = auth

  // DEFINE LOADING
  const [pageLoading, setPageLoading] = React.useState(false)
  const [redirecting, setRedirecting] = React.useState(false)

  // DEFINE BUTTON STATE (disabled if required fields are absent)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)

  // DEFINE ERRORS
  const [errors, setErrors] = React.useState([])

  // DEFINE ARTIST INTEGRATIONS
  const initialArtistAccountsState = {}
  const [artistAccounts, setArtistAccounts] = React.useState(initialArtistAccountsState)

  // * GET INITIAL DATA FROM SERVER
  useAsyncEffect(async (isMounted) => {
    // If missing scopes, we need to show the connect button
    if (missingScopes.length) return
    // If no access token, then there will be no way to talk to facebook
    // so don't set artists accounts
    if (!accessToken) return
    setPageLoading(true)
    const availableArtists = await artistHelpers.getArtistOnSignUp(accessToken)
      .catch((err) => {
        console.error(err)
        if (!isMounted) return
        setErrors([err])
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
      setErrors([...errors, { message: 'No ad accounts were found' }])
      setPageLoading(false)
      return
    }

    // Error if no artist accounts
    if (Object.keys(accounts).length === 0) {
      setErrors([...errors, { message: 'No accounts were found' }])
      setPageLoading(false)
    }

    // Now add the artists...
    const action = {
      type: 'add-artists',
      payload: {
        artists: processedArtists,
      },
    }

    const newArtistsState = artistHelpers.getNewArtistState(artistAccounts, action)
    setArtistAccounts(newArtistsState)
    setPageLoading(false)
  }, [])


  // Set initial error (if any)
  React.useEffect(() => {
    setErrors([authError])
  }, [authError])


  // Run this to create artist
  const runCreateArtist = async e => {
    e.preventDefault()

    try {
      setRedirecting(true)
      await createArtist(artistAccounts, accessToken)
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
      <>
        <ConnectAccountsFacebook
          auth={auth}
          errors={errors}
          setErrors={setErrors}
        />
      </>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <ConnectAccounts
        artistAccounts={artistAccounts}
        setArtistAccounts={setArtistAccounts}
        setButtonDisabled={setButtonDisabled}
        setErrors={setErrors}
      />

      <div className="ninety-wide" style={{ textAlign: 'right' }}>

        {/* Errors */}
        {errors.map((error, index) => {
          return <Error error={error} key={index} />
        })}

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
