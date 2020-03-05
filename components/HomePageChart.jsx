// IMPORT PACKAGES
import React from 'react'
import moment from 'moment'
import usePrevious from 'use-previous'
import isEmpty from 'lodash/isEmpty'
// IMPORT COMPONENTS
// IMPORT CONTEXTS
import { AuthContext } from './contexts/Auth'
import { ArtistContext } from './contexts/Artist'
// IMPORT ELEMENTS
import Loading from './elements/Loading'
// IMPORT PAGES
import ChartContainer from './ChartContainer'
// IMPORT ASSETS
// IMPORT CONSTANTS
// IMPORT HELPERS
import helper from './helpers/helper'
import server from './helpers/server'
// IMPORT STYLES
import './HomePageChart.module.css'

// Define initial state and reducer to hold data
const initialDataState = {
  queued: [],
  requested: [],
  available: {},
}
const dataReducer = (dataState, dataAction) => {
  switch (dataAction.type) {
    case 'reset':
      return initialDataState
    case 'reset-queued':
      return {
        ...dataState,
        queued: [],
      }
    case 'reset-requested':
      return {
        ...dataState,
        requested: [],
      }
    case 'add-to-queued':
      return {
        ...dataState,
        queued: [...dataState.queued, ...dataAction.payload.queued],
      }
    case 'add-to-requested':
      return {
        ...dataState,
        queued: [],
        requested: [...dataState.requested, ...dataAction.payload.requested],
      }
    case 'store-data':
      return {
        ...dataState,
        requested: [],
        available: {
          ...dataState.available,
          ...dataAction.payload.data,
        },
      }
    default:
      return {
        ...dataState,
      }
  }
}

// Define initial state and reducer to hold data sources displayed on the chart
const initialDisplayedDataSourcesState = []
const displayedDataSourcesReducer = (displayedDataSourcesState, displayedDataSourcesAction) => {
  // For add data soruces
  const toAdd = []
  const dataSourcesToAdd = displayedDataSourcesAction.payload ? displayedDataSourcesAction.payload.data_sources : null
  // For remove data sources
  const updated = [...displayedDataSourcesState]
  const dataSourcesToRemove = displayedDataSourcesAction.payload ? displayedDataSourcesAction.payload.data_sources : null
  switch (displayedDataSourcesAction.type) {
    case 'reset':
      return initialDisplayedDataSourcesState

    case 'add-data-sources':
      // Check that the data source isn't already displayed,
      // before adding it to the array
      dataSourcesToAdd.forEach(dataSource => {
        if (displayedDataSourcesState.indexOf(dataSource) === -1) {
          toAdd.push(dataSource)
        }
      })
      return [
        ...displayedDataSourcesState,
        ...toAdd,
      ]

    case 'remove-data-sources':
      dataSourcesToRemove.forEach(dataSource => {
        const index = updated.indexOf(dataSource)
        updated.splice(index, 1)
      })
      return updated
    default:
      return displayedDataSourcesState
  }
}

function HomePageChart() {
// IMPORT CONTEXTS
  const { getToken } = React.useContext(AuthContext)
  const { artist } = React.useContext(ArtistContext)
  // END IMPORT CONTEXTS

  // DEFINE STATES
  // Storage of data returned from the server
  const [data, setData] = React.useReducer(dataReducer, initialDataState)

  // List of available data sources
  const [availableDataSources, setAvailableDataSources] = React.useState({})

  // List of data sources displayed on the chart
  const [displayedDataSources, setDisplayedDataSources] = React.useReducer(displayedDataSourcesReducer, initialDisplayedDataSourcesState)

  // List of relevant dates
  const [dates] = React.useState({
    today: moment().format('YYYY-MM-DD'),
    yesterday: moment().subtract(1, 'days').format('YYYY-MM-DD'),
    twoDaysBefore: moment().subtract(2, 'days').format('YYYY-MM-DD'),
    sevenDaysBefore: moment().subtract(7, 'days').format('YYYY-MM-DD'),
    oneMonthBefore: moment().subtract(1, 'month').format('YYYY-MM-DD'),
    sixMonthsBefore: moment().subtract(6, 'month').format('YYYY-MM-DD'),
    startOfYear: moment().startOf('year').format('YYYY-MM-DD'),
  })

  // Loading state for chart component specifically
  const [chartLoading, setChartLoading] = React.useState(true)

  // Errors
  const [, setError] = React.useState(null)
  // END DEFINE STATES

  // RESET STATE IF THE SELECTED ARTIST CHANGES
  React.useEffect(() => {
    setChartLoading(true)
    setData({ type: 'reset' })
    setAvailableDataSources({})
    setDisplayedDataSources({ type: 'reset' })
    setError(null)
  }, [artist.id])
  // END RESET STATE IF THE SELECTED ARTIST CHANGES

  // SORT AVAILABLE DATA SOURCES BY PLATFORM AND TYPE
  // Function to do the sorting
  const createDataSourceObject = dataSources => {
    // Create an array of data source IDs
    const identifiers = dataSources.map(dataSource => dataSource.id)

    const object = {}

    // Separate each platform
    identifiers.forEach(id => {
      const platform = helper.extractDataSourcePlatform(id)

      // Skip the data source if the platform is Apple Music
      if (platform === 'apple') {
        return
      }

      object[platform] = {}
    })

    // Separate each data source
    identifiers.forEach(id => {
      const uniformId = helper.returnUniformDataSourceId(id)
      const platform = helper.extractDataSourcePlatform(id)
      const breakdown = helper.extractDataSourceBreakdown(id)
      const name = helper.extractDataSourceName(uniformId, platform, breakdown)

      // Skip the data source if the platform is Apple Music
      if (platform === 'apple') { return }

      object[platform][name] = {
        id: undefined,
        type: undefined,
        breakdown: {},
      }
    })

    // Add id, type, and breakdowns to each data source
    identifiers.forEach(id => {
      const uniformId = helper.returnUniformDataSourceId(id)
      const platform = helper.extractDataSourcePlatform(id)
      const breakdown = helper.extractDataSourceBreakdown(id)
      const name = helper.extractDataSourceName(uniformId, platform, breakdown)
      const type = helper.assignDataSourceType(uniformId)

      // Skip the data source if the platform is Apple Music
      if (platform === 'apple') { return }

      if (!breakdown) {
        object[platform][name].id = id
        object[platform][name].type = type
      } else {
        object[platform][name].breakdown[breakdown] = {
          id,
          type,
        }
      }
    })

    // If a data source has no breakdowns, assign breakdown to undefined
    identifiers.forEach(id => {
      const uniformId = helper.returnUniformDataSourceId(id)
      const platform = helper.extractDataSourcePlatform(id)
      const breakdown = helper.extractDataSourceBreakdown(id)
      const name = helper.extractDataSourceName(uniformId, platform, breakdown)

      // Skip the data source if the platform is Apple Music
      if (platform === 'apple') { return }

      if (Object.keys(object[platform][name].breakdown).length === 0) {
        object[platform][name].breakdown = undefined
      }
    })

    // If a data source only has breakdowns, assign one as the default
    identifiers.forEach(id => {
      const uniformId = helper.returnUniformDataSourceId(id)
      const platform = helper.extractDataSourcePlatform(id)
      const breakdown = helper.extractDataSourceBreakdown(id)
      const name = helper.extractDataSourceName(uniformId, platform, breakdown)

      // Skip the data source if the platform is Apple Music
      if (platform === 'apple') { return }

      if (!object[platform][name].id) {
        const firstDataSourceBreakdown = Object.keys(object[platform][name].breakdown)[0]
        const firstDataSourceBreakdownId = object[platform][name].breakdown[firstDataSourceBreakdown].id
        const firstDataSourceBreakdownType = object[platform][name].breakdown[firstDataSourceBreakdown].type
        object[platform][name].id = firstDataSourceBreakdownId
        object[platform][name].type = firstDataSourceBreakdownType
      }
    })

    return object
  }

  const previousArtistState = usePrevious(artist)

  React.useEffect(() => {
    // Stop here if no artist
    if (!artist || isEmpty(artist)) return
    const {
      priority_social_platform: socialPlatform,
      _embedded: { data_sources: dataSources },
    } = artist
    // Return if there are no data sources
    if (!dataSources) return
    // Stop here if no change in data sources
    if (previousArtistState) {
      const {
        priority_social_platform: previousSocialPlatform,
        _embedded: { data_sources: perviousDataSources },
      } = previousArtistState
      if (dataSources === perviousDataSources) return
      if (socialPlatform === previousSocialPlatform) return
    }

    // Arrange artist's available data sources by platform and type
    const dataSourcesObject = createDataSourceObject(dataSources)

    setAvailableDataSources(dataSourcesObject)

    // Set the follower count for each platform as
    // the default data sources to display on the chart
    const platforms = Object.keys(dataSourcesObject)
    const dataSourcesForChart = platforms.map(platform => {
      return dataSourcesObject[platform].follower_count.id
    })
    setDisplayedDataSources({
      type: 'update',
      payload: {
        add: dataSourcesForChart,
      },
    })
  }, [artist])
  // END SORT AVAILABLE DATA SOURCES BY PLATFORM AND TYPE

  // QUEUE DEFAULT DATA SOURCES TO BE RETRIEVED FROM SERVER
  React.useEffect(() => {
    // Return if there are no available data sources
    if (Object.keys(availableDataSources).length === 0) return

    // Return if data sources are already in the queue, requested, or available
    const available = [...data.queued, ...data.requested, ...Object.keys(data.available)]
    if (available.length > 0) return

    // Set Instagram follower count as the default data source
    let defaultDataSources = ['instagram_follower_count']
    // If Instagram is not connected, use Facebook Likes instead
    if (!availableDataSources.instagram) {
      defaultDataSources = ['facebook_likes']
    }
    // Add the default data sources to the queue
    setData({
      type: 'add-to-queued',
      payload: {
        queued: defaultDataSources,
      },
    })
    // Set these default data sources as the ones displayed on the chart at first
    setDisplayedDataSources({
      type: 'add-data-sources',
      payload: {
        data_sources: defaultDataSources,
      },
    })
  }, [availableDataSources, data])
  // END QUEUE DEFAULT  DATA SOURCES TO BE RETRIEVED FROM SERVER

  // FUNCTION TO RETRIEVE DATA FROM SERVER
  const getData = React.useCallback(async queue => {
    // Reset the queue, and move the data sources over to requested
    setData({
      type: 'add-to-requested',
      payload: {
        requested: queue,
      },
    })


    // Make a request to the server for the data sources
    const token = await getToken()
      .catch((err) => {
        throw (err)
      })
    const data = await server.getDataSourceValue(queue, artist.id, token)
      .catch((err) => {
        throw (err)
      })

    // Sort through the returned information, and pull out data from relevant dates
    const dataSourceIds = Object.keys(data)
    dataSourceIds.forEach(id => {
      const dataSource = data[id]
      dataSource.type = helper.assignDataSourceType(id)
      dataSource.mostRecent = {
        date: Object.keys(dataSource.daily_data).pop(),
        value: Object.values(dataSource.daily_data).pop(),
      }
      dataSource.earliest = {
        date: Object.keys(dataSource.daily_data)[0],
        value: Object.values(dataSource.daily_data)[0],
      }
      dataSource.today = dataSource.daily_data[dates.today]
      dataSource.yesterday = dataSource.daily_data[dates.yesterday]
      dataSource.twoDaysBefore = dataSource.daily_data[dates.twoDaysBefore]
      dataSource.sevenDaysBefore = dataSource.daily_data[dates.sevenDaysBefore]
      dataSource.oneMonthBefore = dataSource.daily_data[dates.oneMonthBefore]
      dataSource.startOfYear = dataSource.daily_data[dates.startOfYear]
    })

    return data
  }, [artist.id, dates, getToken])
  // END FUNCTION TO RETRIEVE DATA FROM SERVER

  // RETRIEVE DATA FROM SERVER FOR QUEUED DATA SOURCES
  React.useEffect(() => {
    // Return if there is nothing in the queue
    if (data.queued.length === 0) {
      return
    }

    // Check that the queued data sources aren't already available or requested
    const availableAndRequested = [...data.requested, ...Object.keys(data.available)]
    const { queued: queuedData } = data
    const queue = queuedData.filter((dataSource) => {
      return availableAndRequested.indexOf(dataSource) === -1
    })

    // Return if there isn't anything to retrieve and reset queue
    if (queue.length === 0) {
      setData({ type: 'reset-queued' })
      return
    }

    // Call getData to retrieve data from the server
    getData(queue)
      .then(data => {
        setData({
          type: 'store-data',
          payload: {
            data,
          },
        })
      })
      .catch(err => {
        setError(err)
      })
  }, [data, getData])
  // END RETRIEVE DATA FROM SERVER FOR QUEUED DATA SOURCES

  // SET LOADING TO FALSE ONCE SET-UP HAS FINISHED
  React.useEffect(() => {
    // Return if there is no data available
    if (Object.keys(data.available).length === 0) {
      return
    }

    // Set chart loading to false if there is data that can be displayed
    setChartLoading(false)
  }, [availableDataSources, data.available])
  // END SET LOADING TO FALSE ONCE SET-UP HAS FINISHED

  if (chartLoading) {
    return (
      <Loading />
    )
  }
  return (
    <ChartContainer
      availableDataSources={availableDataSources}
      data={data.available}
      dates={dates}
      displayedDataSources={displayedDataSources}
      setData={setData}
      setDisplayedDataSources={setDisplayedDataSources}
    />
  )
}

export default HomePageChart
