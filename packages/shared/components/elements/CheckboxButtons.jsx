import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButton from '@/elements/CheckboxButton'

import pull from 'lodash/pull'

const CheckboxButtons = ({
  buttonOptions,
  selectedValues,
  setSelectedValues,
  trackGroupLabel,
  className,
  checkboxClassname,
}) => {
  const classNames = ['checkbox--buttons', className].join(' ')
  const onChange = React.useCallback((val, checked) => {
    const newValues = !checked ? [...selectedValues, val] : pull([...selectedValues], val)
    setSelectedValues(newValues)
  }, [selectedValues, setSelectedValues])
  return (
    <div
      className={classNames}
      htmlrole="checkboxgroup"
    >
      {buttonOptions.map(({ value, name, label, highlight }) => {
        // The button is checked it matches the selected value,
        // or failing that, if it's the first value
        const checked = selectedValues.includes(value)
        return (
          <CheckboxButton
            key={value}
            value={value}
            name={name}
            label={label}
            trackGroupLabel={trackGroupLabel}
            checked={checked}
            onChange={onChange}
            className={checkboxClassname}
            highlight={highlight}
          />
        )
      })}
    </div>
  )
}

// GROUP PROPS
CheckboxButtons.propTypes = {
  buttonOptions: PropTypes.array.isRequired,
  selectedValues: PropTypes.array,
  setSelectedValues: PropTypes.func.isRequired,
  trackGroupLabel: PropTypes.string,
  className: PropTypes.string,
  checkboxClassname: PropTypes.string,
}

CheckboxButtons.defaultProps = {
  trackGroupLabel: '',
  className: null,
  checkboxClassname: null,
  selectedValues: [],
}


export default CheckboxButtons
