import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

const PostSettingsPixelSelector = ({
  className,
}) => {
  const [activePixel, setActivePixel] = React.useState('')
  return (
    <div
      className={[
        'pr-3',
        className,
      ].join(' ')}
    >
      <PixelSelector
        updateParentPixel={setActivePixel}
      />
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
