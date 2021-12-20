import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import Select from '@/elements/Select'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { getArtistIntegrationByPlatform } from '@/app/helpers/artistHelpers'

import copy from '@/app/copy/controlsPageCopy'
import brandColors from '../../shared/constants/brandColors'

const locationOptions = [
  {
    name: 'United Kingdom',
    id: 'UK',
  },
  {
    name: 'Spain',
    id: 'ESP',
  },
]

const ControlsWizardLocationStep = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingLocationOptions, setIsLoadingLocationOptions] = React.useState(false)
  const [location, setLocation] = React.useState('')
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artist } = React.useContext(ArtistContext)
  const facebookIntegration = getArtistIntegrationByPlatform(artist, 'facebook')

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    setIsLoadingLocationOptions(false)
  }, [])

  const saveLocation = async (location) => {
    console.log(location)
    setIsLoading(true)

    // Make API request

    // Update artist
    setIsLoading(false)
    setError(null)
    next()
  }

  const handleNext = () => {
    if (!location) return
    // Skip API request if ad account hasn't changed
    if (location === facebookIntegration?.location) {
      next()
      return
    }
    saveLocation(location)
  }

  React.useEffect(() => {
    if (!location) {
      setLocation(locationOptions[0]?.value)
    }
  }, [location, setLocation])

  return (
    <>
      <MarkdownText markdown={copy.controlsWizardLocationStepIntro} />
      <Select
        loading={isLoadingLocationOptions}
        options={locationOptions}
        selectedValue={location}
        name="ad_account"
        handleChange={setLocation}
      />
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
