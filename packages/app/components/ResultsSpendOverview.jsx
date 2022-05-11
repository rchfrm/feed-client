import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency } from '@/helpers/utils'

import ResultsSpendBlock from '@/app/ResultsSpendBlock'

const ResultsSpendOverview = ({ spend }) => {
  const { daily_data: dailyData, value, currency } = spend
  const valueString = formatCurrency(value, currency)

  return (
    <div>
      <p className="text-xl font-bold sm:mb-10">Spend</p>
      <p>Total spent - {valueString}</p>
      <div className="hidden sm:flex flex-wrap lg:justify-around w-full">
        {Object.entries(dailyData).sort().map(([key, value]) => {
          return (
            <ResultsSpendBlock
              key={key}
              value={value}
              currency={currency}
              date={key}
            />
          )
        })}
      </div>
    </div>
  )
}

ResultsSpendOverview.propTypes = {
  spend: PropTypes.object.isRequired,
}

export default ResultsSpendOverview
