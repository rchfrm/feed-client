import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  version,
  width: widthProp,
  marginBottom,
  textColour,
  bgColour,
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
        color: textColour,
        marginBottom,
        backgroundColor: bgColour,
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
  textColour: PropTypes.string,
  bgColour: PropTypes.string,
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
  textColour: '',
  bgColour: '',
  disabled: false,
  type: 'button',
  success: false,
  className: '',
  onClick: () => {},
}

export default Button
