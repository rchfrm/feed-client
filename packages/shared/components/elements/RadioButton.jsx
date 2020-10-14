import React from 'react'
import PropTypes from 'prop-types'

const RadioButton = ({
  value,
  name,
  label,
  checked,
  highlight,
  onChange,
  className,
}) => {
  const valueString = value.toString()
  const id = `radio-${valueString}`

  const handleChange = () => {
    onChange(value)
  }

  return (
    <div className={[
      'radio--button',
      highlight ? '-highlighted' : null,
      className,
    ].join(' ')}
    >
      <input
        id={id}
        value={valueString}
        type="radio"
        className="radio--button_input"
        name={name || valueString}
        aria-checked={checked}
        checked={checked}
        onChange={handleChange}
      />
      <label
        className="radio--button_label"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

RadioButton.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  highlight: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
}

RadioButton.defaultProps = {
  checked: false,
  highlight: false,
  name: '',
  className: null,
}

export default RadioButton
