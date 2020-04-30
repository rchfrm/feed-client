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
// IMPORT CONSTANTS
import insightDataSources from '../constants/insightDataSources'
// IMPORT HELPERS
import server from './helpers/server'
// IMPORT STYLES
import './InsightsPage.module.css'

const formatData = ({ dailyData, dates, currentDataSource, currentPlatform }) => {
  // Convert dates object to array
  const dataArray = Object.entries(dailyData)
    // Sort by dates, chronologically
    .sort(([dateA], [dateB]) => {
      return moment(dateA) - moment(dateB)
    })
  // Get details about data source
  const {
    title,
    subtitle,
    period,
    dataType,
  } = insightDataSources[currentDataSource]
  // Get most recent and earliest data
  const mostRecentData = dataArray[dataArray.length - 1]
  const earliestData = dataArray[0]
  // Output formatted data
  return {
    dailyData,
    title: `${title} (${subtitle || period})`,
    source: currentDataSource,
    platform: currentPlatform,
    dataType,
    mostRecent: {
      date: mostRecentData[0],
      value: mostRecentData[1],
    },
    earliest: {
      date: earliestData[0],
      value: earliestData[1],
    },
    today: dailyData[dates.today],
    yesterday: dailyData[dates.yesterday],
    twoDaysBefore: dailyData[dates.twoDaysBefore],
    sevenDaysBefore: dailyData[dates.sevenDaysBefore],
    oneMonthBefore: dailyData[dates.oneMonthBefore],
    startOfYear: dailyData[dates.startOfYear],
  }
}


// ASYNC FUNCTION TO RETRIEVE UNPROMOTED POSTS
const fetchData = async ({ currentDataSource, currentPlatform, artistId, dates }) => {
  const data = await server.getDataSourceValue([currentDataSource], artistId)
  // Stop here if no data
  if (!data || !Object.keys(data).length) return 'no-data'
  // Get the actual data for the requested source
  const { daily_data: dailyData } = data[currentDataSource]
  const formattedData = formatData({ dailyData, dates, currentDataSource, currentPlatform })
  console.log('get data')
  return formattedData
}


function InsightsPageChart({
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

  if (chartLoading) return <Spinner />

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
        dates={dates}
        data={data}
      />
    </>
  )
}

InsightsPageChart.propTypes = {
  currentPlatform: PropTypes.string.isRequired,
  currentDataSource: PropTypes.string.isRequired,
}

export default InsightsPageChart
