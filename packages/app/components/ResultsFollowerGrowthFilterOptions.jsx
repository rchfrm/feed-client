import React from 'react'
import PropTypes from 'prop-types'

const ResultsFollowerGrowthFilterOptions = ({
  value,
  setValue,
  options,
  className,
  isDisabled,
}) => {
  const onClick = (value) => {
    setValue(value)
  }

  return (
    <div className={[
      'inline-flex overflow-hidden',
      'rounded-dialogue text-sm text-grey-dark bg-offwhite',
      isDisabled ? 'pointer-events-none grayscale opacity-50' : null,
      className,
    ].join(' ')}
    >
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onClick(option.value)}
          className={[
            'flex-auto py-1 px-3 font-bold',
            value === option.value ? 'text-black bg-green' : null,
          ].join(' ')}
        >
          {option.title}
        </button>
      ))}
    </div>
  )
}

ResultsFollowerGrowthFilterOptions.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

ResultsFollowerGrowthFilterOptions.defaultProps = {
  isDisabled: false,
  className: null,
}

export default ResultsFollowerGrowthFilterOptions
