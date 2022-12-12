// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import InputBase from '@/elements/InputBase'

import NumberFormat from 'react-number-format'
// DOCS https://github.com/s-yadav/react-number-format#readme

import * as utils from '@/helpers/utils'

const InputCurrency = ({
  handleChange,
  currency,
  name,
  label,
  tooltipMessage,
  type,
  placeholder,
  value,
  version,
  readOnly,
  required,
  className,
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
  // Auto focus input if needed
  const inputElement = React.useRef(null)
  React.useEffect(() => {
    if (! autoFocus) return
    if (inputElement.current) {
      inputElement.current.focus()
    }
  }, [autoFocus])

  const currencySymbol = React.useMemo(() => {
    return utils.getCurrencySymbol(currency)
  }, [currency])

  return (
    <InputBase
      name={name}
      label={label}
      tooltipMessage={tooltipMessage}
      readOnly={readOnly}
      required={required}
      className={className}
      error={error}
      success={success}
      disabled={disabled}
    >
      <NumberFormat
        getInputRef={inputElement}
        prefix={currencySymbol}
        thousandSeparator
        onValueChange={({ floatValue }) => {
          handleChange(floatValue)
        }}
        className={['input', `input--${version}`].join(' ')}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        required={required}
        autoComplete={! autoComplete ? 'off' : ''}
      />
    </InputBase>
  )
}

InputCurrency.propTypes = {
  handleChange: PropTypes.func,
  currency: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  tooltipMessage: PropTypes.string,
  type: PropTypes.oneOf(['text', 'tel', 'password']),
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  version: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  autoComplete: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
}

InputCurrency.defaultProps = {
  handleChange: null,
  currency: null,
  placeholder: '',
  readOnly: false,
  type: 'text',
  label: '',
  tooltipMessage: '',
  value: null,
  version: 'box',
  required: false,
  className: '',
  error: false,
  success: false,
  autoComplete: true,
  autoFocus: false,
  disabled: false,
}

export default InputCurrency
