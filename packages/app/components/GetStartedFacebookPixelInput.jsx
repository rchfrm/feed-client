import React from 'react'
import PropTypes from 'prop-types'

import Input from '@/elements/Input'

import { ArtistContext } from '@/app/contexts/ArtistContext'

import Button from '@/elements/Button'

import { createNewPixel } from '@/app/helpers/settingsHelpers'

const GetStartedFacebookPixelInput = ({ setPixels }) => {
  const [pixelName, setPixelName] = React.useState('')
  const { artistId } = React.useContext(ArtistContext)

  const handleChange = (e) => {
    setPixelName(e.target.value)
  }

  const createPixel = async () => {
    const { res: newPixel, error } = await createNewPixel(artistId, pixelName)

    if (error) {
      return
    }

    setPixels(newPixel)
  }

  return (
    <>
      <Input
        name="pixel-name"
        version="box"
        type="text"
        value={pixelName}
        handleChange={handleChange}
        placeholder="Your pixel name"
        className="w-full mb-12"
      />
      <Button
        version="green"
        onClick={createPixel}
        className="w-full sm:w-48"
        trackComponentName="GetStartedFacebookPixelInput"
      >
        Save pixel
      </Button>
    </>
  )
}

GetStartedFacebookPixelInput.propTypes = {
  setPixels: PropTypes.func.isRequired,
}

GetStartedFacebookPixelInput.defaultProps = {
}

export default GetStartedFacebookPixelInput