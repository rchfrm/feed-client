import React from 'react'
import PropTypes from 'prop-types'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ObjectiveSettingsChangeAlertFacebookPixelSelector from '@/app/ObjectiveSettingsChangeAlertFacebookPixelSelector'
import ObjectiveSettingsChangeAlertFacebookPixelInput from '@/app/ObjectiveSettingsChangeAlertFacebookPixelInput'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import { getArtistPixels, setPixel, getCurrentPixelId } from '@/app/helpers/settingsHelpers'

const ObjectiveSettingsChangeAlertFacebookPixel = ({
  shouldSave,
  setShouldSave,
  setHasError,
}) => {
  const [pixels, setPixels] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const { artistId, artist, setArtist } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    const { res: pixels = [], error } = await getArtistPixels(artistId)

    if (!isMounted()) return

    if (error) {
      setError(error)
      return
    }

    setPixels(pixels)
  }, [artistId])

  const saveFacebookPixel = async (pixelId) => {
    const { newIntegrations, error } = await setPixel(artistId, pixelId)

    if (error) {
      setHasError(true)
      setError(error)
      return
    }

    // Update artist context
    setArtist({
      type: 'update-integrations',
      payload: {
        integrations: newIntegrations,
      },
    })
  }

  useAsyncEffect(async (isMounted) => {
    if (!pixels) return

    if (!getCurrentPixelId(artist)) {
      if (pixels.length === 1) {
        setShouldSave(true)

        await saveFacebookPixel(pixels[0].id)
        if (!isMounted()) return

        setShouldSave(false)

        return
      }
    }

    setIsLoading(false)
  }, [pixels])

  if (isLoading || pixels.length === 1) return <Spinner className="h-48 flex items-center" width={28} />

  return (
    <>
      <Error error={error} />
      {pixels.length > 1 ? (
        <ObjectiveSettingsChangeAlertFacebookPixelSelector
          saveFacebookPixel={saveFacebookPixel}
          error={error}
          shouldSave={shouldSave}
          setShouldSave={setShouldSave}
          setIsLoading={setIsLoading}
        />
      ) : (
        <ObjectiveSettingsChangeAlertFacebookPixelInput
          shouldSave={shouldSave}
          setShouldSave={setShouldSave}
          setHasError={setHasError}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  )
}

ObjectiveSettingsChangeAlertFacebookPixel.propTypes = {
  shouldSave: PropTypes.bool,
  setShouldSave: PropTypes.func,
  setHasError: PropTypes.func,
}

ObjectiveSettingsChangeAlertFacebookPixel.defaultProps = {
  shouldSave: false,
  setShouldSave: () => {},
  setHasError: () => {},
}

export default ObjectiveSettingsChangeAlertFacebookPixel