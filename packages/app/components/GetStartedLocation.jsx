import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Select from '@/elements/Select'
import Button from '@/elements/Button'
import Error from '@/elements/Error'
import Spinner from '@/elements/Spinner'
import ArrowIcon from '@/icons/ArrowIcon'

import countries from '@/constants/countries'

import { updateLocation } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/getStartedCopy'

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

  const handleChange = async (e) => {
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
  }

  const handleNext = async () => {
    if (! countryCode) return

    // Skip API request if country code hasn't changed
    if (countryCode === artist.country_code) {
      next()
      return
    }
    await saveLocation(countryCode)
    next()
  }

  React.useEffect(() => {
    if (artist.country_code || adAccountCountryCode) {
      handleNext()
      return
    }
    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adAccountCountryCode])

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-lg">{copy.locationSubtitle}</h3>
      <Error error={error} />
      <div className="flex flex-1 flex-column justify-center items-center w-full sm:w-1/3 mx-auto">
        <Select
          name="country_code"
          handleChange={handleChange}
          options={locationOptions}
          selectedValue={countryCode}
          placeholder="Select country"
          className="w-full mb-12"
        />
        <Button
          onClick={handleNext}
          isLoading={isLoading}
          className="w-full sm:w-48"
          trackComponentName="GetStartedLocation"
        >
          Save
          <ArrowIcon
            className="w-7 h-auto ml-1"
            direction="right"
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
