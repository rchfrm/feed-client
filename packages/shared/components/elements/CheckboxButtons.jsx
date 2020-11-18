import React from 'react'
import PropTypes from 'prop-types'

import CheckboxButton from '@/elements/CheckboxButton'

import pull from 'lodash/pull'

const CheckboxButtons = ({
  buttonOptions,
  selectedValues,
  setSelectedValues,
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
  setSelectedValues: PropTypes.func.isRequired,
  className: PropTypes.string,
  checkboxClassname: PropTypes.string,
  selectedValues: PropTypes.array,
}

CheckboxButtons.defaultProps = {
  className: null,
  checkboxClassname: null,
  selectedValues: [],
}


export default CheckboxButtons
