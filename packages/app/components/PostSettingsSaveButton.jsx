import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const PostSettingsSaveButton = ({
  onClick,
  shouldShow,
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
        trackComponentName="PostSettingsSaveButton"
      >
        Save
      </Button>
    )
  )
}

PostSettingsSaveButton.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

PostSettingsSaveButton.defaultProps = {
}

export default PostSettingsSaveButton
