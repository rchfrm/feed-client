import React from 'react'
import PropTypes from 'prop-types'

import GetStartedFacebookPixelSelector from '@/app/GetStartedFacebookPixelSelector'
import GetStartedFacebookPixelInput from '@/app/GetStartedFacebookPixelInput'

const GetStartedFacebookPixelForm = ({
  pixels,
  setPixels,
  facebookPixel,
  setFacebookPixel,
  saveFacebookPixel,
  isLoading,
}) => {
  return (
    pixels.length ? (
      <GetStartedFacebookPixelSelector
        isLoading={isLoading}
        facebookPixel={facebookPixel}
        setFacebookPixel={setFacebookPixel}
        saveFacebookPixel={saveFacebookPixel}
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
  facebookPixel: PropTypes.string,
  setFacebookPixel: PropTypes.func.isRequired,
  saveFacebookPixel: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

GetStartedFacebookPixelForm.defaultProps = {
  facebookPixel: '',
}

export default GetStartedFacebookPixelForm
