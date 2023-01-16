import React from 'react'
import PropTypes from 'prop-types'

import track from '@/landing/helpers/trackingHelpers'

const CheckboxButton = ({
  value,
  id,
  name,
  label,
  trackGroupLabel,
  trackValue,
  checked,
  highlight,
  disabled,
  onChange,
  className,
}) => {
  const valueString = value.toString()
  const idName = id || `checkbox-${valueString}`

  const handleChange = () => {
    track({
      action: 'checkbox_button_clicked',
      label: trackGroupLabel || label,
      category: 'generic',
      value: trackValue || valueString,
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
          disabled ? 'text-grey' : null,
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
  trackGroupLabel: PropTypes.string,
  trackValue: PropTypes.string,
  checked: PropTypes.bool,
  highlight: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

CheckboxButton.defaultProps = {
  id: '',
  name: '',
  className: null,
  trackGroupLabel: '',
  trackValue: '',
  checked: false,
  highlight: false,
  disabled: false,
}

export default CheckboxButton
