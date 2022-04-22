import React from 'react'

import Input from '@/elements/Input'
import Error from '@/elements/Error'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import { createNewPixel } from '@/app/helpers/settingsHelpers'

const ObjectiveSettingsChangeAlertFacebookPixelInput = () => {
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

    console.log(newPixel)
  }, [artistId, pixelName])

  console.log(createPixel)

  return (
    <>
      <h3>Create your Facebook Pixel</h3>
      <p>You can install this pixel on your website(s) for this profile. Don't worry if you can't install your pixel yet, there's no harm in including one in your ads anyway.</p>      <Error error={error} />
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
