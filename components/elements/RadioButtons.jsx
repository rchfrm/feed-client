import React from 'react'
import PropTypes from 'prop-types'

const RadioButton = ({ value, name, label, checked, onChange }) => {
  const valueString = value.toString()
  const id = `radio-${valueString}`

  const handleChange = () => {
    onChange(value)
  }

  return (
    <div className="radio--button">
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

const RadioButtons = ({ buttonOptions, selectedValue, onChange, className }) => {
  const classNames = ['radio--buttons', className].join(' ')
  return (
    <div
      className={classNames}
      htmlrole="radiogroup"
    >
      {buttonOptions.map(({ value, name, label }, index) => {
        // The button is checked it matches the selected value,
        // or failing that, if it's the first value
        const checked = selectedValue !== null ? selectedValue === value : index === 0
        return (
          <RadioButton
            key={value}
            value={value}
            name={name}
            label={label}
            checked={checked}
            onChange={onChange}
          />
        )
      })}
    </div>
  )
}

// BUTTON PROPS
RadioButton.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

RadioButton.defaultProps = {
  name: '',
}

// GROUP PROPS
RadioButtons.propTypes = {
  buttonOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
}

RadioButtons.defaultProps = {
  className: '',
  selectedValue: null,
}


export default RadioButtons
