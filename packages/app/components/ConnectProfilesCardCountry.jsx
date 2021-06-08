import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'

import ConnectProfilesCardSelectPlaceholder from '@/app/ConnectProfilesCardSelectPlaceholder'

import countries from '@/constants/countries'

const countriesArr = countries.map(({ id, name }) => {
  return {
    value: id,
    name,
  }
})

const ConnectProfilesCardCountry = ({
  artist,
  updateArtists,
  className,
}) => {
  // READONLY
  const {
    country_code,
    exists,
    connect,
    page_id: artistId,
  } = artist

  if (exists) {
    const { name: countryName } = countriesArr.find(({ value }) => value === country_code)
    return (
      <ConnectProfilesCardSelectPlaceholder
        className={className}
        label="Your country"
        title={countryName}
      />
    )
  }
  return (
    <Select
      name="country_code"
      label="Your country"
      handleChange={(e) => {
        const { target: { name: field, value } } = e
        // Ignore placeholder
        if (value.indexOf('Choose') !== -1) return
        // Update artist
        const payload = { id: artistId, field, value }
        updateArtists('update-artist', payload)
      }}
      selectedValue={artist.country_code}
      placeholder="Select country"
      options={countriesArr}
      required
      highlight={connect}
      className={className}
    />
  )
}

ConnectProfilesCardCountry.propTypes = {
  artist: PropTypes.object.isRequired,
  updateArtists: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesCardCountry.defaultProps = {
  className: null,
}

export default ConnectProfilesCardCountry
