import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButton from '@/elements/CheckboxButton'
import TooltipButton from '@/elements/TooltipButton'

const CheckboxInput = (props) => {
  const {
    label,
    required,
    tooltipMessage,
    error,
    errorMessage,
    buttonLabel,
    disabled,
    className,
  } = props
  return (
    <div
      className={[
        className,
        disabled ? 'pointer-events-none' : null,
      ].join(' ')}
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
            {/* LABEL TOOLTIP */}
            {tooltipMessage && (
              <TooltipButton copy={tooltipMessage} direction="right" trackLabel={`Checkbox input: ${label}`} />
            )}
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
  tooltipMessage: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  className: PropTypes.string,
}

CheckboxInput.defaultProps = {
  label: '',
  required: false,
  tooltipMessage: '',
  error: false,
  errorMessage: '',
  className: '',
}


export default CheckboxInput
