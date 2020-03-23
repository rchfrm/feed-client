import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Icon from './Icon'

const ButtonToggle = ({ onClick, state, className }) => {
  const classes = [`_${state}`, className].join(' ')
  return (
    <Button
      version="toggle"
      onClick={onClick}
      className={classes}
    >
      <Icon
        version="tick"
        width="18"
      />
    </Button>
  )
}

ButtonToggle.propTypes = {
  onClick: PropTypes.func,
  state: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ButtonToggle.defaultProps = {
  onClick: () => {},
  className: '',
}


export default ButtonToggle
