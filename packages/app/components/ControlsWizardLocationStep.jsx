import React from 'react'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'
import EditBlock from '@/app/EditBlock'

import Select from '@/elements/Select'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import copy from '@/app/copy/controlsPageCopy'
import brandColors from '@/constants/brandColors'
import countries from '@/constants/countries'

import { updateLocation } from '@/app/helpers/artistHelpers'

const locationOptions = countries.map(({ id, name }) => {
  return {
    value: id,
    name,
  }
})

const ControlsWizardLocationStep = () => {
  const { next } = React.useContext(WizardContext)
  const { artist, artistId, updateArtist } = React.useContext(ArtistContext)

  const [isLoading, setIsLoading] = React.useState(false)
  const [countryCode, setCountryCode] = React.useState(artist.country_code || locationOptions[0].value)
  const [country, setCountry] = React.useState('')
  const [isEditMode, setIsEditMode] = React.useState(!countryCode)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    setCountry(locationOptions.find((location) => location.value === countryCode).name)
  }, [countryCode])

  const handleChange = (e) => {
    const { target: { value } } = e
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
    <>
      <MarkdownText markdown={copy.controlsWizardLocationStepIntro} />
      {isEditMode
        ? (
          <Select
            name="country_code"
            handleChange={handleChange}
            selectedValue={countryCode}
            placeholder="Select country"
            options={locationOptions}
          />
        ) : (
          <EditBlock
            value={country}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            trackComponentName="ControlsWizardLocationStep"
            className="mb-8"
          />
        )}
      <Error error={error} />
      <Button
        version="outline-green"
        onClick={handleNext}
        className="w-1/3 ml-auto mb-12"
        loading={isLoading}
        spinnerFill={brandColors.black}
        trackComponentName="ControlsWizardAdAccountStep"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
        />
      </Button>
    </>
  )
}

ControlsWizardLocationStep.propTypes = {
}

export default ControlsWizardLocationStep
