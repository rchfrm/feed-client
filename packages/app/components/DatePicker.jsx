import React from 'react'
import PropTypes from 'prop-types'

import * as ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const Component = ReactDatePicker.default

const DatePicker = React.forwardRef(({
  value,
  startDate,
  endDate,
  minDate,
  selectsStart,
  selectsEnd,
  onChange,
  isRange,
  placeholderText,
}, ref) => {
  return (
    <Component
      selected={value}
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      onChange={onChange}
      selectsRange={isRange}
      dateFormat="dd/MM/yyyy"
      formatWeekDay={nameOfDay => nameOfDay.substring(0, 1)}
      selectsStart={selectsStart}
      selectsEnd={selectsEnd}
      placeholderText={placeholderText}
      ref={ref}
    />
  )
})

DatePicker.displayName = 'DatePicker'

DatePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  selectsStart: PropTypes.bool,
  selectsEnd: PropTypes.bool,
  isRange: PropTypes.bool,
}

DatePicker.defaultProps = {
  value: null,
  startDate: null,
  endDate: null,
  selectsStart: false,
  selectsEnd: false,
  isRange: false,
}

export default DatePicker
