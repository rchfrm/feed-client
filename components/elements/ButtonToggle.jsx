import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import Icon from './Icon'
import Spinner from './Spinner'

const ButtonToggle = ({ onClick, state, className }) => {
  const classes = [`_${state}`, className].join(' ')
  const ButtonIcon = () => {
    if (state === 'off') return null
    if (state === 'on') return <Icon version="tick" />
    if (state === 'loading') return <Spinner class />
  }

  return (
    <Button
      version="toggle"
      onClick={onClick}
      className={classes}
    >
      <ButtonIcon />
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
