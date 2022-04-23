import React from 'react'
import useAsyncEffect from 'use-async-effect'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import PixelSelector from '@/app/PixelSelector'

import MarkdownText from '@/elements/MarkdownText'
import Error from '@/elements/Error'

import { setPixel } from '@/app/helpers/settingsHelpers'

import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertFacebookPixel = ({
  data,
  setData,
  shouldStoreData,
  setShouldStoreData,
}) => {
  const [facebookPixel, setFacebookPixel] = React.useState(null)
  const [error, setError] = React.useState(null)

  const { artistId, setArtist } = React.useContext(ArtistContext)

  const saveFacebookPixel = async (pixelId) => {
    const { newIntegrations, error } = await setPixel(artistId, pixelId)

    if (error) {
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

  useAsyncEffect(async () => {
    if (shouldStoreData) {
      await saveFacebookPixel(facebookPixel)

      setData({ ...data, facebookPixel })
      setShouldStoreData(false)
    }
  }, [shouldStoreData, setShouldStoreData, data, setData, facebookPixel])

  return (
    <>
      <h3>{copy.alertSelectPixelTitle}</h3>
      <MarkdownText markdown={copy.alertSelectPixelDescription} />
      <Error error={error} />
      <PixelSelector
        updateParentPixel={setFacebookPixel}
        trackLocation="GetStartedFacebookPixelSelector"
        shouldSaveOnChange={false}
        shouldShowPixelCopier={false}
        hasNoPixelOption={false}
        className="w-full mb-4"
      />
    </>
  )
}

export default ObjectiveSettingsChangeAlertFacebookPixel
