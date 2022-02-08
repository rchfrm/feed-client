import React from 'react'
// import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'
import { setPixel } from '@/app/helpers/settingsHelpers'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const GetStartedFacebookPixelStep = () => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  const saveFacebookPixel = async () => {
    setIsLoading(true)

    const { error } = await setPixel(artistId, facebookPixel)

    setIsLoading(false)

    if (error) {
      setError({ message: error.message })
      return
    }
    next()
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <PixelSelector
        updateParentPixel={setFacebookPixel}
        trackLocation="Conversions settings"
        shouldSaveOnChange={false}
        hasNoPixelOption={false}
      />
      <Error error={error} />
      <Button
        version="green"
        onClick={saveFacebookPixel}
        loading={isLoading}
        trackComponentName="GetStartedFacebookPixelStep"
      >
        Next
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
    </div>
  )
}

GetStartedFacebookPixelStep.propTypes = {
}

GetStartedFacebookPixelStep.defaultProps = {
}

export default GetStartedFacebookPixelStep
