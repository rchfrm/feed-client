import React from 'react'
import PropTypes from 'prop-types'
import TickIcon from '@/icons/TickIcon'
import FacebookIcon from '@/landing/icons/FacebookIcon'
import InstagramIcon from '@/landing/icons/InstagramIcon'
import brandColors from '@/constants/brandColors'

const getIconEl = (icon, success) => {
  if (success) {
    return (
      <div className="input--icon">
        <TickIcon fill={brandColors.green} width="20" />
      </div>
    )
  }
  if (icon === 'facebook') {
    return (
      <div className="input--icon">
        <FacebookIcon fill={brandColors.black} width="20" />
      </div>
    )
  }
  if (icon === 'instagram') {
    return (
      <div className="input--icon">
        <InstagramIcon fill={brandColors.black} width="20" />
      </div>
    )
  }
  return null
}

const InputBase = ({
  name,
  label,
  readOnly,
  required,
  className,
  icon,
  error,
  errorMessage,
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
  const iconEl = getIconEl(icon, success)
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
            <span>
              {label}
              {required && <span className="asterisk">*</span>}
            </span>
            {error && errorMessage && (
              <span className="inputLabel__errorMessage">{errorMessage}</span>
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
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

InputBase.defaultProps = {
  readOnly: false,
  label: '',
  required: false,
  className: '',
  icon: '',
  error: false,
  errorMessage: '',
  success: false,
  disabled: false,
}

export default InputBase
