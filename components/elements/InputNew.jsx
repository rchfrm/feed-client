// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import FacebookIcon from '../icons/FacebookIcon'
import InstagramIcon from '../icons/InstagramIcon'
import brandColors from '../../constants/brandColors'


const getIconEl = (icon) => {
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
  icon,
}) => {
  // Get icon (if needed)
  const iconEl = icon ? getIconEl(icon) : null
  const containerClasses = ['input--container', className]
  if (iconEl) {
    containerClasses.push('_hasIcon')
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
            {label}
            {required && <span className="asterix">*</span>}
          </span>
        )}
        {/* INPUT */}
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
        {/* ICON */}
        {iconEl}
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
  version: PropTypes.string,

  // If there is a width prop, it should be a number
  width: PropTypes.number,
  required: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.string,
}

InputNew.defaultProps = {
  handleChange: () => {},
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
}

export default InputNew
