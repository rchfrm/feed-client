// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'
import { useAsync } from 'react-async'
import moment from 'moment'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { ArtistContext } from './contexts/Artist'
import { InterfaceContext } from './contexts/InterfaceContext'
// IMPORT ELEMENTS
import Error from './elements/Error'
// IMPORT PAGES
import ChartContainer from './ChartContainer'
import ChartBar from './ChartBar'
// IMPORT ASSETS
// IMPORT HELPERS
import { formatServerData, formatProjection } from './helpers/chartHelpers'
import server from './helpers/server'

import styles from './InsightsPage.module.css'


// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const fetchData = async ({ currentDataSource, currentPlatform, artistId, dates }) => {
  console.log('&&&&&&&&&& fetchData')
  // Get data source data
  const dataPromise = server.getDataSourceValue([currentDataSource], artistId)
  // Get future projections
  const projectionPromise = server.getDataSourceProjection(currentDataSource, artistId)
  const [data, projections] = await Promise.all([dataPromise, projectionPromise])
  // Stop here if no data
  if (!data || !Object.keys(data).length) return 'no-data'
  // Get the actual data for the requested source
  const { daily_data: dailyData } = data[currentDataSource]
  if (!dailyData || !Object.keys(dailyData).length) return 'no-data'
  const projection = formatProjection(projections)
  const formattedData = formatServerData({
    dailyData,
    dates,
    currentDataSource,
    currentPlatform,
    projection,
  })
  return formattedData
}

function InsightsChartLoader({
  currentPlatform,
  currentDataSource,
  initialLoading,
  setInitialLoading,
}) {
  // IMPORT CONTEXTS
  const { artistId } = React.useContext(ArtistContext)
  const { toggleGlobalLoading } = React.useContext(InterfaceContext)

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

  // Set initial page loading and global loading after first data is retrieved
  React.useEffect(() => {
    if (!chartLoading) {
      setInitialLoading(chartLoading)
      toggleGlobalLoading(false)
    }
  }, [chartLoading])

  if (initialLoading) return null

  if (!data) return null

  if (data === 'no-data') {
    return (
      <div
        className={[
          'breakout--width',
          'col-span-12',
          'lg:grid gap-4 grid-cols-12',
          styles.chartOuter,
        ].join(' ')}
      >
        <Error error={error} />
        <ChartBar
          className={['col-span-12'].join(' ')}
          currentPlatform={currentPlatform}
          currentDataSource={currentDataSource}
          error
        />
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
  initialLoading: PropTypes.bool.isRequired,
  setInitialLoading: PropTypes.func.isRequired,
}

export default InsightsChartLoader
