import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

const Button = ({
  version,
  disabled,
  type,
  success,
  loading,
  className,
  style,
  onClick,
  children,
}) => {
  const versions = version
    .split(' ')
    .map((versionString) => `button--${versionString}`)
  // Define classes
  const classes = ['button', ...versions]
  if (className) {
    classes.push(className)
  }
  if (success) {
    classes.push('button--success')
  }
  // OUTPUT BUTTON
  return (
    <button
      type={type}
      disabled={disabled}
      className={classes.join(' ')}
      onClick={onClick}
      style={style}
    >
      <span className="button--innerText">
        {loading ? <Spinner className="button--spinner" /> : children}
      </span>
    </button>
  )
}

Button.propTypes = {
  version: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  version: 'black',
  disabled: false,
  type: 'button',
  success: false,
  loading: false,
  style: {},
  className: '',
  onClick: () => {},
}

export default Button
