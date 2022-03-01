import React from 'react'
import PropTypes from 'prop-types'

import PlatformIcon from '@/icons/PlatformIcon'
import ButtonPill from '@/elements/ButtonPill'

import { capitalise } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const GetStartedPlatformButton = ({ platform, setSelectedPlatform, isLoading }) => {
  return (
    <ButtonPill
      key={platform}
      className="w-32 sm:w-48 mx-0 mx-3 mb-5"
      onClick={() => setSelectedPlatform(platform)}
      loading={isLoading}
      style={{
        border: `2px solid ${brandColors.textColor}`,
      }}
      hasIcon
      trackComponentName="GetStartedPlatform"
    >
      <PlatformIcon
        platform={platform}
        className="mr-5"
        title={platform}
        fill={brandColors[platform].bg}
      />
      {capitalise(platform)}
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
