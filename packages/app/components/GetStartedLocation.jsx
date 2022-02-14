import React from 'react'
// import PropTypes from 'prop-types'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import countries from '@/constants/countries'

import { updateLocation } from '@/app/helpers/artistHelpers'

const locationOptions = countries.map(({ id, name }) => {
  return {
    value: id,
    name,
  }
})

const GetStartedLocation = () => {
  const { next, wizardState } = React.useContext(WizardContext)
  const { artist, artistId, updateArtist } = React.useContext(ArtistContext)

  const adAccountCountryCode = locationOptions.find((location) => location.name === wizardState.adAccountCountry)?.value

  const [isLoading, setIsLoading] = React.useState(false)
  const [countryCode, setCountryCode] = React.useState(artist.country_code || adAccountCountryCode || locationOptions[0].value)
  const [error, setError] = React.useState(null)


  const handleChange = (e) => {
    const { target: { value } } = e
    if (value === countryCode) return

    setCountryCode(value)
  }

  const saveLocation = async (countryCode) => {
    setIsLoading(true)

    const { res: artist, error } = await updateLocation(artistId, countryCode)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }
    // Update artist context
    updateArtist(artist)
    setIsLoading(false)
    next()
  }

  const handleNext = () => {
    if (!countryCode) return

    // Skip API request if country code hasn't changed
    if (countryCode === artist.country_code) {
      next()
      return
    }
    saveLocation(countryCode)
  }

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Where are you based?</h3>
      <div className="flex flex-1 flex-column justify-center items-center w-1/3 mx-auto">
        <Select
          name="country_code"
          handleChange={handleChange}
          options={locationOptions}
          selectedValue={countryCode}
          placeholder="Select country"
          className="w-full mb-12"
        />
        <Error error={error} />
        <Button
          version="green"
          onClick={handleNext}
          loading={isLoading}
          className="w-48"
          trackComponentName="GetStartedHomeCountryStep"
        >
          Save
          <ArrowAltIcon
            className="ml-3"
            direction="right"
            fill="white"
          />
        </Button>
      </div>
    </div>
  )
}

GetStartedLocation.propTypes = {
}

GetStartedLocation.defaultProps = {
}

export default GetStartedLocation
