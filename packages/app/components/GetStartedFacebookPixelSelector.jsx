import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const GetStartedFacebookPixelSelector = ({
  isLoading,
  facebookPixel,
  setFacebookPixel,
  saveFacebookPixel,
}) => {
  return (
    <>
      <PixelSelector
        updateParentPixel={setFacebookPixel}
        trackLocation="GetStartedFacebookPixelSelector"
        shouldSaveOnChange={false}
        hasNoPixelOption={false}
        shouldShowPixelCopier={false}
        className="w-full mb-4"
      />
      <Button
        version="green"
        onClick={() => saveFacebookPixel(facebookPixel)}
        loading={isLoading}
        className="w-full sm:w-48"
        trackComponentName="GetStartedFacebookPixelSelector"
      >
        Save
        <ArrowAltIcon
          className="ml-3"
          direction="right"
          fill="white"
        />
      </Button>
    </>
  )
}

GetStartedFacebookPixelSelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  facebookPixel: PropTypes.string.isRequired,
  setFacebookPixel: PropTypes.func.isRequired,
  saveFacebookPixel: PropTypes.func.isRequired,

}

GetStartedFacebookPixelSelector.defaultProps = {
}

export default GetStartedFacebookPixelSelector
