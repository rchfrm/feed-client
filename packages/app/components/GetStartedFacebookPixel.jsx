import React from 'react'
import useAsyncEffect from 'use-async-effect'

import GetStartedFacebookPixelQuestion from '@/app/GetStartedFacebookPixelQuestion'
import GetStartedFacebookPixelForm from '@/app/GetStartedFacebookPixelForm'

import { ArtistContext } from '@/app/contexts/ArtistContext'
import { WizardContext } from '@/app/contexts/WizardContext'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import { getArtistPixels, setPixel, getCurrentPixelId } from '@/app/helpers/settingsHelpers'

import copy from '@/app/copy/getStartedCopy'

const GetStartedFacebookPixel = () => {
  const [pixels, setPixels] = React.useState(null)
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const [shouldShowPixelSelector, setShouldShowPixelSelector] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState(null)

  const { artistId, artist, setArtist } = React.useContext(ArtistContext)
  const { next } = React.useContext(WizardContext)


  const saveFacebookPixel = async (pixelId) => {
    setIsLoading(true)

    const { newIntegrations, error } = await setPixel(artistId, pixelId)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    // Update artist context
    setArtist({
      type: 'update-integrations',
      payload: {
        integrations: newIntegrations,
      },
    })

    setIsLoading(false)
    next()
  }

  useAsyncEffect(async (isMounted) => {
    const { res: pixels = [], error } = await getArtistPixels(artistId)

    if (!isMounted()) return

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setPixels(pixels)
  }, [artistId])

  useAsyncEffect(async (isMounted) => {
    if (!pixels) return

    if (!getCurrentPixelId(artist)) {
      if (pixels.length === 1) {
        await saveFacebookPixel(pixels[0].id)
        if (!isMounted()) return

        return
      }
    }

    setShouldShowPixelSelector(pixels.length > 0)
    setIsLoading(false)
  }, [pixels])

  if (isLoading) return <Spinner />

  return (
    <div className="flex flex-1 flex-column mb-6 sm:mb-0">
      <h3 className="w-full mb-8 xs:mb-4 font-medium text-xl">{copy.facebookPixelSubtitle(pixels, shouldShowPixelSelector)}</h3>
      <MarkdownText className="hidden xs:block sm:w-2/3 text-grey-3 italic" markdown={copy.facebookPixelDescription(pixels, shouldShowPixelSelector)} />
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
            facebookPixel={facebookPixel}
            setFacebookPixel={setFacebookPixel}
            saveFacebookPixel={saveFacebookPixel}
            isLoading={isLoading}
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
