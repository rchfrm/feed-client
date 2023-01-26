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
        size="small"
        onClick={onClick}
        className="w-20"
        isLoading={isLoading}
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
