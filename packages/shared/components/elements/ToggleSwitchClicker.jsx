import React from 'react'
import PropTypes from 'prop-types'

const ToggleSwitchClicker = ({
  name,
  action,
  onChange,
}) => {
  // Handle click
  const onClick = React.useCallback(() => {
    const newState = action === 'on'
    onChange(newState, name)
  }, [name, action, onChange])

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
  name: PropTypes.string,
  action: PropTypes.oneOf(['on', 'off']).isRequired,
  onChange: PropTypes.func.isRequired,
}

ToggleSwitchClicker.defaultProps = {
  name: '',
}

export default ToggleSwitchClicker
