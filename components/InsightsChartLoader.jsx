// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'
import Error from './elements/Error'
// IMPORT PAGES
import ChartContainer from './ChartContainer'
// IMPORT ASSETS
// IMPORT HELPERS
import { formatServerData } from './helpers/chartHelpers'
import server from './helpers/server'


// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const fetchData = async ({ currentDataSource, currentPlatform, artistId, dates }) => {
  const data = await server.getDataSourceValue([currentDataSource], artistId)
  // Stop here if no data
  if (!data || !Object.keys(data).length) return 'no-data'
  // Get the actual data for the requested source
  const { daily_data: dailyData } = data[currentDataSource]
  const formattedData = formatServerData({ dailyData, dates, currentDataSource, currentPlatform })
  return formattedData
}

function InsightsChartLoader({
  currentPlatform,
  currentDataSource,
}) {
  // IMPORT CONTEXTS
  const { artistId } = React.useContext(ArtistContext)

  // List of relevant dates
  const dates = React.useMemo(() => {
    return {
      today: moment().format('YYYY-MM-DD'),
      yesterday: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      twoDaysBefore: moment().subtract(2, 'days').format('YYYY-MM-DD'),
      sevenDaysBefore: moment().subtract(7, 'days').format('YYYY-MM-DD'),
      oneMonthBefore: moment().subtract(1, 'month').format('YYYY-MM-DD'),
      sixMonthsBefore: moment().subtract(6, 'month').format('YYYY-MM-DD'),
      startOfYear: moment().startOf('year').format('YYYY-MM-DD'),
    }
  }, [])

  // RETRIEVE DATA FROM SERVER
  const { data, isPending: chartLoading, error } = useAsync({
    promiseFn: fetchData,
    watchFn: (newProps, oldProps) => {
      const { artistId, currentPlatform, currentDataSource } = newProps
      const { artistId: oldArtistId, currentPlatform: previousPlatform, currentDataSource: previousDataSource } = oldProps
      if (currentPlatform !== previousPlatform) return true
      if (currentDataSource !== previousDataSource) return true
      if (artistId !== oldArtistId) return true
      return false
    },
    // The variable(s) to pass to promiseFn
    currentDataSource,
    currentPlatform,
    artistId,
    dates,
  })

  if (!data) return null

  if (data === 'no-data') {
    return (
      <div className="ninety-wide">
        <Error error={error} />
        <p>Insufficent Data</p>
      </div>
    )
  }

  return (
    <>
      <Error error={error} />
      <ChartContainer
        currentPlatform={currentPlatform}
        currentDataSource={currentDataSource}
        data={data}
        loading={chartLoading}
      />
    </>
  )
}

InsightsChartLoader.propTypes = {
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
}

export default InsightsChartLoader
