import React from 'react'
import PropTypes from 'prop-types'

import Input from '@/elements/Input'
import Error from '@/elements/Error'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import ButtonNew from '@/elements/ButtonNew'

import { createNewPixel } from '@/app/helpers/settingsHelpers'

const GetStartedFacebookPixelInput = ({ setPixels }) => {
  const [pixelName, setPixelName] = React.useState('')
  const [error, setError] = React.useState(null)

  const { artistId } = React.useContext(ArtistContext)

  const handleChange = (e) => {
    setPixelName(e.target.value)
  }

  const createPixel = async () => {
    const { res: newPixel, error } = await createNewPixel(artistId, pixelName)

    if (error) {
      setError(error)
      return
    }

    setPixels(newPixel)
  }

  return (
    <>
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
      <ButtonNew
        onClick={createPixel}
        className="w-full sm:w-48"
        trackComponentName="GetStartedFacebookPixelInput"
      >
        Save pixel
      </ButtonNew>
    </>
  )
}

GetStartedFacebookPixelInput.propTypes = {
  setPixels: PropTypes.func.isRequired,
}

GetStartedFacebookPixelInput.defaultProps = {
}

export default GetStartedFacebookPixelInput
