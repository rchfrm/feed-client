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

const Input = ({
  handleChange,
  updateValue,
  name,
  label,
  tooltipMessage,
  type,
  placeholder,
  value,
  version,
  width,
  readOnly,
  required,
  className,
  icon,
  error,
  success,
  autoComplete,
  autoFocus,
  disabled,
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
  // Auto focus input if needed
  const inputElement = React.useRef(null)
  React.useEffect(() => {
    if (!autoFocus) return
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [autoFocus])

  const onChange = React.useCallback((e) => {
    if (!handleChange && !updateValue) {
      console.error(`Please provide an function to update the value in ${name}`)
      return
    }
    if (updateValue) {
      updateValue(e.target.value)
      return
    }
    handleChange(e)
  }, [handleChange, updateValue, name])

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
          <input
            className={['input', `input--${version}`].join(' ')}
            name={name}
            type={type}
            onChange={onChange}
            placeholder={placeholder}
            style={{
              width: `${width}%`,
            }}
            value={value}
            readOnly={readOnly || disabled}
            required={required}
            ref={inputElement}
            autoComplete={!autoComplete ? 'off' : ''}
          />
          {/* ICON */}
          {iconEl}
        </div>
      </label>
    </div>
  )
}

Input.propTypes = {
  handleChange: PropTypes.func,
  updateValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltipMessage: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  version: PropTypes.string,
  width: PropTypes.number,
  required: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
}

Input.defaultProps = {
  handleChange: null,
  updateValue: null,
  placeholder: '',
  readOnly: false,
  type: 'text',
  label: '',
  tooltipMessage: '',
  value: '',
  version: 'box',
  width: 100,
  required: false,
  className: '',
  icon: '',
  error: false,
  success: false,
  autoComplete: true,
  autoFocus: false,
  disabled: false,
}

export default Input
