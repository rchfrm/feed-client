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
    <div className="flex flex-1 flex-column">
      <h3 className="mb-0 font-medium text-xl">Which Facebook Pixel would you like Feed to use?</h3>
      <div className="flex flex-1 flex-column w-1/3 justify-center items-center mx-auto">
        <PixelSelector
          updateParentPixel={setFacebookPixel}
          trackLocation="Conversions settings"
          shouldSaveOnChange={false}
          hasNoPixelOption={false}
          className="w-full mb-4"
        />
        <Error error={error} />
        <Button
          version="green"
          onClick={saveFacebookPixel}
          loading={isLoading}
          className="w-48"
          trackComponentName="GetStartedFacebookPixelStep"
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

GetStartedFacebookPixelStep.propTypes = {
}

GetStartedFacebookPixelStep.defaultProps = {
}

export default GetStartedFacebookPixelStep
