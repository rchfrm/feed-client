import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import GearIcon from '@/icons/GearIcon'

import brandColors from '@/constants/brandColors'

const PostSettingsButton = ({ className, goToPostSettings }) => {
  return (
    <Button
      className={className}
      onClick={goToPostSettings}
      version="black small icon"
    >
      <GearIcon fill={brandColors.bgColor} />
      Settings
    </Button>
  )
}

PostSettingsButton.propTypes = {
  className: PropTypes.string,
  goToPostSettings: PropTypes.func.isRequired,
}

PostSettingsButton.defaultProps = {
  className: null,
}

export default PostSettingsButton
