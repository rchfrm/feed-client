// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import InputBase from '@/elements/InputBase'

import TickIcon from '@/icons/TickIcon'
import CrossIcon from '@/icons/CrossIcon'
import FacebookIcon from '@/icons/FacebookIcon'
import InstagramIcon from '@/icons/InstagramIcon'
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
      console.error(`Please provide an function to update the value in ${name}.`)
      return
    }
    if (handleChange && updateValue) {
      console.error(`Please only provide *either* handleChange or updateValue for ${name}, not both.`)
      return
    }
    if (updateValue) {
      updateValue(e.target.value)
      return
    }
    handleChange(e)
  }, [handleChange, updateValue, name])

  return (
    <InputBase
      name={name}
      label={label}
      tooltipMessage={tooltipMessage}
      readOnly={readOnly}
      required={required}
      className={className}
      icon={icon}
      error={error}
      success={success}
      disabled={disabled}
    >
      <input
        ref={inputElement}
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
        autoComplete={!autoComplete ? 'off' : ''}
      />
    </InputBase>
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
