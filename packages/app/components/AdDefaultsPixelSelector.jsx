import React from 'react'
import PropTypes from 'prop-types'

import PixelSelector from '@/app/PixelSelector'

const AdDefaultsPixelSelector = ({
  className,
}) => {
  const [activePixelId, setActivePixelId] = React.useState('')
  const [errorFetching, setErrorFetching] = React.useState(false)
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
        errorFetching={errorFetching}
        setErrorFetching={setErrorFetching}
      />
      {/* SHOW RED DOT IF NO PIXEL SELECTED */}
      {!activePixelId && !errorFetching && (
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

AdDefaultsPixelSelector.propTypes = {
  className: PropTypes.string,
}

AdDefaultsPixelSelector.defaultProps = {
  className: null,
}

export default AdDefaultsPixelSelector
