import React from 'react'
import PropTypes from 'prop-types'

import remove from 'lodash/remove'

const CHECKBOX_BUTTON = ({ value, name, label, checked, onChange }) => {
  const valueString = value.toString()
  const id = `checkbox-${valueString}`

  const handleChange = () => {
    onChange(value, checked)
  }

  return (
    <div className="checkbox--button">
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

const CheckoxButtons = ({ buttonOptions, selectedValues, setSelectedValues, className }) => {
  const classNames = ['checkbox--buttons', className].join(' ')
  const onChange = React.useCallback((val, checked) => {
    const newValues = !checked ? [...selectedValues, val] : remove(selectedValues, (e) => e !== val)
    setSelectedValues(newValues)
  }, [selectedValues, setSelectedValues])
  return (
    <div
      className={classNames}
      htmlrole="checkboxgroup"
    >
      {buttonOptions.map(({ value, name, label }) => {
        // The button is checked it matches the selected value,
        // or failing that, if it's the first value
        const checked = selectedValues.includes(value)
        return (
          <CHECKBOX_BUTTON
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
CHECKBOX_BUTTON.propTypes = {
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
  onChange: PropTypes.func.isRequired,
}

CHECKBOX_BUTTON.defaultProps = {
  name: '',
}

// GROUP PROPS
CheckoxButtons.propTypes = {
  buttonOptions: PropTypes.array.isRequired,
  setSelectedValues: PropTypes.func.isRequired,
  className: PropTypes.string,
  selectedValues: PropTypes.array,
}

CheckoxButtons.defaultProps = {
  className: '',
  selectedValues: [],
}


export default CheckoxButtons
