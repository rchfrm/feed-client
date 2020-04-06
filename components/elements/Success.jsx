// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

const Success = ({ message, messagePrefix, className }) => {
  if (!message) return null
  const fullMessage = `${messagePrefix}${message}`
  const classes = ['success', className].join(' ')
  return (
    <p className={classes}>{fullMessage}</p>
  )
}

Success.propTypes = {
  message: PropTypes.string.isRequired,
  messagePrefix: PropTypes.string,
  className: PropTypes.string,
}

Success.defaultProps = {
  messagePrefix: '',
  className: '',
}

export default Success
