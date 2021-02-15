import React from 'react'
import PropTypes from 'prop-types'

const ToggleSwitchClicker = ({
  action,
  onChange,
}) => {
  // Handle click
  const onClick = React.useCallback(() => {
    const newState = action === 'on'
    onChange(newState)
  }, [action, onChange])

  return (
    <button
      className={[
        'absolute',
        'top-0',
        'bottom-0',
        action === 'off' ? 'left-0' : 'right-0',
        'w-1/2',
        'z-2',
      ].join(' ')}
      onClick={onClick}
      aria-label={`Toggle ${action}`}
    />
  )
}

ToggleSwitchClicker.propTypes = {
  action: PropTypes.oneOf(['on', 'off']).isRequired,
  onChange: PropTypes.func.isRequired,
}

export default ToggleSwitchClicker
