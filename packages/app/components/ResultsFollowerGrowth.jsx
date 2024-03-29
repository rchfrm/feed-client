import React from 'react'
import PropTypes from 'prop-types'
import { ArtistContext } from '@/app/contexts/ArtistContext'
import ResultsFollowerGrowthFilters from '@/app/ResultsFollowerGrowthFilters'
import ResultsFollowerGrowthHeader from '@/app/ResultsFollowerGrowthHeader'
import ResultsFollowGrowthChartLoader from '@/app/ResultsFollowerGrowthChartLoader'
import { followerGrowthDataSources } from '@/app/helpers/resultsHelpers'

const ResultsFollowerGrowth = ({ platform, hasInstagramGrowthObjective, monthlyGrowthRateFallback }) => {
  const [dataSources, setDataSources] = React.useState(null)
  const [dataSourceName, setDataSourceName] = React.useState(followerGrowthDataSources[platform])
  const [breakdownBy, setBreakdownBy] = React.useState(null)
  const [breakdownOptions, setBreakdownOptions] = React.useState([])
  const [period, setPeriod] = React.useState('all')
  const [isLoading, setIsLoading] = React.useState(false)
  const { artistCurrency: currency } = React.useContext(ArtistContext)

  return (
    <div className="mb-10">
      {dataSources && (
        <>
          <ResultsFollowerGrowthFilters
            period={period}
            setPeriod={setPeriod}
            dataSourceName={dataSourceName}
            setDataSourceName={setDataSourceName}
            breakdownOptions={breakdownOptions}
            breakdownBy={breakdownBy}
            setBreakdownBy={setBreakdownBy}
            isLoading={isLoading}
            hasInstagramGrowthObjective={hasInstagramGrowthObjective}
          />
          <ResultsFollowerGrowthHeader
            dataSources={dataSources}
            period={period}
            currency={currency}
            platform={platform}
            breakdownBy={breakdownBy}
          />
        </>
      )}
      <ResultsFollowGrowthChartLoader
        period={period}
        dataSources={dataSources}
        setDataSources={setDataSources}
        dataSourceName={dataSourceName}
        setBreakdownOptions={setBreakdownOptions}
        breakdownBy={breakdownBy}
        setBreakdownBy={setBreakdownBy}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        currency={currency}
        hasInstagramGrowthObjective={hasInstagramGrowthObjective}
        monthlyGrowthRateFallback={monthlyGrowthRateFallback}
      />
    </div>
  )
}

ResultsFollowerGrowth.propTypes = {
  platform: PropTypes.string.isRequired,
  hasInstagramGrowthObjective: PropTypes.bool.isRequired,
  monthlyGrowthRateFallback: PropTypes.number,
}

ResultsFollowerGrowth.defaultProps = {
  monthlyGrowthRateFallback: null,
}

export default ResultsFollowerGrowth
