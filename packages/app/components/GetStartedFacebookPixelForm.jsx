import React from 'react'
import PropTypes from 'prop-types'

import GetStartedFacebookPixelSelector from '@/app/GetStartedFacebookPixelSelector'
import GetStartedFacebookPixelInput from '@/app/GetStartedFacebookPixelInput'

const GetStartedFacebookPixelForm = ({
  pixels,
  setPixels,
  isLoading,
  setIsLoading,
  setError,
}) => {
  return (
    pixels.length ? (
      <GetStartedFacebookPixelSelector
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setError={setError}
      />
    ) : (
      <GetStartedFacebookPixelInput
        setPixels={setPixels}
      />
    )
  )
}

GetStartedFacebookPixelForm.propTypes = {
  pixels: PropTypes.array.isRequired,
  setPixels: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

GetStartedFacebookPixelForm.defaultProps = {
}

export default GetStartedFacebookPixelForm
