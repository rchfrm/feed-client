import React from 'react'
import PropTypes from 'prop-types'
import TooltipButton from '@/elements/TooltipButton'

const InputBase = ({
  name,
  label,
  tooltipMessage,
  readOnly,
  required,
  className,
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
            {/* LABEL TOOLTIP */}
            {tooltipMessage && (
              <TooltipButton copy={tooltipMessage} direction="right" trackLabel={`Input: ${label}`} />
            )}
            {error && errorMessage && (
              <span className="inputLabel__errorMessage">{errorMessage}</span>
            )}
          </span>
        )}
        {/* INPUT */}
        <div className="input--inner">
          {children}
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
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
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
  error: false,
  errorMessage: '',
  success: false,
  disabled: false,
}

export default InputBase
