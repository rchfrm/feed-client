import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

import Button from '@/elements/Button'
import ArrowIcon from '@/icons/ArrowIcon'

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
        shouldShowPixelCopier={false}
        className="w-full mb-4"
      />
      <Button
        onClick={() => saveFacebookPixel(facebookPixel)}
        isLoading={isLoading}
        className="w-full sm:w-48"
        trackComponentName="GetStartedFacebookPixelSelector"
      >
        Save
        <ArrowIcon
          className="w-7 h-auto ml-1"
          direction="right"
        />
      </Button>
    </>
  )
}

GetStartedFacebookPixelSelector.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  facebookPixel: PropTypes.string,
  setFacebookPixel: PropTypes.func.isRequired,
  saveFacebookPixel: PropTypes.func.isRequired,

}

GetStartedFacebookPixelSelector.defaultProps = {
  facebookPixel: null,
}

export default GetStartedFacebookPixelSelector
