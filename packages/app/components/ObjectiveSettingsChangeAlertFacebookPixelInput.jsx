import React from 'react'
import useAsyncEffect from 'use-async-effect'

import Input from '@/elements/Input'
import Error from '@/elements/Error'
import MarkdownText from '@/elements/MarkdownText'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { createNewPixel } from '@/app/helpers/settingsHelpers'

import copy from '@/app/copy/controlsPageCopy'

const ObjectiveSettingsChangeAlertFacebookPixelInput = ({
  data,
  setData,
  shouldStoreData,
  setShouldStoreData,
}) => {
  const [pixelName, setPixelName] = React.useState('')
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  const handleChange = (e) => {
    setPixelName(e.target.value)
  }

  const createPixel = React.useCallback(async () => {
    const { res: newPixel, error } = await createNewPixel(artistId, pixelName)

    if (error) {
      setError(error)
    }

    return newPixel
  }, [artistId, pixelName])

  useAsyncEffect(async () => {
    if (shouldStoreData) {
      const newPixel = await createPixel()

      setData({ ...data, facebookPixel: newPixel })
      setShouldStoreData(false)
    }
  }, [shouldStoreData, setShouldStoreData, data, setData])

  return (
    <>
      <h3>{copy.alertNewPixelTitle}</h3>
      <MarkdownText markdown={copy.alertNewPixelDescription} />
      <Error error={error} />
      <Input
        name="pixel-name"
        version="box"
        type="text"
        value={pixelName}
        handleChange={handleChange}
        placeholder="Your pixel name"
        className="w-full mb-12"
      />
    </>
  )
}

export default ObjectiveSettingsChangeAlertFacebookPixelInput