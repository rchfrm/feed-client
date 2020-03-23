import React from 'react'

import Icon from './elements/Icon'
import InputNew from './elements/InputNew'
import Select from './elements/Select'
import Button from './elements/Button'
import InstagramIcon from './icons/InstagramIcon'

import helper from './helpers/helper'

import countries from '../constants/countries'

// IMPORT STYLES
import connectAccountsStyles from './ConnectAccounts.module.css'
import postStyles from './PostsPage.module.css'
import brandColors from '../constants/brandColors'

const styles = {
  ...connectAccountsStyles,
  ...postStyles,
}

function ConnectAccountsPanel({
  artistAccount,
  singular,
  setError,
  contactUs,
  updateArtists,
}) {
  const { readOnly } = connectAccountsStyles
  const { exists, connect } = artistAccount
  const singularClass = singular ? 'singular' : ''
  const selectedClass = connect ? 'selected' : 'deselected'
  const readOnlyClass = exists ? readOnly : ''
  const id = artistAccount.page_id


  // TOGGLE WHETHER AN ARTIST SHOULD BE CONNECTED OR NOT
  const toggleSelected = e => {
    e.preventDefault()
    const action = {
      type: 'toggle-connect',
      payload: {
        id,
      },
    }
    updateArtists(action)
  }

  // Toggle country selector error if selected or not
  const [countryError, setCountryError] = React.useState(true)

  React.useEffect(() => {
    const { country_code = null, connect } = artistAccount
    const hasCountryError = !country_code && connect
    setCountryError(hasCountryError)
  }, [artistAccount])


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

    const action = {
      type: 'update-artist',
      payload: {
        id,
        field,
        value,
      },
    }
    updateArtists(action)
  }
  // END HANDLE CHANGES IN TILE INPUTS

  const returnExistsWarning = () => {
    // if already connected
    if (readOnly) {
      return (
        <div className={`${styles.tileHeader}`}>
          <p>
            <em style={{ color: brandColors.black }}>
              You have already been added to
              {' '}
              {artistAccount.name}
              's team.
            </em>
          </p>
        </div>
      )
    }
    // Show warning if artist is already in database
    if (exists) {
      return (
        <div className={`${styles.tileHeader}`}>
          <p>
            <em style={{ color: brandColors.black }}>
              You will be added to
              {' '}
              {artistAccount.name}
              's team.
            </em>
          </p>
        </div>
      )
    }
    return null
  }

  const returnToggle = () => {
    if (!singular && !exists) {
      return (
        <Button
          version="toggle"
          onClick={toggleSelected}
          className={styles.postToggle}
        >
          <Icon
            version={connect ? 'tick' : 'empty'}
            color={connect ? 'white' : brandColors.grey}
            width="18"
            data={artistAccount.page_id}
          />
        </Button>
      )
    }
    return null
  }

  const returnCountry = () => {
    if (exists) {
      return (
        <InputNew
          name="country_code"
          placeholder={artistAccount.country_code}
          value={`${helper.findCountryName(artistAccount.country_code)} (${artistAccount.country_code})`}
          handleChange={handleChange}
          label="Your Country"
          readOnly={readOnly}
          version={artistAccount.exists ? 'text' : 'box'}
        />
      )
    }

    const countriesArr = countries.map(({ id, name }) => {
      return {
        value: id,
        name,
      }
    })

    return (
      <SelectNew
        name="country_code"
        label="Your country"
        handleChange={handleChange}
        selectedValue={artistAccount.country_code || 'choose'}
        placeholder="Choose your country..."
        options={countriesArr}
        required
      />
    )
  }

  const returnInstagramInput = () => {
    if (artistAccount.instagram_url) {
      return (
        <InputNew
          name="instagram_url"
          placeholder={artistAccount.instagram_url || 'Enter the URL of your Instagram Page'}
          value={artistAccount.instagram_url || ''}
          handleChange={contactUs}
          icon="instagram"
          readOnly={readOnly}
          version={artistAccount.exists ? 'text' : 'box'}
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
            fill={brandColors.textColor}
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
        <InputNew
          name="selected_facebook_ad_account"
          placeholder={artistAccount.selected_facebook_ad_account ? artistAccount.selected_facebook_ad_account.name : ''}
          value={`${artistAccount.selected_facebook_ad_account.name} (${artistAccount.selected_facebook_ad_account.id})`}
          handleChange={contactUs}
          label="Selected Facebook Ad Account"
          readOnly={readOnly}
          version={artistAccount.exists ? 'text' : 'box'}
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
      className={`tile ${styles.tile} ${selectedClass} ${singularClass} ${readOnlyClass}`}
    >
      {/* TOGGLE BUTTON */}
      {returnToggle()}
      {/* Warning if artist already exists and toggle */}
      {returnExistsWarning()}

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
          <InputNew
            name="name"
            placeholder={artistAccount.name || 'Enter artist name'}
            value={artistAccount.name || ''}
            handleChange={handleChange}
            label="Artist Name"
            readOnly={readOnly}
            version={artistAccount.exists ? 'text' : 'box'}
          />

        </div>

      </div>

      <div className="flex-column" style={{ flex: 'auto', justifyContent: 'space-between' }}>

        {/* Country */}
        {returnCountry()}

        {/* Inputs below profile picture */}
        {/* Home Town */}
        <InputNew
          name="location"
          placeholder={artistAccount.location || artistAccount.exists ? 'na.' : 'Enter the name of your home town'}
          value={artistAccount.location || ''}
          handleChange={handleChange}
          type="text"
          label="Home Town"
          readOnly={readOnly}
          version={artistAccount.exists ? 'text' : 'box'}
        />

        {/* Spotify Page URL */}
        <InputNew
          name="spotify_url"
          placeholder={artistAccount.spotify_url || artistAccount.exists ? 'na.' : 'Enter the URL of your Spotify Artist Page'}
          value={artistAccount.spotify_url || ''}
          handleChange={handleChange}
          type="text"
          label="Spotify Artist Page URL"
          readOnly={readOnly}
          version={artistAccount.exists ? 'text' : 'box'}
        />

        {/* Facebook Page URL */}
        <InputNew
          name="facebook_page_url"
          placeholder={artistAccount.facebook_page_url || 'Enter the URL of your Facebook Page'}
          value={artistAccount.facebook_page_url || ''}
          handleChange={contactUs}
          type="text"
          icon="facebook"
          readOnly={readOnly}
          version={artistAccount.exists ? 'text' : 'box'}
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

export default ConnectAccountsPanel
