
// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'


function InputNew(props) {
// Redefine props as variables
  const {
    handleChange,
    name,
    placeholder,
    value,
    version,
    width,
    readOnly,
  } = props
  // END Redefine props as variables

  return (
    <input
      className={version}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      style={{
        width: `${width}%`,
      }}
      value={value}
      readOnly={readOnly}
    />
  )
}

InputNew.propTypes = {
  // There must be a function set as handleChange
  handleChange: PropTypes.func,

  // There must be a string set as the name
  name: PropTypes.string.isRequired,

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
}

InputNew.defaultProps = {
  handleChange: () => {},
  placeholder: '',
  readOnly: false,
  value: '',
  width: 100,
}

export default InputNew
