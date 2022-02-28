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

const RadioButtons = ({
  options,
  selectedValue,
  onChange,
  trackGroupLabel,
  labelPosition,
  className,
}) => {
  return (
    <div
      className="radio--buttons"
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
            className={className}
            name={name}
            label={label}
            trackGroupLabel={trackGroupLabel}
            checked={checked}
            onChange={onChange}
            labelPosition={labelPosition}
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
  trackGroupLabel: PropTypes.string,
  className: PropTypes.string,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  labelPosition: PropTypes.string,
}

RadioButtons.defaultProps = {
  className: '',
  selectedValue: null,
  trackGroupLabel: '',
  labelPosition: 'right',
}


export default RadioButtons
