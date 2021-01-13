import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

const PostSettingsPixelSelector = ({
  className,
}) => {
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <PixelSelector />
    </div>
  )
}

PostSettingsPixelSelector.propTypes = {
  className: PropTypes.string,
}

PostSettingsPixelSelector.defaultProps = {
  className: null,
}

export default PostSettingsPixelSelector
