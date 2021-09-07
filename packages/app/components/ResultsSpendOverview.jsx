import React from 'react'

import { formatCurrency } from '@/helpers/utils'

import ResultsSpendBlock from '@/app/ResultsSpendBlock'

const ResultsSpendOverview = ({ spending }) => {
  const { daily_data: dailyData, value, currency } = spending
  const valueString = formatCurrency(value, currency)

  return (
    <div>
      <p className="text-xl font-bold sm:mb-10">Spend</p>
      <p>Total spent - {valueString}</p>
      <div className="hidden sm:flex">
        {Object.entries(dailyData).map(([key, value]) => (
          <ResultsSpendBlock
            key={key}
            value={value}
            currency={currency}
          />
        ))}
      </div>
    </div>
  )
}

ResultsSpendOverview.propTypes = {

}

export default ResultsSpendOverview
