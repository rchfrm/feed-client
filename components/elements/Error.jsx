// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

const Error = ({ error, messagePrefix }) => {
  if (!error) return null
  const { message: errorMessage } = error
  const message = `${messagePrefix}${errorMessage}`
  return (
    <p className="error">{message}</p>
  )
}

Error.propTypes = {
  error: PropTypes.object,
  messagePrefix: PropTypes.string,
}

Error.defaultProps = {
  error: null,
  messagePrefix: '',
}

export default Error
