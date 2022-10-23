import React from 'react'
import PropTypes from 'prop-types'

import * as ReactDatePicker from 'react-datepicker'

import { convertUTCToLocalDate, convertLocalToUTCDate } from '@/helpers/utils'

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
      selected={convertUTCToLocalDate(value)}
      startDate={convertUTCToLocalDate(startDate)}
      endDate={convertUTCToLocalDate(endDate)}
      minDate={convertUTCToLocalDate(minDate)}
      onChange={(date) => onChange(convertLocalToUTCDate(date))}
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
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  minDate: PropTypes.object,
  selectsStart: PropTypes.bool,
  selectsEnd: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  isRange: PropTypes.bool,
  placeholderText: PropTypes.string,
}

DatePicker.defaultProps = {
  value: null,
  startDate: null,
  endDate: null,
  minDate: null,
  selectsStart: false,
  selectsEnd: false,
  isRange: false,
  placeholderText: '',
}

export default DatePicker
