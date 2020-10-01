// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import TickIcon from '@/icons/TickIcon'
import CrossIcon from '@/icons/CrossIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
import TooltipButton from '@/elements/TooltipButton'
import brandColors from '@/constants/brandColors'


const getIconEl = (icon, error, success) => {
  if (error) {
    return (
      <div className="input--icon">
        <CrossIcon fill={brandColors.errorColor} width="20" />
      </div>
    )
  }
  if (success) {
    return (
      <div className="input--icon">
        <TickIcon fill={brandColors.successColor} width="20" />
      </div>
    )
  }
  if (icon === 'facebook') {
    return (
      <div className="input--icon">
        <FacebookIcon fill={brandColors.textColor} width="20" />
      </div>
    )
  }
  if (icon === 'instagram') {
    return (
      <div className="input--icon">
        <InstagramIcon fill={brandColors.textCoolor} width="20" />
      </div>
    )
  }
  return null
}

const InputBase = ({
  name,
  label,
  tooltipMessage,
  readOnly,
  required,
  className,
  icon,
  error,
  success,
  disabled,
  children,
}) => {
  const containerClasses = ['input--container', className]
  // Handle error and success states
  if (error) {
    containerClasses.push('_error')
  }
  if (success) {
    containerClasses.push('_success')
  }
  if (disabled) {
    containerClasses.push('_disabled')
  }
  if (readOnly) {
    containerClasses.push('_readOnly')
  }
  // Get icon (if needed)
  const iconEl = getIconEl(icon, error, success)
  if (iconEl) {
    containerClasses.push('_hasIcon')
  }

  return (
    <div className={containerClasses.join(' ')}>
      <label
        className="inputLabel"
        htmlFor={name}
      >
        {/* LABEL */}
        {label && (
          <span className="inputLabel__text">
            {label}
            {required && <span className="asterisk">*</span>}
            {/* LABEL TOOLTIP */}
            {tooltipMessage && (
              <TooltipButton copy={tooltipMessage} direction="right" />
            )}
          </span>
        )}
        {/* INPUT */}
        <div className="input--inner">
          {children}
          {/* ICON */}
          {iconEl}
        </div>
      </label>
    </div>
  )
}

InputBase.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltipMessage: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

InputBase.defaultProps = {
  readOnly: false,
  label: '',
  tooltipMessage: '',
  required: false,
  className: '',
  icon: '',
  error: false,
  success: false,
  disabled: false,
}

export default InputBase
