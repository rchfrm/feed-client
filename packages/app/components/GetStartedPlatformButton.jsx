import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'

const GetStartedPlatformButton = ({ platform, setSelectedPlatform, isLoading }) => {
  const { name, value } = platform

  return (
    <ButtonPill
      className="w-32 sm:w-48 mx-3 mb-5"
      onClick={() => setSelectedPlatform(value)}
      loading={isLoading}
      style={{
        border: `2px solid ${brandColors.textColor}`,
      }}
      hasIcon
      trackComponentName="GetStartedPlatformButton"
    >
      <PlatformIcon
        platform={value}
        className="mr-5"
        title={value}
        fill={brandColors[value].bg}
      />
      {name}
    </ButtonPill>
  )
}

GetStartedPlatformButton.propTypes = {
  platform: PropTypes.string.isRequired,
  setSelectedPlatform: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

GetStartedPlatformButton.defaultProps = {
}

export default GetStartedPlatformButton
