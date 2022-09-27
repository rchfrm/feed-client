import React from 'react'
import PropTypes from 'prop-types'

import * as ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

const Component = ReactDatePicker.default

const DatePicker = ({
  value,
  startDate,
  endDate,
  minDate,
  onChange,
  isRange,
}) => {
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
    />
  )
}

DatePicker.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  isRange: PropTypes.bool,
}

DatePicker.defaultProps = {
  value: null,
  startDate: null,
  endDate: null,
  isRange: false,
}

export default DatePicker
