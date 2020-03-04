import React from 'react'
import Router from 'next/router'

import useAsyncEffect from 'use-async-effect'

// IMPORT CONTEXTS
import { NavigationContext } from './contexts/Navigation'
import { AuthContext } from './contexts/Auth'
import { UserContext } from './contexts/User'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import ConnectArtists from './ConnectArtists'
import PageHeader from './PageHeader'
import Spinner from './elements/Spinner'
import Button from './elements/Button'

import Error from './elements/Error'

// IMPORT PAGES
import ConnectArtistFacebook from './ConnectArtistFacebook'
// IMPORT ASSETS

// IMPORT CONSTANTS
import * as ROUTES from '../constants/routes'
import brandColours from '../constants/brandColours'

// IMPORT HELPERS
import server from './helpers/server'
import artistHelpers from './helpers/artistHelpers'


const LoadContent = () => {
  // IMPORT CONTEXTS
  const { accessToken, authLoading, getToken, authError } = React.useContext(AuthContext)
  const { user, userLoading } = React.useContext(UserContext)
  const { artist, artistLoading, createArtist, setArtistLoading } = React.useContext(ArtistContext)

  // DEFINE LOADING
  const [pageLoading, setPageLoading] = React.useState(false)
  const [redirecting, setRedirecting] = React.useState(false)

  // DEFINE ERRORS
  const [error, setError] = React.useState(null)

  // DEFINE ARTIST INTEGRATIONS
  const initialArtistAccountsState = {}
  const [artistAccounts, setArtistAccounts] = React.useState(initialArtistAccountsState)

  // PUSH TO RELEVANT PAGE IF THERE IS A SIGNED IN USER WITH ARTISTS, OR NO SIGNED IN USER
  React.useLayoutEffect(() => {
    // If user is still loading, exit
    if (userLoading) return
    // If artist is still loading, exit
    if (artistLoading) return
    // If there is no auth user, push to log in page
    if (!user.id) {
      setRedirecting(true)
      Router.push(ROUTES.LOGIN)
      return
    }
    // If there is no selected artist, exit
    if (!artist.id) return
    // If the artist has artists, push to home page
    if (user.artists.length > 0) {
      setRedirecting(true)
      Router.push(ROUTES.HOME)
    }
  }, [artist.id, artistLoading, user.artists, user.id, userLoading])

  // * GET INITIAL DATA FROM SERVER
  useAsyncEffect(async (isMounted) => {
    setPageLoading(true)
    const token = await getToken()
    const availableArtists = await server.getArtistOnSignUp(accessToken, token)
      .catch((err) => {
        if (!isMounted) return
        console.error(err)
        setError(err)
      })
    // Sort ad accounts alphabetically
    const availableArtistsSorted = {
      ...availableArtists,
      adaccounts: artistHelpers.sortArtistsAlphabetically(availableArtists.adaccounts),
    }
    // Process the ad accounts
    console.log('availableArtistsSorted', availableArtistsSorted)
    const { accounts, adaccounts } = availableArtistsSorted
    const processedArtists = await artistHelpers.addAdAccountsToArtists(accounts, adaccounts)
    console.log('processedArtists', processedArtists)
    if (!isMounted) return
    // Now add the artists...
    const action = {
      type: 'add-artists',
      payload: {
        artists: processedArtists,
      },
    }
    const newArtistsState = artistHelpers.getNewArtistState(artistAccounts, action)
    console.log('newArtistsState', newArtistsState)
    setArtistAccounts(newArtistsState)
    setPageLoading(false)
  }, [])


  // Set initial error (if any)
  React.useEffect(() => {
    setError(authError)
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
      setError(err)
    }
  }

  if (authLoading || userLoading || artistLoading || pageLoading || redirecting) {
    return <Spinner width={50} colour={brandColours.green.hex} />
  } if (Object.keys(artistAccounts).length === 0) {
    return (
      <ConnectArtistFacebook
        artistAccounts={artistAccounts}
        setArtistAccounts={setArtistAccounts}
        error={error}
        setError={setError}
        setPageLoading={setPageLoading}
      />
    )
  }
  return (
    <div style={{ width: '100%' }}>
      <ConnectArtists
        artistAccounts={artistAccounts}
        setArtistAccounts={setArtistAccounts}
        setError={setError}
      />

      <div className="ninety-wide" style={{ textAlign: 'right' }}>

        <Error error={error} />

        <p>&nbsp;</p>

        <Button
          version="black progress"
          onClick={runCreateArtist}
          disabled={false}
        >
          next
        </Button>

      </div>

    </div>
  )
}


const ConnectArtisPageNew = () => {
  // SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  return (
    <div className={`page-container ${className}`}>

      <PageHeader heading="connect artist accounts" />

      <LoadContent />

    </div>
  )
}

ConnectArtisPageNew.propTypes = {

}

export default ConnectArtisPageNew
