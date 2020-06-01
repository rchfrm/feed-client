import moment from 'moment'
import * as utils from './utils'

// IMPORT CONSTANTS
import insightDataSources from '../../constants/insightDataSources'

// CONFIGURE MOMENT
// Set first day of week to Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

export const getAvailablePlatforms = (availableDataSources) => {
  // Get name of platform from data source
  const dataSourcePlatforms = availableDataSources.map(({ id: sourceId }) => {
    const { platform } = insightDataSources[sourceId]
    return platform
  })
  // Get platforms by removing duplicates from above
  const allPlatforms = dataSourcePlatforms.reduce((platforms, platformName) => {
    // Ignore apple source
    if (platformName === 'apple') return platforms
    // Ignore platform if already included
    if (platforms.find(({ id }) => id === platformName)) return platforms
    // Add platform to array
    return [...platforms, {
      id: platformName,
      title: platformName,
    }]
  }, [])
  // return results
  return allPlatforms
}

export const getInitialPlatform = (availablePlatforms) => {
  // Does the artist have insta
  const instaIndex = availablePlatforms.findIndex(({ id: platformId }) => platformId === 'instagram')
  // If the artist has insta, use this
  if (instaIndex > -1) {
    return availablePlatforms[instaIndex].id
  }
  // Else just use the first one
  return availablePlatforms[0].id
}

export const getAvailableSources = (allSources) => {
  return allSources.reduce((sources, sourceId) => {
    const {
      id,
      title,
      visible,
      breakdown,
      subtitle,
      period,
      platform,
    } = insightDataSources[sourceId]
    // Ignore is not visible or a breakdown
    if (!visible || breakdown) return sources
    return [...sources, {
      title,
      id,
      subtitle: subtitle || period,
      platform,
    }]
  }, [])
}

export const getInitialDataSource = (availableDataSources, currentPlatform) => {
  // Filter out non-platform related sources
  const filteredSources = availableDataSources.filter(({ id: sourceId }) => {
    const { platform } = insightDataSources[sourceId]
    return platform === currentPlatform
  })
  // Find first filter that matches the
  const followersSourceIndex = filteredSources.findIndex(({ id: sourceId }) => {
    return sourceId.includes('follower')
  })
  const likesSourceIndex = filteredSources.findIndex(({ id: sourceId }) => {
    return sourceId.includes('likes')
  })
  if (followersSourceIndex > -1) return filteredSources[followersSourceIndex].id
  if (likesSourceIndex > -1) return filteredSources[likesSourceIndex].id
  return filteredSources[0].id
}

export const getPlatformSources = (availableDataSources, currentPlatform) => {
  return availableDataSources.filter((sourceData) => {
    const { platform } = sourceData
    return platform === currentPlatform
  })
}

export const formatProjection = (projections) => {
  return projections.find(({ period }) => {
    return period === '90d' || period === 'lifetime'
  })
}

export const formatServerData = ({ dailyData, dates, currentDataSource, currentPlatform, projection }) => {
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
    currency,
  } = insightDataSources[currentDataSource]
  // Get most recent and earliest data
  const mostRecentData = dataArray[dataArray.length - 1]
  const earliestData = dataArray[0]
  // Output formatted data
  return {
    dailyData,
    title: `${title} (${subtitle || period})`,
    shortTitle: title,
    subtitle,
    period,
    cumulative: dataType === 'cumulative',
    source: currentDataSource,
    platform: currentPlatform,
    dataType,
    currency,
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
    projection,
  }
}

export const calcGranularity = (earliestMoment, latestMoment) => {
  // Find out number of weeks between earliest and latest dates
  const weeks = latestMoment.diff(earliestMoment, 'weeks', true)
  // If there is less than 4 weeks of data, set granularity to 'days'
  if (weeks < 4) return 'days'
  // If there is less than 26 weeks (0.5 year) of data, set granularity to 'weeks'
  if (weeks < 26) return 'weeks'
  // Otherwise set granularity to 'months'
  return 'months'
}

export const calcStartAndEnd = (granularity, earliestMoment, latestMoment) => {
  // If displaying daily data, periods will start from earliest moment,
  // up to and including the latest
  if (granularity === 'days') {
    return [earliestMoment, latestMoment]
  }
  // If displaying weekly data, periods will start from Sunday after earliest moment,
  // up to Sunday before latest moment
  if (granularity === 'weeks') {
    return [earliestMoment.endOf('week'), latestMoment.startOf('week').subtract(1, 'day')]
  }
  // If it's monthly data, periods will be from end of month of earliest moment,
  // up to latest moment
  return [earliestMoment.endOf('month'), latestMoment]
}

// CREATE ARRAY OF PERIOD DATES
const getClosestDate = (dailyDataSeconds, targetDate) => {
  // Get date (in seconds)
  const date = utils.closestNumberInArray(dailyDataSeconds, targetDate)
  // return moment object
  return moment.unix(date)
}

const getFirstMoment = (dailyDataMoments, dailyDataSeconds, granularity) => {
  const earliestDate = dailyDataMoments[0]
  const earliestMoment = moment(earliestDate)
  // If monthly or yearly grain, get last date of period
  if (granularity === 'months' || granularity === 'years') {
    const endPeriodType = granularity === 'months' ? 'month' : 'year'
    const endOfPeriod = earliestMoment.endOf(endPeriodType)
    const closestMoment = getClosestDate(dailyDataSeconds, endOfPeriod.unix())
    return closestMoment
  }
  // Else just return the earliest moment
  return earliestMoment
}

const getNextMoment = (firstMoment, lastMoment, granularity, dailyDataSeconds) => (momentsArray, previousMoment, i, resolve) => {
  const nextMoment = firstMoment.clone().add(i, granularity)
  // Stop here if gone beyond date range
  if (nextMoment.isAfter(lastMoment)) {
    resolve(momentsArray)
    return
  }
  const newMomentsArray = [...momentsArray]
  let newPreviousMoment = previousMoment.clone()
  // Find the closest date in the data to the modified date
  const closestMoment = getClosestDate(dailyDataSeconds, nextMoment.unix())
  // If closest date is not too close, add it to array
  const granularityDifference = closestMoment.diff(newPreviousMoment, granularity, true)
  if (granularityDifference >= 0.9) {
    newMomentsArray.push(closestMoment)
    newPreviousMoment = closestMoment
  }
  // Self-invoke to continue
  getNextMoment(firstMoment, lastMoment, granularity, dailyDataSeconds)(newMomentsArray, newPreviousMoment, i += 1, resolve)
}

const buildMomentsArray = (firstMoment, lastMoment, granularity, dailyDataSeconds) => {
  return new Promise((resolve) => {
    getNextMoment(firstMoment, lastMoment, granularity, dailyDataSeconds)([firstMoment], firstMoment, 1, resolve)
  })
}

export const getPeriodDates = async (data, granularity) => {
  const { dailyData, mostRecent: { date: lastDate } } = data
  // Create array of momments that correspond to daily data dates
  const dailyDataMoments = Object.keys(dailyData).map((date) => {
    return moment(date, 'YYYY-MM-DD')
  })
  // Create an array of these momements, but in seconds
  const dailyDataSeconds = dailyDataMoments.map((day) => day.unix())
  // Get moment of first date
  const firstMoment = getFirstMoment(dailyDataMoments, dailyDataSeconds, granularity)
  // Get moment of last date of data
  const lastMoment = moment(lastDate, 'YYYY-MM-DD')
  // CREATE ARRAY OF MOMENTS, SPACED BY GRANULARITY
  const periodMoments = await buildMomentsArray(firstMoment, lastMoment, granularity, dailyDataSeconds)
  // Convert the moments to dates and return
  const periodDates = periodMoments.map((period) => period.format('YYYY-MM-DD'))
  // Add last most recent data point to the end
  const lastDateIndex = periodMoments.length - 1
  const lastPeriodMoment = periodMoments[lastDateIndex]
  const lastPeriodDate = periodDates[lastDateIndex]
  if (lastDate !== lastPeriodDate) {
    const timeDifference = lastMoment.diff(lastPeriodMoment, granularity, true)
    // If last date is too close to last data point, replace it
    if (timeDifference < 0.5) {
      periodDates[lastDateIndex] = lastPeriodDate
    // Else add to the end
    } else {
      periodDates.push(lastDate)
    }
  }
  // Return dates
  return periodDates
}

// CREATE ARRAY OF PERIOD LABELS
export const getPeriodLabels = (periodDates) => {
  return periodDates.map((date) => {
    const labelFormat = 'DD MMM'
    const dateMoment = moment(date, 'YYYY-MM-DD')
    return dateMoment.format(labelFormat)
  })
}

// CREATE DATA ARRAY
export const createDataArray = (datePeriods, data) => {
  const { dailyData } = data
  return datePeriods.map((date) => dailyData[date])
}

export const getDummyData = () => {
  return {
    dataArray: [505, 505, 509, 512, 515, 524, 525, 527, 532, 538, 541, 548, 552, 559, 566],
    periodLabels: Array(15).fill().map((_, i) => i.toString()),
    chartLimit: { max: 579, min: 500 },
  }
}
