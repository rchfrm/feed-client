import React from 'react'
import PropTypes from 'prop-types'

import ResultsNoSpendStats from '@/app/ResultsNoSpendStats'
import ResultsNoSpendCharts from '@/app/ResultsNoSpendCharts'

const ResultsNoSpendContent = ({ data }) => {
  const [hasGrowth, setHasGrowth] = React.useState(true)

  return (
    <div className="grid grid-cols-12 sm:col-gap-12 mb-8">
      <div className="col-span-12">
        <div className={[
          'grid grid-cols-12 sm:col-gap-12',
          'row-gap-8 sm:row-gap-16',
          'sm:mb-0',
        ].join(' ')}
        >
          <ResultsNoSpendStats data={data} setHasGrowth={setHasGrowth} />
          <ResultsNoSpendCharts hasGrowth={hasGrowth} />
        </div>
      </div>
    </div>
  )
}

ResultsNoSpendContent.propTypes = {
  data: PropTypes.object.isRequired,
}

ResultsNoSpendContent.defaultProps = {
}

export default ResultsNoSpendContent
