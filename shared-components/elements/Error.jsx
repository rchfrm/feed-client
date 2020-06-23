// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

const Error = ({ error, messagePrefix, className }) => {
  if (!error) return null
  const { message: errorMessage } = error
  const message = `${messagePrefix}${errorMessage}`
  const classes = ['error', className].join(' ')
  return (
    <MarkdownText className={classes} markdown={message} />
  )
}

Error.propTypes = {
  error: PropTypes.object,
  messagePrefix: PropTypes.string,
  className: PropTypes.string,
}

Error.defaultProps = {
  error: null,
  messagePrefix: '',
  className: '',
}

export default Error
