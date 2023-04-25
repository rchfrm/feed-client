import React from 'react'
import PropTypes from 'prop-types'

const ResultsFollowerGrowthFilterOptions = ({
  value,
  setValue,
  options,
  className,
}) => {
  const onClick = (value) => {
    setValue(value)
  }

  return (
    <div className={[
      'inline-flex overflow-hidden',
      'rounded-dialogue text-sm text-grey-dark bg-offwhite',
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
  className: PropTypes.string,
}

ResultsFollowerGrowthFilterOptions.defaultProps = {
  className: null,
}

export default ResultsFollowerGrowthFilterOptions
