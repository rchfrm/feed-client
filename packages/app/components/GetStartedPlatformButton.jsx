import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'

import brandColors from '@/constants/brandColors'
import Spinner from '@/elements/Spinner'

const GetStartedPlatformButton = ({ platform, setSelectedPlatform, isLoading }) => {
  const { name, value } = platform

  return (
    <ButtonPill
      className="w-32 sm:w-48 mx-3 mb-5"
      onClick={() => setSelectedPlatform(value)}
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
  platform: PropTypes.object.isRequired,
  setSelectedPlatform: PropTypes.func.isRequired,
}

GetStartedPlatformButton.defaultProps = {
}

export default GetStartedPlatformButton
