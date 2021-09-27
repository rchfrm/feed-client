import React from 'react'
// import PropTypes from 'prop-types'

const ResultsConversionsOptimisationEventsChart = () => {
  const data = {
    value: 5,
  }
  const { value } = data

  return (
    <div
      className="grid gap-1 justify-around"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(13px, ${value <= 6 ? '48px' : '1fr'}))` }}
    >
      {Array.from(Array(value), (_, index) => (
        <div
          key={index}
          className="relative"
          style={{ paddingBottom: '100%' }}
        >
          <div
            className={[
              'absolute',
              'top-0 left-0',
              'w-full h-full',
              'bg-insta',
              'rounded-full',
            ].join(' ')}
          />
        </div>
      ))}
    </div>
  )
}

ResultsConversionsOptimisationEventsChart.propTypes = {
  // data: PropTypes.object.isRequired,
}

export default ResultsConversionsOptimisationEventsChart
