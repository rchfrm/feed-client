import React from 'react'
import PropTypes from 'prop-types'

import RadioButton from '@/elements/RadioButton'

/* EXAMPLE options
  [
    {
      value: 'yes-please',
      name: 'yes-please', (optional)
      label: 'Yes please',
    },
    {
      value: 'no-thanks',
      name: 'no-thanks', (optional)
      label: 'No thanks',
    },
  ]
*/

const RadioButtons = ({ options, selectedValue, onChange, className }) => {
  const classNames = ['radio--buttons', className].join(' ')
  return (
    <div
      className={classNames}
      htmlrole="radiogroup"
    >
      {options.map(({ value, name, label }, index) => {
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
  options: PropTypes.array.isRequired,
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
