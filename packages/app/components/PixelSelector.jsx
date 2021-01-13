import React from 'react'
import PropTypes from 'prop-types'

import Select from '@/elements/Select'
import Error from '@/elements/Error'

import { setPixel } from '@/app/helpers/postsHelpers'

const availablePixels = [
  {
    name: 'Pixel A',
    value: 123,
  },
  {
    name: 'Pixel B',
    value: 456,
  },
]

const PixelSelector = ({
  onSelect,
  onSuccess,
  onError,
  className,
  selectClassName,
}) => {
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [activePixelId, setActivePixelId] = React.useState(availablePixels[0].value)

  const setNewPixel = React.useCallback(async (pixelId) => {
    console.log('pixelId', pixelId)
    setLoading(true)
    onSelect(pixelId)
    const { res, error } = await setPixel(pixelId)
    setLoading(false)
    if (error) {
      setError(error)
      onError(error)
      return
    }
    const { pixelId: newPixelId } = res
    onSuccess(newPixelId)
    setActivePixelId(newPixelId)
  }, [onSelect, onError, onSuccess])

  console.log('availablePixels', availablePixels)

  const selectOptions = [
    {
      type: 'group',
      name: 'Available pixels',
      options: availablePixels,
    },
    {
      type: 'group',
      name: 'Other options',
      options: [
        {
          value: '_new',
          name: '+ Create a new pixel',
        },
        {
          value: '_none',
          name: 'Disable Pixel',
        },
      ],
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
  onSelect: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
}

PixelSelector.defaultProps = {
  onSelect: () => {},
  onSuccess: () => {},
  onError: () => {},
  className: null,
  selectClassName: null,
}

export default PixelSelector
