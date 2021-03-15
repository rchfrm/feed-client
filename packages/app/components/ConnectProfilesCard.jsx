import React from 'react'

import Input from '@/elements/Input'
import Select from '@/elements/Select'
import ButtonToggle from '@/elements/ButtonToggle'
import InstagramIcon from '@/icons/InstagramIcon'

import * as utils from '@/helpers/utils'

import countries from '@/constants/countries'

// IMPORT STYLES
import ConnectProfilesStyles from '@/app/ConnectProfiles.module.css'
import postStyles from '@/app/PostsPage.module.css'
import brandColors from '@/constants/brandColors'

const styles = {
  ...ConnectProfilesStyles,
  ...postStyles,
}

function ConnectProfilesCard({
  artistAccount,
  singular,
  setErrors,
  contactUs,
  updateArtists,
}) {
  // artistAccount.exists = false
  const { exists, connect } = artistAccount
  const singularClass = singular ? 'singular' : ''
  const selectedClass = connect ? 'selected' : 'deselected'
  const readOnly = exists
  const readOnlyClass = readOnly ? ConnectProfilesStyles.readOnly : ''
  const id = artistAccount.page_id


  // TOGGLE WHETHER AN ARTIST SHOULD BE CONNECTED OR NOT
  const toggleSelected = () => {
    const payload = { id }
    updateArtists('toggle-connect', payload)
  }

  const handleChange = e => {
    e.preventDefault()

    setErrors([])

    const { target, target: { name: field, value } } = e
    let payloadValue = value

    // If the updated field is the country code, extract the country code from the fields value
    if (field === 'country_code') {
      if (value.indexOf('Choose') !== -1) {
        payloadValue = undefined
      }
    }

    // If the updated field is the ad account selector
    if (field === 'selected_facebook_ad_account') {
      const { selectedIndex, options } = target
      const { text: adAccountName } = options[selectedIndex]
      const adAccountId = value
      payloadValue = {
        id: adAccountId,
        name: adAccountName,
      }
    }
    // Update artists
    const payload = { id, field, value: payloadValue }
    updateArtists('update-artist', payload)
  }


  const returnExistsWarning = () => {
    // if already connected
    if (readOnly) {
      return (
        <div className={['mt-0', styles.tileHeader].join(' ')}>
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
        <div className={['mt-0', styles.tileHeader].join(' ')}>
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

  const returnCountry = () => {
    if (exists) {
      return (
        <Input
          name="country_code"
          placeholder={artistAccount.country_code}
          value={`${utils.findCountryName(artistAccount.country_code)} (${artistAccount.country_code})`}
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
      <Select
        name="country_code"
        label="Your country"
        handleChange={handleChange}
        selectedValue={artistAccount.country_code}
        placeholder="Choose your country..."
        options={countriesArr}
        required
        highlight
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
          handleChange={contactUs}
          label="Instagram page URL"
          readOnly
          version={artistAccount.exists ? 'text' : 'box'}
        />
      )
    }
    return (
      <div className="flex align-top mb-5">
        <div>
          <InstagramIcon className="mr-3 h-4" />
        </div>
        <a
          href="https://help.instagram.com/502981923235522"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            transform: 'translateY(-0.25em)',
          }}
        >
          Learn more about Instagram business accounts.
        </a>
      </div>
    )
  }

  const returnAdAccountSelector = () => {
    if (exists) {
      return (
        <Input
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

    const adAccountOptions = artistAccount.available_facebook_ad_accounts.map(({ name, id: value }) => {
      return {
        name,
        value,
      }
    })

    return (
      <Select
        name="selected_facebook_ad_account"
        label="Which Facebook Ad Account should we use?"
        handleChange={handleChange}
        options={adAccountOptions}
        selectedValue={artistAccount.selected_facebook_ad_account.id}
      />
    )
  }


  return (
    <li
      key={artistAccount.page_id}
      className={[
        'tile',
        'col-span-12',
        'sm:col-span-6',
        'lg:col-span-4',
        styles.tile,
        selectedClass,
        singularClass,
        readOnlyClass,
      ].join(' ')}
    >
      {/* TOGGLE BUTTON */}
      {!singular && !exists && (
        <div className="flex justify-between mb-3">
          <p>Connect:</p>
          <ButtonToggle
            onClick={toggleSelected}
            className={styles.postToggle}
            state={connect ? 'on' : 'off'}
          />
        </div>
      )}

      {/* Warning if artist already exists and toggle */}
      {returnExistsWarning()}

      <div className={`flex-row ${styles['flex-row']}`}>

        {/* Page Profile Picture */}
        <div className={styles['profile-picture']}>
          <div className="media media--square">
            <img
              className={['center--image'].join(' ')}
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
            handleChange={handleChange}
            label="Artist Name"
            readOnly={readOnly}
            version={artistAccount.exists ? 'text' : 'box'}
            autoComplete={false}
          />

        </div>

      </div>

      <form
        className="flex-column"
        style={{ flex: 'auto', justifyContent: 'space-between' }}
        onSubmit={(e) => e.preventDefault()}
        autoComplete="off"
      >

        {/* Country */}
        {returnCountry()}

        {/* INPUTS BELOW PROFILE PICTURE */}
        {/* Facebook Page URL */}
        <Input
          name="facebook_page_url"
          placeholder={artistAccount.facebook_page_url || 'Enter the URL of your Facebook Page'}
          value={artistAccount.facebook_page_url || ''}
          handleChange={contactUs}
          label="Facebook Page URL"
          type="text"
          readOnly
          version={artistAccount.exists ? 'text' : 'box'}
        />

        {/* Instagram Page URL */}
        {returnInstagramInput()}

        {/* Select Facebook ad account */}
        <div className={styles['adaccount-select']}>
          {returnAdAccountSelector()}
        </div>

      </form>

    </li>
  )
}

export default ConnectProfilesCard
