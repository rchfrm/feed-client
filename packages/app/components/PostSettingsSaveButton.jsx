import React from 'react'
import PropTypes from 'prop-types'
import ButtonNew from '@/elements/ButtonNew'

const PostSettingsSaveButton = ({
  onClick,
  shouldShow,
  isLoading,
}) => {
  return (
    shouldShow && (
      <ButtonNew
        size="small"
        onClick={onClick}
        className="w-20"
        isLoading={isLoading}
        trackComponentName="PostSettingsSaveButton"
      >
        Save
      </ButtonNew>
    )
  )
}

PostSettingsSaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  shouldShow: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default PostSettingsSaveButton
