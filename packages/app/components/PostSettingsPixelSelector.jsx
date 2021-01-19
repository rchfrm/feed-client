import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

const PostSettingsPixelSelector = ({
  className,
}) => {
  const [activePixelId, setActivePixelId] = React.useState('')
  return (
    <div
      className={[
        'relative pr-3',
        className,
      ].join(' ')}
    >
      <PixelSelector
        updateParentPixel={setActivePixelId}
        trackLocation="Post settings"
      />
      {/* SHOW RED DOT IF NO PIXEL SELECTED */}
      {!activePixelId && (
        <div
          className={[
            'absolute top-0 right-0',
            'mr-1 -mt-2',
            'w-4 h-4',
            'bg-red rounded-full',
          ].join(' ')}
        />
      )}
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
