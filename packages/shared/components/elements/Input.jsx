// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import InputBase from '@/elements/InputBase'

const Input = ({
  handleChange,
  onBlur,
  updateValue,
  name,
  label,
  prefix,
  showPrefix,
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
  errorMessage,
  success,
  autoComplete,
  autoFocus,
  disabled,
}) => {
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
      className={[
        className,
        prefix && showPrefix ? '-has-prefix' : null,
      ].join(' ')}
      icon={icon}
      error={error}
      errorMessage={errorMessage}
      success={success}
      disabled={disabled}
    >
      {prefix && showPrefix && (
        <div className="input--prefix">
          <span>{prefix}</span>
        </div>
      )}
      <input
        ref={inputElement}
        className={['input', `input--${version}`].join(' ')}
        name={name}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
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
  onBlur: PropTypes.func,
  updateValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  prefix: PropTypes.string,
  showPrefix: PropTypes.bool,
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
  errorMessage: PropTypes.string,
  success: PropTypes.bool,
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
}

Input.defaultProps = {
  handleChange: null,
  onBlur: () => {},
  updateValue: null,
  placeholder: '',
  readOnly: false,
  type: 'text',
  label: '',
  prefix: '',
  showPrefix: false,
  tooltipMessage: '',
  value: '',
  version: 'box',
  width: 100,
  required: false,
  className: '',
  icon: '',
  error: false,
  errorMessage: '',
  success: false,
  autoComplete: true,
  autoFocus: false,
  disabled: false,
}

export default Input
