
// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import ArrowIcon from '@/icons/ArrowIcon'

const OPTION = ({ name, value }) => {
  return <option key={value} value={value}>{name}</option>
}

const Select = ({
  handleChange,
  name,
  label,
  options,
  placeholder,
  selectedValue,
  style,
  version,
  required,
  highlight, // show red if empty
  autoComplete,
  className,
}) => {
  // Define class array
  const classes = ['input--container', 'select--container', className]

  // Add error class
  if (highlight && !selectedValue) {
    classes.push('_error')
  }

  const versionClasses = version
    .split(' ')
    .map((versionName) => `select--${versionName}`)
    .join(' ')

  return (
    <div className={classes.join(' ')}>
      <label
        className="inputLabel"
        htmlFor={name}
      >
        {label && (
          <span className="inputLabel__text">
            {label}
            {required && <span className="asterisk">*</span>}
          </span>
        )}
        <div className="select--inner">
          <select
            className={['select', versionClasses].join(' ')}
            name={name}
            onChange={handleChange}
            style={style}
            value={selectedValue}
            required={required}
            autoComplete={!autoComplete ? 'off' : ''}
          >
            {/* PLACEHOLDER */}
            {placeholder && (
              <option key="placeholder" value="" hidden>{placeholder}</option>
            )}
            {/* OPTIONS */}
            {options.map((optionItem) => {
              const { value, name, type, options } = optionItem
              const isOptionGroup = type === 'group'
              // Option group
              if (isOptionGroup) {
                return (
                  <optgroup label={name} key={value}>
                    {options.map(({ name, value }) => {
                      return <OPTION key={value} name={name} value={value} />
                    })}
                  </optgroup>
                )
              }
              return <OPTION key={value} name={name} value={value} />
            })}
          </select>
          {/* Arrow Icon */}
          <ArrowIcon className="select--arrow" />
        </div>
      </label>
    </div>
  )
}

Select.propTypes = {
  // There must be a function set as handleChange
  handleChange: PropTypes.func.isRequired,

  label: PropTypes.string,

  // There must be a string set as the name
  name: PropTypes.string.isRequired,

  // There must be an array passed to the options prop,
  options: PropTypes.arrayOf(
    // ...it must be an array of objects, each containing value and name keys,
    PropTypes.shape({
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

  // Optional placeholder when no default selected value
  placeholder: PropTypes.string,

  // There must be a string or number set as the selectedValue
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),

  // If there is a style prop, it should be an object
  style: PropTypes.object,

  // If there is version prop, it should be a string
  version: PropTypes.string,

  required: PropTypes.bool,
  highlight: PropTypes.bool,
  autoComplete: PropTypes.bool,
  className: PropTypes.string,
}

Select.defaultProps = {
  label: '',
  style: {},
  version: 'box',
  required: false,
  highlight: false,
  autoComplete: true,
  className: '',
  placeholder: '',
  selectedValue: '',
}

export default Select
