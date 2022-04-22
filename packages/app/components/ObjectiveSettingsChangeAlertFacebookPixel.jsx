import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ObjectiveSettingsChangeAlertFacebookPixelSelector from '@/app/ObjectiveSettingsChangeAlertFacebookPixelSelector'
import ObjectiveSettingsChangeAlertFacebookPixelInput from '@/app/ObjectiveSettingsChangeAlertFacebookPixelInput'

import Spinner from '@/elements/Spinner'
import Error from '@/elements/Error'

import { getArtistPixels } from '@/app/helpers/settingsHelpers'

const ObjectiveSettingsChangeAlertFacebookPixel = () => {
  const [pixels, setPixels] = React.useState([])
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const { artistId } = React.useContext(ArtistContext)

  useAsyncEffect(async (isMounted) => {
    const { res: pixels = [], error } = await getArtistPixels(artistId)

    if (!isMounted()) return

    if (error) {
      setError(error)
      return
    }

    setPixels(pixels)
    setIsLoading(false)
  }, [artistId])

  if (isLoading) {
    return (
      <div className="h-48 flex items-center">
        <Spinner width={28} />
      </div>
    )
  }

  return (
    <>
      <Error error={error} />
      {pixels.length > 0 ? (
        <ObjectiveSettingsChangeAlertFacebookPixelSelector />
      ) : (
        <ObjectiveSettingsChangeAlertFacebookPixelInput />
      )}
    </>
  )
}

export default ObjectiveSettingsChangeAlertFacebookPixel
