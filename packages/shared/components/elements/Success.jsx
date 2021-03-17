// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import TickIcon from '@/icons/TickIcon'
import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'

const Success = ({ message, messagePrefix, className }) => {
  if (!message) return null
  const fullMessage = `${messagePrefix}${message}`
  const classes = ['success--message', className].join(' ')
  return (
    <p className={classes}>
      <span className="success-message_icon">
        <TickIcon fill={brandColors.successColor} />
      </span>
      <MarkdownText
        markdown={fullMessage}
        disallowedTypes={['paragraph']}
        unwrapDisallowed
        skipTextBlock
      />
    </p>
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
