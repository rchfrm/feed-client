
// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

const SelectNew = ({
  handleChange,
  name,
  label,
  options,
  placeholder,
  selectedValue,
  style,
  version = '',
  required,
  className,
}) => {
  // Transform options into array of <option> elements
  const optionElements = options.map(option => {
    return <option key={option.value} value={option.value}>{option.name}</option>
  })
  // END Transform options into array of <option> elements

  return (
    <div className="input_container">
      <label
        className={['inputLabel', className].join(' ')}
        htmlFor={name}
      >
        <span className="inputLabel__text">
          {label}
          {required && <span className="asterix">*</span>}
        </span>
        <select
          className={['selectElement', `selectElement_${version}`].join(' ')}
          name={name}
          onChange={handleChange}
          style={style}
          value={selectedValue}
          required={required}
        >
          {[
            <option key="placeholder" value="" hidden>{placeholder}</option>,
            ...optionElements,
          ]}
        </select>
      </label>
    </div>
  )
}

SelectNew.propTypes = {
  // There must be a function set as handleChange
  handleChange: PropTypes.func.isRequired,

  label: PropTypes.string,

  // There must be a string set as the name
  name: PropTypes.string.isRequired,

  // There must be an array passed to the options prop,
  options: PropTypes.arrayOf(
    // ...it must be an array of objects, each containing value and name keys,
    PropTypes.exact({
      // ...the value of the value key must be a string or number,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      // ... and the value of the name key must be a string or number.
      name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    }),
  ).isRequired,

  // There must be a string set as the placeholder
  placeholder: PropTypes.string.isRequired,

  // There must be a string or number set as the selectedValue
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,

  // If there is a style prop, it should be an object
  style: PropTypes.object,

  // If there is version prop, it should be a string
  version: PropTypes.string,

  required: PropTypes.bool,

  className: PropTypes.string,
}

SelectNew.defaultProps = {
  label: '',
  style: {},
  version: '',
  required: false,
  className: '',
}

export default SelectNew
