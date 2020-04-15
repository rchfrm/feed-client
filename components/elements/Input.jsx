// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import TickIcon from '../icons/TickIcon'
import CrossIcon from '../icons/CrossIcon'
import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import brandColors from '../../constants/brandColors'


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
  name,
  label,
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
  autoFocus,
}) => {
  const containerClasses = ['input--container', className]
  // Handle error and success states
  if (error) {
    containerClasses.push('_error')
  }
  if (success) {
    containerClasses.push('_success')
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
  }, [])

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
            {required && <span className="asterix">*</span>}
          </span>
        )}
        {/* INPUT */}
        <div className="input--inner">
          <input
            className={['input', `input--${version}`].join(' ')}
            name={name}
            type={type}
            onChange={handleChange}
            placeholder={placeholder}
            style={{
              width: `${width}%`,
            }}
            value={value}
            readOnly={readOnly}
            required={required}
            ref={inputElement}
          />
          {/* ICON */}
          {iconEl}
        </div>
      </label>
    </div>
  )
}

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
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
  autoFocus: PropTypes.bool,
}

Input.defaultProps = {
  placeholder: '',
  readOnly: false,
  type: 'text',
  label: '',
  value: '',
  version: 'box',
  width: 100,
  required: false,
  className: '',
  icon: '',
  error: false,
  success: false,
  autoFocus: false,
}

export default Input
