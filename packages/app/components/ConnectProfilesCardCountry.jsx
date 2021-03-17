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
  onChange,
  className,
}) => {
  // READONLY
  if (artist.exists) {
    return (
      <ConnectProfilesCardSelectPlaceholder
        className={className}
        label="Your country"
        title="United Kingdom"
      />
    )
  }
  return (
    <Select
      name="country_code"
      label="Your country"
      handleChange={onChange}
      selectedValue={artist.country_code}
      placeholder="Select country"
      options={countriesArr}
      required
      highlight
      className={className}
    />
  )
}

ConnectProfilesCardCountry.propTypes = {
  artist: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

ConnectProfilesCardCountry.defaultProps = {
  className: null,
}

export default ConnectProfilesCardCountry
