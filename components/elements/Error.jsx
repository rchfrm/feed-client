// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ error, success, messagePrefix }) => {
  if (!error || success) return null
  const { message: errorMessage } = error
  const message = `${messagePrefix}${errorMessage || success}`
  const className = error ? 'error' : 'success'
  return (
    <p className={className}>{message}</p>
  )
}

Error.propTypes = {
  error: PropTypes.object,
  success: PropTypes.bool,
  messagePrefix: PropTypes.string,
}

Error.defaultProps = {
  error: null,
  success: false,
  messagePrefix: '',
}

export default Error
