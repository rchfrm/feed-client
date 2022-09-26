import React from 'react'
import PropTypes from 'prop-types'

import DatePicker from '@/app/DatePicker'

const InputDatePicker = ({
  label,
  value,
  startDate,
  endDate,
  minDate,
  onChange,
  className,
  isRange,
}) => {
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
          onChange={onChange}
          isRange={isRange}
        />
      </div>
    </div>
  )
}

InputDatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  isRange: PropTypes.bool,
}

InputDatePicker.defaultProps = {
  label: '',
  value: null,
  startDate: null,
  endDate: null,
  className: null,
  isRange: false,
}

export default InputDatePicker