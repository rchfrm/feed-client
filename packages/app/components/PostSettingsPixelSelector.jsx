import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

const PostSettingsPixelSelector = ({
  className,
}) => {
  const [activePixelId, setActivePixelId] = React.useState('')
  console.log('activePixelId', activePixelId)
  return (
    <div
      className={[
        'pr-3',
        className,
      ].join(' ')}
    >
      <PixelSelector
        updateParentPixel={setActivePixelId}
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
