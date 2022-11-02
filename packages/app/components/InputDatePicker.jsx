import React from 'react'
import PropTypes from 'prop-types'

import DatePicker from '@/app/DatePicker'

const InputDatePicker = React.forwardRef(({
  label,
  value,
  startDate,
  endDate,
  minDate,
  maxDate,
  selectsStart,
  selectsEnd,
  onChange,
  className,
  isRange,
  placeholderText,
}, ref) => {
  return (
    <div
      className={[
        'flex flex-column',
        className,
      ].join(' ')}
    >
      {label && <p className="mb-2 text-sm font-semibold tracking-wider">{label}</p>}
      <div className="flex items-center h-14 p-3 border-black border-solid border-2">
        <DatePicker
          value={value}
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          maxDate={maxDate}
          onChange={onChange}
          isRange={isRange}
          selectsStart={selectsStart}
          selectsEnd={selectsEnd}
          placeholderText={placeholderText}
          ref={ref}
        />
      </div>
    </div>
  )
})

InputDatePicker.displayName = 'InputDatePicker'

InputDatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  selectsStart: PropTypes.bool,
  selectsEnd: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  isRange: PropTypes.bool,
  placeholderText: PropTypes.string,
}

InputDatePicker.defaultProps = {
  label: '',
  value: null,
  startDate: null,
  endDate: null,
  minDate: null,
  maxDate: null,
  selectsStart: false,
  selectsEnd: false,
  className: null,
  isRange: false,
  placeholderText: '',
}

export default InputDatePicker
