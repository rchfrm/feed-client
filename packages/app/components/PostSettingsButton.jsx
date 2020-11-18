import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import GearIcon from '@/icons/GearIcon'

import brandColors from '@/constants/brandColors'

const PostSettingsButton = ({
  className,
  missingDefaultLink,
  goToPostSettings,
}) => {
  return (
    <Button
      className={[className, 'relative'].join(' ')}
      onClick={goToPostSettings}
      version="black small icon"
    >
      <GearIcon fill={brandColors.bgColor} />
      Settings
      {missingDefaultLink && (
        <div
          className={[
            'absolute top-0 right-0',
            '-mt-4 -mr-6',
            'bg-red w-3 h-3 rounded-full',
          ].join(' ')}
        />
      )}
    </Button>
  )
}

PostSettingsButton.propTypes = {
  className: PropTypes.string,
  missingDefaultLink: PropTypes.bool.isRequired,
  goToPostSettings: PropTypes.func.isRequired,
}

PostSettingsButton.defaultProps = {
  className: null,
}

export default PostSettingsButton
