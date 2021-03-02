import React from 'react'
import PropTypes from 'prop-types'

import { track } from '@/app/helpers/trackingHelpers'

const CheckboxButton = ({
  value,
  id,
  name,
  label,
  checked,
  highlight,
  disabled,
  onChange,
  trackGroupLabel,
  trackValue,
  trackLocation,
  className,
}) => {
  const valueString = value.toString()
  const idName = id || `checkbox-${valueString}`

  const handleChange = () => {
    track('checkbox_button_clicked', {
      label: trackGroupLabel || label,
      value: trackValue || valueString,
      location: trackLocation,
    })
    onChange(value, checked)
  }

  return (
    <div className={[
      'checkbox--button',
      highlight ? '-highlighted' : null,
      disabled ? '-disabled' : null,
      className,
    ].join(' ')}
    >
      <input
        id={idName}
        value={valueString}
        type="checkbox"
        className={[
          'checkbox--button_input',
          checked ? '-checked' : null,
        ].join(' ')}
        name={name || valueString}
        aria-checked={checked}
        defaultChecked={checked}
        onChange={handleChange}
      />
      <label
        className={[
          'checkbox--button_label',
          disabled ? 'text-grey-2' : null,
        ].join(' ')}
        htmlFor={idName}
      >
        {label}
      </label>
    </div>
  )
}

CheckboxButton.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  checked: PropTypes.bool,
  highlight: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  trackGroupLabel: PropTypes.string,
  trackValue: PropTypes.string,
  trackLocation: PropTypes.string,
  className: PropTypes.string,
}

CheckboxButton.defaultProps = {
  id: '',
  name: '',
  checked: false,
  highlight: false,
  disabled: false,
  trackGroupLabel: '',
  trackValue: '',
  trackLocation: '',
  className: null,
}

export default CheckboxButton
