
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
import PageHeader from '../elements/PageHeader'
import Spinner from '../elements/Spinner'
import Button from '../elements/Button'
import Icon from '../elements/Icon'
import Input from '../elements/Input'
import Select from '../elements/Select'
import Error from '../elements/Error'
import LastItem from '../elements/LastItem'
// IMPORT PAGES
import ConnectArtistFacebook from '../ConnectArtistFacebook'
// IMPORT ASSETS
import InstagramIcon from '../icons/InstagramIcon'
// IMPORT CONSTANTS
import * as ROUTES from '../../constants/routes'
import countries from '../../constants/countries'
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
import server from '../helpers/server'
import helper from '../helpers/helper'
import facebook from '../helpers/facebook'
// IMPORT STYLES
import connectArtistStyles from '../ConnectArtist.module.css'
import postStyles from '../PostsPage.module.css'

const styles = {
  ...connectArtistStyles,
  ...postStyles,
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
  const { accessToken, authLoading, getToken } = React.useContext(AuthContext)
  const { user, userLoading } = React.useContext(UserContext)
  const { artist, artistLoading, createArtist, setArtistLoading } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE LOADING
  const [pageLoading, setPageLoading] = React.useState(false)
  const [activeRequest, setActiveRequest] = React.useState(false)
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
      Router.push(ROUTES.LOG_IN)
      return
    }

    // If there is no selected artist, exit
    if (!artist.id) {
      return
    }

    // If the artist has artists, push to home page
    if (user.artists.length > 0) {
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

      // Remove the ad account that has been used before from the list of ad accounts
      const remainingAdAccounts = [...adaccounts]
      remainingAdAccounts.splice(indexOfUsedAdAccount, 1)

      // Return the array of ad accounts, with the one previously used
      // to promote the Facebook page in the first position
      return [adaccounts[indexOfUsedAdAccount], ...remainingAdAccounts]
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
          adaccounts: helper.sortArtistsAlphabetically(availableArtists.adaccounts),
        }

        const accounts = Object.values(availableArtistsSorted.accounts)
        // Process each Facebook page in turn
        for (let i = 0; i < accounts.length; i += 1) {
          const accountId = accounts[i].page_id
          const account = availableArtistsSorted.accounts[accountId]
          // Sort available ad accounts, priotising any that have
          // been used to promote the Facebook page before
          account.available_facebook_ad_accounts = sortAdAccounts(account, availableArtistsSorted.adaccounts)

          // Set the first ad account in the array as the default selected ad account
          account.selected_facebook_ad_account = {
            id: account.available_facebook_ad_accounts[0].id,
            name: account.available_facebook_ad_accounts[0].name,
          }

          // Set a Facebook URL if there isn't one already
          if (!account.facebook_page_url) {
            account.facebook_page_url = `https://facebook.com/${account.page_id}`
          }

          // Set an Instagram URL if there isn't on already
          if (!account.instagram_url && account.instagram_id) {
            const instagramUsername = await facebook.getInstagramBusinessUsername(account.instagram_id, accessToken)
            if (instagramUsername) {
              account.instagram_url = `https://instagram.com/${instagramUsername}`
            }
          }

          // Add field to mark if artist should be connected or not
          account.connect = true

          // Use larger version of Facebook profile photo
          account.picture = `${account.picture}?width=500`
        }

        return availableArtistsSorted.accounts
      } catch (err) {
        setPageLoading(false)
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
  const handleClick = async e => {
    e.preventDefault()
    try {
      await createArtist(artistAccounts, accessToken)
      Router.push(ROUTES.HOME)
    } catch (err) {
      setArtistLoading(false)
      setError(err)
    }
  }
  // END CREATE ARTIST

  if (authLoading || userLoading || artistLoading || pageLoading) {
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

        <Button
          version="black progress"
          onClick={handleClick}
          disabled={false}
        >
          next,
        </Button>

      </div>

    </div>
  )
}

function ConnectedArtists(props) {
// REDEFINE PROPS AS VARIABLES
  const { artistAccounts } = props
  const { setArtistAccounts } = props
  const { setError } = props
  // END REDEFINE PROPS AS VARIABLES

  // SHOW ERROR IF THE USER ATTEMPTS TO EDIT FACEBOOK PAGE OR INSTAGRAM ACCOUNT
  const contactUs = e => {
    setError({
      message: 'To change your connected Facebook Page or Instagram Account, contact us at support@archform.ltd',
    })
    e.preventDefault()
  }
  // END SHOW ERROR IF THE USER ATTEMPTS TO EDIT FACEBOOK PAGE OR INSTAGRAM ACCOUNT

  const sortedArtistAccounts = helper.sortArtistsAlphabetically(artistAccounts)

  const artistList = sortedArtistAccounts.map((artistAccount) => {
    return (
      <ConnectedArtist
        key={artistAccount.page_id}
        artistAccount={artistAccount}
        setArtistAccounts={setArtistAccounts}
        setError={setError}
        singular={artistAccounts.length === 1}
        contactUs={contactUs}
      />
    )
  })
  artistList.push(LastItem())

  return (
    <ul id="artist-integrations" className={`frame ${styles.artistIntegrations}`}>
      {artistList}
    </ul>
  )
}

function ConnectedArtist(props) {
// REDEFINE PROPS AS VARIABLES
  const { artistAccount } = props
  const id = artistAccount.page_id
  const { setArtistAccounts } = props
  const { singular } = props
  const singularClass = singular ? 'singular' : ''
  const { connect } = artistAccount
  const selected = connect ? 'selected' : 'deselected'
  const { exists } = artistAccount
  const readOnly = exists ? 'readonly' : ''
  const { setError } = props
  const { contactUs } = props
  // END REDEFINE PROPS AS VARIABLES

  // TOGGLE WHETHER AN ARTIST SHOULD BE CONNECTED OR NOT
  const toggleSelected = e => {
    e.preventDefault()
    setArtistAccounts({
      type: 'toggle-connect',
      payload: {
        id,
      },
    })
  }
  // END TOGGLE WHETHER AN ARTIST SHOULD BE CONNECTED OR NOT

  // HANDLE CHANGES IN TILE INPUTS
  const handleChange = e => {
    e.preventDefault()

    setError(null)

    const field = e.target.name
    let { value } = e.target

    // If the updated field is the country code, extract the country code from the fields value
    if (field === 'country_code') {
      if (value.indexOf('Choose') !== -1) {
        value = undefined
      } else {
        value = value.slice(value.indexOf('(') + 1, value.indexOf(')'))
      }
    }

    // If the updated field is the ad account selector
    if (field === 'selected_facebook_ad_account') {
      const adAccountName = value.slice(0, value.indexOf('(') - 1)
      const adAccountId = value.slice(value.indexOf('(') + 1, value.indexOf(')'))
      value = {
        id: adAccountId,
        name: adAccountName,
      }
    }

    setArtistAccounts({
      type: 'update-artist',
      payload: {
        id,
        field,
        value,
      },
    })
  }
  // END HANDLE CHANGES IN TILE INPUTS

  const returnExistsWarning = () => {
    // Show warning if artist is already in database
    if (exists) {
      return (
        <div className={styles['post-meta']}>
          <em style={{ color: 'black' }}>
            You will be added to
            {artistAccount.name}
            's team
          </em>
        </div>
      )
    }
    return (
      <div className={styles['post-meta']} />
    )
  }

  const returnToggle = () => {
    if (!singular && !exists) {
      return (
        <div className={styles['post-toggle']}>
          <Button
            version="toggle"
            onClick={toggleSelected}
          >
            <Icon
              version={connect ? 'tick' : 'empty'}
              color={connect ? 'white' : '#D6D6D6'}
              width="18"
              data={artistAccount.page_id}
            />
          </Button>
        </div>
      )
    }
  }

  const returnCountry = () => {
    if (exists) {
      return (
        <Input
          name="country_code"
          placeholder={artistAccount.country_code}
          value={`${helper.findCountryName(artistAccount.country_code)} (${artistAccount.country_code})`}
          onChange={handleChange}
          type="text"
          label={{
            position: 'top',
            text: 'Your country',
          }}
          version="text"
          readonly={artistAccount.exists}
        />
      )
    }
    const countriesArr = countries.map(country => {
      return {
        id: country.iso,
        name: country.name,
      }
    })
    return (
      <Select
        name="country_code"
        label={{
          position: 'top',
          text: 'Your country',
        }}
        onChange={handleChange}
        selectedOption={artistAccount.country_code || 'choose'}
        options={[
          {
            id: 'choose',
            name: 'Choose your country...',
          },
          ...countriesArr,
        ]}
      />
    )
  }

  const returnInstagramInput = () => {
    if (artistAccount.instagram_url) {
      return (
        <Input
          name="instagram_url"
          placeholder={artistAccount.instagram_url || 'Enter the URL of your Instagram Page'}
          value={artistAccount.instagram_url || ''}
          onChange={contactUs}
          type="text"
          label={{
            position: 'icon',
            icon: 'instagram',
          }}
          version="text_icon"
          readonly={artistAccount.exists}
        />
      )
    }
    return (
      <div style={{
        margin: '0 0 1em 0',
        padding: '0 0 0.2em 0',
      }}
      >
        <label className="label_icon">
          <InstagramIcon
            fill="#000000"
            width="20"
          />
        </label>
        <a href="https://help.instagram.com/502981923235522" target="_blank" rel="noopener noreferrer">Learn more about Instagram business accounts</a>
        .
      </div>
    )
  }

  const returnAdAccount = () => {
    if (exists) {
      return (
        <Input
          name="selected_facebook_ad_account"
          placeholder={artistAccount.selected_facebook_ad_account}
          value={`${artistAccount.selected_facebook_ad_account.name} (${artistAccount.selected_facebook_ad_account.id})`}
          onChange={contactUs}
          type="text"
          label={{
            position: 'top',
            text: 'Selected Facebook Ad Account',
          }}
          version="text"
          readonly={artistAccount.exists}
        />
      )
    }
    return (
      <Select
        name="selected_facebook_ad_account"
        label={{
          position: 'top',
          text: 'Which Facebook Ad Account should we use?',
        }}
        onChange={handleChange}
        contactUs={contactUs}
        options={artistAccount.available_facebook_ad_accounts}
      />
    )
  }


  return (
    <li
      key={artistAccount.page_id}
      className={`tile ${selected} ${singularClass} ${readOnly}`}
    >

      {/* Warning if artist already exists and toggle */}
      <div className={`flex-row ${styles['flex-row']}`}>
        {returnExistsWarning()}
        {returnToggle()}
      </div>

      <div className={`flex-row ${styles['flex-row']}`}>

        {/* Page Profile Picture */}
        <div className={styles['profile-picture']}>
          <div className={`square-image ${styles['square-image']}`}>
            <img
              className={`center-image ${styles['center-image']}`}
              src={artistAccount.picture}
              alt={`${artistAccount.name} Facebook profile photo`}
            />
          </div>
        </div>

        {/* Inputs to the right of profile picture */}
        <div className={`flex-column ${styles['right-of-profile']}`}>

          {/* Artist Name */}
          <Input
            name="name"
            placeholder={artistAccount.name || 'Enter artist name'}
            value={artistAccount.name || ''}
            onChange={handleChange}
            type="text"
            label={{
              position: 'top',
              text: 'Artist Name',
            }}
            version="text"
            readonly={artistAccount.exists}
          />

          {/* Country */}
          {returnCountry()}

        </div>

      </div>

      <div className="flex-column" style={{ flex: 'auto', justifyContent: 'space-between' }}>

        {/* Inputs below profile picture */}
        {/* Home Town */}
        <Input
          name="location"
          placeholder={artistAccount.location || artistAccount.exists ? 'na.' : 'Enter the name of your home town'}
          value={artistAccount.location || ''}
          onChange={handleChange}
          type="text"
          label={{
            position: 'top',
            text: 'Home Town',
          }}
          version="text"
          readonly={artistAccount.exists}
        />

        {/* Spotify Page URL */}
        <Input
          name="spotify_url"
          placeholder={artistAccount.spotify_url || artistAccount.exists ? 'na.' : 'Enter the URL of your Spotify Artist Page'}
          value={artistAccount.spotify_url || ''}
          onChange={handleChange}
          type="text"
          label={{
            position: 'top',
            text: 'Spotify Artist Page URL',
          }}
          version="text"
          readonly={artistAccount.exists}
        />

        {/* Facebook Page URL */}
        <Input
          name="facebook_page_url"
          placeholder={artistAccount.facebook_page_url || 'Enter the URL of your Facebook Page'}
          value={artistAccount.facebook_page_url || ''}
          onChange={contactUs}
          type="text"
          label={{
            position: 'icon',
            icon: 'facebook',
          }}
          version="text_icon"
          readonly={artistAccount.exists}
        />

        {/* Instagram Page URL */}
        {returnInstagramInput()}

        {/* Select Facebook ad account */}
        <div className={styles['adaccount-select']}>
          {returnAdAccount()}
        </div>

      </div>

    </li>
  )
}
