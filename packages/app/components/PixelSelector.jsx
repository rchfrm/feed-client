import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

const PixelSelector = ({
  activePixelId,
  availablePixels,
  onSelect,
  onSuccess,
  onError,
  className,
  selectClassName,
}) => {
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  const setNewPixel = React.useCallback((pixelId) => {
    console.log('pixelId', pixelId)
    onSuccess()
  }, [onSuccess])

  console.log('availablePixels', availablePixels)

  const selectOptions = [...availablePixels, {
    value: '_new',
    name: '+ Create a new pixel',
  }]

  return (
    <div className={className}>
      {error && (
        <Error error={error} />
      )}
      <Select
        loading={loading}
        className={selectClassName}
        handleChange={(e) => {
          const { target: { value } } = e
          // Do nothing if value is current value
          if (value === activePixelId) return
          // Handle adding NEW PIXEL
          if (value === '_new') {
            setLoading(true)
            return
          }
          setNewPixel(value)
        }}
        name="Choose link"
        options={selectOptions}
        placeholder={!activePixelId ? 'Choose a pixel to use' : null}
        selectedValue={activePixelId}
        version="box"
      />
    </div>
  )
}

PixelSelector.propTypes = {
  activePixelId: PropTypes.string,
  availablePixels: PropTypes.array,
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
}

PixelSelector.defaultProps = {
  activePixelId: '',
  availablePixels: [],
  onSelect: () => {},
  onSuccess: () => {},
  onError: () => {},
  className: null,
  selectClassName: null,
}

export default PixelSelector
