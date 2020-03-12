
// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'


const InputNew = ({
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
}) => {
  return (
    <div className={['input--container', className].join(' ')}>
      <label
        className="inputLabel"
        htmlFor={name}
      >
        {label && (
          <span className="inputLabel__text">
            {label}
            {required && <span className="asterix">*</span>}
          </span>
        )}
        <input
          className={['input', `input_${version}`].join(' ')}
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
        />
      </label>
    </div>
  )
}

InputNew.propTypes = {
  // There must be a function set as handleChange
  handleChange: PropTypes.func,

  // There must be a string set as the name
  name: PropTypes.string.isRequired,

  label: PropTypes.string,

  type: PropTypes.string,

  // Any placeholder should be a string
  placeholder: PropTypes.string,

  // readOnly should be boolean
  readOnly: PropTypes.bool,

  // There must be a value prop, that is either a string or number
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  // If there is a version prop, it should be a string
  version: PropTypes.string.isRequired,

  // If there is a width prop, it should be a number
  width: PropTypes.number,

  required: PropTypes.bool,

  className: PropTypes.string,
}

InputNew.defaultProps = {
  handleChange: () => {},
  placeholder: '',
  readOnly: false,
  type: 'text',
  label: '',
  value: '',
  width: 100,
  required: false,
  className: '',
}

export default InputNew
