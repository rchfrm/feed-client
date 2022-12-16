import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const PostSettingsSaveButton = ({
  onClick,
  shouldShow,
  isLoading,
}) => {
  return (
    shouldShow && (
      <Button
        version="green small"
        className={[
          'h-8',
          'rounded-full',
        ].join(' ')}
        onClick={onClick}
        loading={isLoading}
        trackComponentName="PostSettingsSaveButton"
      >
        Save
      </Button>
    )
  )
}

PostSettingsSaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  shouldShow: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default PostSettingsSaveButton
