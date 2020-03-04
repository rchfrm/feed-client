import React from 'react'

import Icon from './elements/Icon'
import Input from './elements/Input'
import Select from './elements/Select'
import Button from './elements/Button'
import InstagramIcon from './icons/InstagramIcon'

import helper from './helpers/helper'

import countries from '../constants/countries'


// IMPORT STYLES
import connectArtistStyles from './ConnectArtist.module.css'
import postStyles from './PostsPage.module.css'

const styles = {
  ...connectArtistStyles,
  ...postStyles,
}


function ConnectedArtistPanel({
  artistAccount,
  singular,
  setError,
  contactUs,
  updateArtists,
}) {
  // REDEFINE PROPS AS VARIABLES

  const singularClass = singular ? 'singular' : ''
  const { exists, connect } = artistAccount
  const selected = connect ? 'selected' : 'deselected'
  const readOnly = exists ? 'readonly' : ''
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
  // END TOGGLE WHETHER AN ARTIST SHOULD BE CONNECTED OR NOT

  // HANDLE CHANGES IN TILE INPUTS
  const handleChange = e => {
    e.preventDefault()

    setError(null)

    const field = e.target.name
    let { value } = e.target

    // If the updated field is the country code, extract the country code from the fields value
    if (field === 'country_code') {
      console.log('value', value)
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

    const countriesArr = countries.map(({ id, name }) => {
      return {
        id,
        name,
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

export default ConnectedArtistPanel
