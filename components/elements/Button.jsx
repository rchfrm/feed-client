import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

const Button = ({
  version,
  width: widthProp,
  marginBottom,
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
  const width = typeof widthProp === 'string' ? widthProp : ''
  const widthPercentage = typeof widthProp === 'number' ? widthProp : ''
  const classes = ['button', width].concat(versions)
  if (className) {
    classes.push(className)
  }
  if (success) {
    classes.push('button--success')
  }
  return (
    <button
      type={type}
      disabled={disabled}
      className={classes.join(' ')}
      onClick={onClick}
      style={{
        width: `${widthPercentage}%`,
        marginBottom,
      }}
    >
      <span className="button--innerText">
        {loading ? <Spinner className="button--spinner" /> : children}
      </span>
    </button>
  )
}

Button.propTypes = {
  version: PropTypes.string,
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  marginBottom: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  version: 'black',
  width: '',
  marginBottom: '',
  disabled: false,
  type: 'button',
  loading: false,
  success: false,
  style: {},
  className: '',
  onClick: () => {},
}

export default Button
