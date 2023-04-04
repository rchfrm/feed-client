import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ResultsFollowerGrowthFilters from '@/app/ResultsFollowerGrowthFilters'
import ResultsFollowerGrowthHeader from '@/app/ResultsFollowerGrowthHeader'
import ResultsFollowGrowthChartLoader from '@/app/ResultsFollowerGrowthChartLoader'

const ResultsFollowerGrowth = ({ platform }) => {
  const [dataSources, setDataSources] = React.useState(null)
  const [period, setPeriod] = React.useState('all')
  const { artistCurrency: currency } = React.useContext(ArtistContext)

  return (
    <div className="mb-10">
      <ResultsFollowerGrowthFilters
        period={period}
        setPeriod={setPeriod}
      />
      {dataSources && (
      <ResultsFollowerGrowthHeader
        dataSources={dataSources}
        period={period}
        currency={currency}
      />
      )}
      <ResultsFollowGrowthChartLoader
        platform={platform}
        period={period}
        dataSources={dataSources}
        setDataSources={setDataSources}
        currency={currency}
      />
    </div>
  )
}

ResultsFollowerGrowth.propTypes = {
  platform: PropTypes.string.isRequired,
}

export default ResultsFollowerGrowth
