import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButton from '@/landing/elements/CheckboxButton'

const CheckboxInput = (props) => {
  const {
    label,
    required,
    error,
    errorMessage,
    buttonLabel,
    disabled,
    className,
  } = props
  return (
    <div
      className={[className].join(' ')}
    >
      <div>
        {/* LABEL */}
        {label && (
          <span
            className={[
              'inputLabel__text',
              disabled ? 'text-grey' : null,
            ].join(' ')}
          >
            <span>
              {label}
              {required && <span className="asterisk">*</span>}
            </span>
            {error && errorMessage && (
              <span className="inputLabel__errorMessage">{errorMessage}</span>
            )}
          </span>
        )}
      </div>
      <CheckboxButton
        {...props}
        label={buttonLabel}
      />
    </div>
  )
}

CheckboxInput.propTypes = {
  label: PropTypes.string,
  required: PropTypes.bool,
  buttonLabel: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
}

CheckboxInput.defaultProps = {
  label: '',
  required: false,
  error: false,
  errorMessage: '',
  className: '',
}


export default CheckboxInput
