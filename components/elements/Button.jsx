import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  version,
  width: widthProp,
  marginBottom,
  textColor,
  bgColor,
  disabled,
  type,
  success,
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
      {children}
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
  success: false,
  className: '',
  onClick: () => {},
}

export default Button
