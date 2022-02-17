import React from 'react'
import useAsyncEffect from 'use-async-effect'
// import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

import { WizardContext } from '@/app/contexts/WizardContext'
import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'
import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import ArrowAltIcon from '@/icons/ArrowAltIcon'
import CloseCircle from '@/icons/CloseCircle'
import TickCircleIcon from '@/icons/TickCircleIcon'

import { setPixel, getArtistPixels } from '@/app/helpers/settingsHelpers'

import brandColors from '@/constants/brandColors'
import copy from '@/app/copy/getStartedCopy'

const GetStartedFacebookPixel = () => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const [shouldShowPixelSelector, setShouldShowPixelSelector] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const { next } = React.useContext(WizardContext)
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const { res: pixels = [], error } = await getArtistPixels(artistId)
    setIsLoading(false)

    if (error) {
      setError(error)
      setShouldShowPixelSelector(false)
      return
    }

    setShouldShowPixelSelector(pixels.length > 0)
  }, [artistId])

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

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-1 flex-column">
      <h3 className="mb-6 font-medium text-xl">{copy.facebookPixelSubtitle(shouldShowPixelSelector)}</h3>
      <div className="flex flex-1 flex-column w-full justify-center items-center mx-auto">
        {shouldShowPixelSelector ? (
          <>
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
              className="w-full sm:w-48 mb-5 sm:mb-0"
              trackComponentName="GetStartedFacebookPixelStep"
            >
              Save
              <ArrowAltIcon
                className="ml-3"
                direction="right"
                fill="white"
              />
            </Button>
          </>
        ) : (
          <div className="w-full flex flex-1 flex-column sm:flex-row justify-center items-center">
            <Button
              version="outline-black"
              onClick={next}
              spinnerFill={brandColors.black}
              className="w-full sm:w-56 mx-4 mb-5 sm:mb-0"
              trackComponentName="GetStartedPostsStep"
            >
              <CloseCircle
                fill={brandColors.greyDark}
                className="w-6 h-6 mr-2"
              />
              No
            </Button>
            <Button
              version="outline-black"
              onClick={() => setShouldShowPixelSelector(true)}
              spinnerFill={brandColors.black}
              className="w-full sm:w-56 mx-4 mb-5 sm:mb-0"
              trackComponentName="GetStartedPostsStep"
            >
              <TickCircleIcon
                className="w-6 h-6 mr-2"
              />
              Yes
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

GetStartedFacebookPixel.propTypes = {
}

GetStartedFacebookPixel.defaultProps = {
}

export default GetStartedFacebookPixel
