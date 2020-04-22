import React from 'react'
import PropTypes from 'prop-types'

import Spinner from './Spinner'

const Button = ({
  version,
  width: widthProp,
  marginBottom,
  textColor,
  bgColor,
  disabled,
  type,
  success,
  loading,
  className,
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
        color: textColor,
        marginBottom,
        backgroundColor: bgColor,
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
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

Button.defaultProps = {
  version: 'black',
  width: '',
  marginBottom: '',
  textColor: '',
  bgColor: '',
  disabled: false,
  type: 'button',
  loading: false,
  success: false,
  className: '',
  onClick: () => {},
}

export default Button
