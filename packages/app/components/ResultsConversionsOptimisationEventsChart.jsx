import React from 'react'
import PropTypes from 'prop-types'

const ResultsConversionsOptimisationEventsChart = ({ data }) => {
  const currPeriod = data.find((o) => o.type === 'curr').value


  return (
    <div
      className="grid gap-1 justify-around w-full"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(13px, ${currPeriod <= 6 ? '48px' : '1fr'}))` }}
    >
      {Array.from(Array(currPeriod), (_, index) => (
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
  data: PropTypes.object.isRequired,
}

export default ResultsConversionsOptimisationEventsChart
