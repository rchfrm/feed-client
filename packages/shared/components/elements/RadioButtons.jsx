import React from 'react'
import PropTypes from 'prop-types'

import RadioButton from '@/elements/RadioButton'

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
