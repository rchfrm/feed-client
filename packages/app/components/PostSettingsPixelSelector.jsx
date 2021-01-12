import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

const PostSettingsPixelSelector = ({
  activePixelId,
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PixelSelector activePixelId={activePixelId} />
    </div>
  )
}

PostSettingsPixelSelector.propTypes = {
  activePixelId: PropTypes.string,
  className: PropTypes.string,
}

PostSettingsPixelSelector.defaultProps = {
  activePixelId: '',
  className: null,
}

export default PostSettingsPixelSelector
