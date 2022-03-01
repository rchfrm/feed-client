import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

import { setPixel } from '@/app/helpers/settingsHelpers'

const GetStartedFacebookPixelSelector = ({ isLoading, setIsLoading, setError }) => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  const saveFacebookPixel = async (pixelId) => {
    setIsLoading(true)

    const { error } = await setPixel(artistId, pixelId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setIsLoading(false)
    next()
  }

  return (
    <>
      <PixelSelector
        updateParentPixel={setFacebookPixel}
        trackLocation="Conversions settings"
        shouldSaveOnChange={false}
        hasNoPixelOption={false}
        shouldShowPixelCopier={false}
        className="w-full mb-4"
      />
      <Button
        version="green"
        onClick={() => saveFacebookPixel(facebookPixel)}
        loading={isLoading}
        className="w-full sm:w-48"
        trackComponentName="GetStartedFacebookPixel"
      >
        Save
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
    </>
  )
}

GetStartedFacebookPixelSelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

GetStartedFacebookPixelSelector.defaultProps = {
}

export default GetStartedFacebookPixelSelector
