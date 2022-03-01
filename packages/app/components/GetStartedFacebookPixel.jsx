import React from 'react'
import useAsyncEffect from 'use-async-effect'

import GetStartedFacebookPixelQuestion from '@/app/GetStartedFacebookPixelQuestion'
import GetStartedFacebookPixelForm from '@/app/GetStartedFacebookPixelForm'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import { getArtistPixels } from '@/app/helpers/settingsHelpers'

import copy from '@/app/copy/getStartedCopy'

const GetStartedFacebookPixel = () => {
  const [pixels, setPixels] = React.useState([])
  const [shouldShowPixelSelector, setShouldShowPixelSelector] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return

    const { res: pixels = [], error } = await getArtistPixels(artistId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setPixels(pixels)
    setShouldShowPixelSelector(pixels.length > 0)
    setIsLoading(false)
  }, [artistId])

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="mb-6 font-medium text-xl">{copy.facebookPixelSubtitle(pixels, shouldShowPixelSelector)}</h3>
      <Error error={error} />
      <div className={[
        'flex flex-1 flex-column',
        'justify-center items-center',
        'w-full mx-auto',
        shouldShowPixelSelector ? 'sm:w-1/3' : 'sm:w-1/2',
      ].join(' ')}
      >
        {shouldShowPixelSelector ? (
          <GetStartedFacebookPixelForm
            pixels={pixels}
            setPixels={setPixels}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setError={setError}
          />
        ) : (
          <GetStartedFacebookPixelQuestion setShouldShowPixelSelector={setShouldShowPixelSelector} />
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
