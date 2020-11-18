import React from 'react'
import PropTypes from 'prop-types'

const CheckboxButton = ({
  value,
  name,
  label,
  checked,
  highlight,
  onChange,
  className,
}) => {
  const valueString = value.toString()
  const id = `checkbox-${valueString}`

  const handleChange = () => {
    onChange(value, checked)
  }

  return (
    <div className={[
      'checkbox--button',
      highlight ? '-highlighted' : null,
      className,
    ].join(' ')}
    >
      <input
        id={id}
        value={valueString}
        type="checkbox"
        className="checkbox--button_input"
        name={name || valueString}
        aria-checked={checked}
        checked={checked}
        onChange={handleChange}
      />
      <label
        className="checkbox--button_label"
        htmlFor={id}
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
  name: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  checked: PropTypes.bool,
  highlight: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

CheckboxButton.defaultProps = {
  name: '',
  className: null,
  checked: false,
  highlight: false,
}

export default CheckboxButton
