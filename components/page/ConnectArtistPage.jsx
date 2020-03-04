
// IMPORT PACKAGES
import React from 'react'
import Router from 'next/router'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { NavigationContext } from '../contexts/Navigation'
import { AuthContext } from '../contexts/Auth'
import { UserContext } from '../contexts/User'
import { ArtistContext } from '../contexts/Artist'
// IMPORT ELEMENTS
import ConnectedArtists from '../ConnectedArtists'
import PageHeader from '../PageHeader'
import Spinner from '../elements/Spinner'
import Button from '../elements/Button'

import Error from '../elements/Error'

// IMPORT PAGES
import ConnectArtistFacebook from '../ConnectArtistFacebook'
// IMPORT ASSETS

// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'

import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
import server from '../helpers/server'
import connectArtistHelpers from '../helpers/connectArtistHelpers'
import facebook from '../helpers/facebook'


const initialArtistAccountsState = []
const artistAccountsReducer = (artistAccountsState, artistAccountsAction) => {
  switch (artistAccountsAction.type) {
    case 'add-artist':
      return {
        ...artistAccountsState,
        ...artistAccountsAction.payload.artist,
      }
    case 'add-artists':
      return {
        ...artistAccountsState,
        ...artistAccountsAction.payload.artists,
      }
    case 'toggle-connect':
      return {
        ...artistAccountsState,
        [artistAccountsAction.payload.id]: {
          ...artistAccountsState[artistAccountsAction.payload.id],
          connect: !artistAccountsState[artistAccountsAction.payload.id].connect,
        },
      }
    case 'update-artist':
      return {
        ...artistAccountsState,
        [artistAccountsAction.payload.id]: {
          ...artistAccountsState[artistAccountsAction.payload.id],
          [artistAccountsAction.payload.field]: artistAccountsAction.payload.value,
        },
      }
    default:
      return {
        ...artistAccountsState,
      }
  }
}

function Loader() {
// IMPORT CONTEXTS
  const { accessToken, authLoading, getToken, authError } = React.useContext(AuthContext)
  const { user, userLoading } = React.useContext(UserContext)
  const { artist, artistLoading, createArtist, setArtistLoading } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE LOADING
  const [pageLoading, setPageLoading] = React.useState(false)
  const [activeRequest, setActiveRequest] = React.useState(false)
  const [redirecting, setRedirecting] = React.useState(false)
  // END DEFINE LOADING

  // DEFINE ERRORS
  const [error, setError] = React.useState(null)
  // END DEFINE ERRORS

  // DEFINE ARTIST INTEGRATIONS
  const [artistAccounts, setArtistAccounts] = React.useReducer(artistAccountsReducer, initialArtistAccountsState)
  // END DEFINE ARTIST INTEGRATIONS

  // PUSH TO RELEVANT PAGE IF THERE IS A SIGNED IN USER WITH ARTISTS, OR NO SIGNED IN USER
  React.useLayoutEffect(() => {
    // If user is still loading, exit
    if (userLoading) {
      return
    }

    // If artist is still loading, exit
    if (artistLoading) {
      return
    }

    // If there is no auth user, push to log in page
    if (!user.id) {
      setRedirecting(true)
      Router.push(ROUTES.LOGIN)
      return
    }

    // If there is no selected artist, exit
    if (!artist.id) {
      return
    }

    // If the artist has artists, push to home page
    if (user.artists.length > 0) {
      setRedirecting(true)
      Router.push(ROUTES.HOME)
    }
  }, [artist.id, artistLoading, user.artists, user.id, userLoading])
  // END PUSH TO RELEVANT PAGE IF THERE IS A SIGNED IN USER WITH ARTISTS, OR NO SIGNED IN USER

  // GET AVAILABLE ARTIST PAGES FROM SERVER IF THERE IS AN ACCESS TOKEN
  React.useEffect(() => {
    // Do nothing if there isn't an access token present
    if (!accessToken) {
      return
    }

    // Do nothing if an active request is already in progress
    if (activeRequest) {
      return
    }

    // Define function to sort ad accounts for each Facebook page
    const sortAdAccounts = (account, adaccounts) => {
      // If the Facebook page hasn't been promoted by an ad account before,
      // return the array of ad accounts unchanged
      if (!account.adaccount_id) {
        return adaccounts
      }

      // Find the index of the ad account that has been used to promote the Facebook page before
      const indexOfUsedAdAccount = adaccounts.findIndex(adaccount => adaccount.id === account.adaccount_id)
      if (indexOfUsedAdAccount === -1) {
        return adaccounts
      }
      // Remove the ad account that has been used before from the list of ad accounts
      const remainingAdAccounts = [...adaccounts]
      remainingAdAccounts.splice(indexOfUsedAdAccount, 1)

      // Return the array of ad accounts, with the one previously used
      // to promote the Facebook page in the first position
      return [adaccounts[indexOfUsedAdAccount], ...remainingAdAccounts]
    }

    const processAdAccounts = async (accounts, adAccounts) => {
      const accountsArray = Object.values(accounts)
      // README: https://gyandeeps.com/array-reduce-async-await/
      const accountsProcessed = await accountsArray.reduce(async (acc, account) => {
        const {
          facebook_page_url,
          instagram_url,
          instagram_id,
          picture,
        } = account
        const accountsAcc = await acc
        const availableAccounts = sortAdAccounts(account, adAccounts)

        // Stop here if no ad accounts
        if (!availableAccounts || !availableAccounts.length) {
          return accountsAcc
        }
        // Sort available ad accounts, priotising any that have
        // been used to promote the Facebook page before
        // Set the first ad account in the array as the default selected ad account
        const selectedFacebookAdAccount = {
          id: availableAccounts[0].id,
          name: availableAccounts[0].name,
        }
        // Set a Facebook URL if there isn't one already
        let facebookUrlFallback
        if (!facebook_page_url) {
          facebookUrlFallback = `https://facebook.com/${account.page_id}`
        }
        // Set an Instagram URL if there isn't on already
        let instagramUrlFallback
        if (!instagram_url && instagram_id) {
          const instagramUsername = await facebook.getInstagramBusinessUsername(instagram_id, accessToken)
          if (instagramUsername) {
            instagramUrlFallback = `https://instagram.com/${instagramUsername}`
          }
        }

        const processedAccount = {
          ...account,
          available_facebook_ad_accounts: availableAccounts,
          selected_facebook_ad_account: selectedFacebookAdAccount,
          facebook_page_url: facebook_page_url || facebookUrlFallback,
          instagram_url: instagram_url || instagramUrlFallback,
          connect: true,
          picture: `${picture}?width=500`,
        }
        return [...accountsAcc, processedAccount]
      }, [])
      return accountsProcessed
    }

    // Define async function to get available artists from the server
    const getAvailableArtists = async () => {
      setActiveRequest(true)
      setPageLoading(true)
      try {
        const token = await getToken()
        const availableArtists = await server.getArtistOnSignUp(accessToken, token)
        const availableArtistsSorted = {
          ...availableArtists,
          adaccounts: connectArtistHelpers.sortArtistsAlphabetically(availableArtists.adaccounts),
        }
        // Process the ad accounts
        const { accounts, adaccounts } = availableArtistsSorted
        const processedAccounts = await processAdAccounts(accounts, adaccounts)
        return processedAccounts
      } catch (err) {
        setPageLoading(false)
        throw (err)
      }
    }

    // Call function to get available artists from the server
    getAvailableArtists()
      .then(accounts => {
        setArtistAccounts({
          type: 'add-artists',
          payload: {
            artists: accounts,
          },
        })
        setPageLoading(false)
      })
      .catch(err => {
        setError(err)
      })
  }, [accessToken, activeRequest, getToken])
  // END GET AVAILABLE ARTIST PAGES FROM SERVER IF THERE IS AN ACCESS TOKEN

  // CREATE ARTIST
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
  // END CREATE ARTIST

  // Set initial error (if any)
  React.useEffect(() => {
    setError(authError)
  }, [authError])

  if (authLoading || userLoading || artistLoading || pageLoading || redirecting) {
    return <Spinner width={50} colour={brandColours.green.hex} />
  } if (Object.keys(artistAccounts).length === 0) {
    return <ConnectArtistFacebook artistAccounts={artistAccounts} setArtistAccounts={setArtistAccounts} error={error} setError={setError} setPageLoading={setPageLoading} />
  }
  return (
    <div style={{ width: '100%' }}>
      <ConnectedArtists
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

function ConnectArtistPage() {
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

      <Loader />

    </div>
  )
}

export default ConnectArtistPage
