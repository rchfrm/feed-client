import moment from 'moment'
import * as utils from '@/helpers/utils'

// IMPORT CONSTANTS
import insightDataSources from '@/constants/insightDataSources'

// CONFIGURE MOMENT
// Set first day of week to Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

export const getAvailablePlatforms = (availableDataSources) => {
  // Get name of platform from data source
  const dataSourcePlatforms = availableDataSources.map(({ name: sourceName }) => {
    const { platform } = insightDataSources[sourceName]
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
  // return platforms (sorted)
  return utils.sortArrayByKey(allPlatforms, 'id')
}

export const getInitialPlatform = (availablePlatforms) => {
  if (! availablePlatforms) return
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
  const sources = allSources.reduce((sources, { name: sourceName }) => {
    const {
      name,
      title,
      visible,
      breakdown,
      subtitle,
      period,
      platform,
    } = insightDataSources[sourceName]
    // Ignore is not visible or a breakdown
    if (! visible || breakdown) return sources
    return [...sources, {
      title,
      name,
      subtitle: subtitle || period,
      platform,
    }]
  }, [])
  // return sources (sorted)
  return utils.sortArrayByKey(sources, 'id')
}

export const getInitialDataSource = (availableDataSources, currentPlatform) => {
  if (! currentPlatform) return 'instagram_follower_count'
  // Filter out non-platform related sources
  const filteredSources = availableDataSources.filter(({ name: sourceName }) => {
    const { platform } = insightDataSources[sourceName]
    return platform === currentPlatform
  })
  // Stop here if current platform doesn't exist in data sources
  if (! filteredSources.length) return
  // Find first filter that matches the
  const followersSourceIndex = filteredSources.findIndex(({ name: sourceName }) => {
    return sourceName.includes('follower')
  })
  const likesSourceIndex = filteredSources.findIndex(({ name: sourceName }) => {
    return sourceName.includes('likes')
  })
  if (followersSourceIndex > -1) {
    return filteredSources[followersSourceIndex].name
  }
  if (likesSourceIndex > -1) return filteredSources[likesSourceIndex].name
  return filteredSources[0].name
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

export const formatServerData = ({ dailyData, dates = {}, currentDataSource, currentPlatform, projection }) => {
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
  const months = latestMoment.diff(earliestMoment, 'months', true)
  // If there is less than 4 weeks of data, set granularity to 'days'
  if (months < 1) return 'days'
  // If there is less than 26 weeks (0.5 year) of data, set granularity to 'weeks'
  if (months < 6) return 'weeks'
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

//* Get missing data
const fillInMissingData = (periodData, granularity) => {
  // Add in missing data
  return periodData.reduce((results, datum, index) => {
    // Do nothing for first entry
    if (index === 0) return [datum]
    const previousDatum = periodData[index - 1]
    const { dateMoment: currentMoment } = datum
    const { dateMoment: previousMoment } = previousDatum
    const dateGap = currentMoment.diff(previousMoment, granularity, true)
    // If gap between two periods is small enough, just carry on
    if (dateGap < 1.5) return [...results, datum]
    // Else add in a missing datapoint
    const missingPeriodMoment = previousMoment.add(1, granularity)
    const missingPeriod = granularity === 'months' ? missingPeriodMoment.month() : missingPeriodMoment.isoWeek()
    const missingDataPayload = {
      period: missingPeriod,
      year: missingPeriodMoment.year(),
      date: missingPeriodMoment.format('YYYY-MM-DD'),
      value: null,
    }
    return [...results, missingDataPayload, datum]
  }, [])
}

// * Get info about the date
const getDateInfo = (date, granularity) => {
  const dateMoment = moment(date, 'YYYY-MM-DD')
  const dateInfo = {
    date,
    dateMoment,
    day: dateMoment.day(),
    week: dateMoment.isoWeek(),
    month: dateMoment.month(),
    year: dateMoment.year(),
  }
  // Get period based off granularity
  dateInfo.period = granularity === 'months' ? dateInfo.month
    : granularity === 'weeks' ? dateInfo.week
      : dateInfo.day
  dateInfo.startOfPeriod = dateMoment.clone().startOf(granularity === 'weeks' ? 'isoWeek' : granularity)
  // Return info
  return dateInfo
}

// * GET PERIOD DATA
// Returns an array periods (weeks/months) covered by the data.
// Each entry is an object containing the date, date value, and period index
const getPeriodData = (dailyData, granularity) => {
  const periodData = Object.entries(dailyData).reduce((results, [date, value]) => {
    const dateInfo = getDateInfo(date, granularity)
    const payload = { ...dateInfo, value }
    const isStartOfPeriod = dateInfo.dateMoment.isSame(dateInfo.startOfPeriod, 'day')
    if (isStartOfPeriod) {
      return [...results, payload]
    }
    return results
  }, [])
  // Add in missing data with blanks
  return fillInMissingData(periodData, granularity)
}

// * GET CUMULATIVE DATA
// Return the cumulative data for each granularity period
const getCumulativeData = (dailyData, granularity) => {
  const cumulativeDataObject = Object.entries(dailyData).reduce((results, [date, value]) => {
    const dateInfo = getDateInfo(date, granularity)
    const periodKey = dateInfo.startOfPeriod.format('YYYY-MM-DD')
    // If data for this period already exists, update the total
    if (results[periodKey]) {
      results[periodKey].value += value
      return results
    }
    // If no data for this period, start it
    results[periodKey] = {
      ...dateInfo,
      value,
    }
    return results
  }, {})
  // Convert to array and turn values of 0 to null
  const formattedCumulativeDataObject = Object.values(cumulativeDataObject).map((periodObject) => {
    return {
      ...periodObject,
      value: periodObject.value === 0 ? null : periodObject.value,
    }
  })
  // Sort by date
  return utils.sortArrayByKey(formattedCumulativeDataObject, 'date')
}


// RETURNS AN ARRAY OF DATES and their VALUES
export const getChartData = (data, granularity) => {
  const { dailyData, dataType } = data
  const isCumulative = dataType === 'daily' && granularity !== 'days'
  const periodData = isCumulative ? getCumulativeData(dailyData, granularity) : getPeriodData(dailyData, granularity)
  const dates = periodData.map(({ date }) => date)
  const values = periodData.map(({ value }) => value)
  const mostRecentData = Object.keys(dailyData).pop()
  // Add the latest date / value to end of array so today's data
  // is shown even if part way through the week or month
  if (
    ! isCumulative
    && granularity !== 'days'
    && mostRecentData !== dates[dates.length - 1]
    && dailyData[mostRecentData] !== values[values.length - 1]
  ) {
    dates.push(mostRecentData)
    values.push(dailyData[mostRecentData])
  }
  return [dates, values]
}

// CREATE ARRAY OF PERIOD LABELS
export const getPeriodLabels = (periodDates, granularity) => {
  const [earliestDate] = periodDates
  const lastDate = periodDates[periodDates.length - 1]
  const earliestYear = moment(earliestDate, 'YYYY-MM-DD').year()
  const lastYear = moment(lastDate, 'YYYY-MM-DD').year()
  return periodDates.map((date) => {
    const periodSpansMultipleYears = earliestYear !== lastYear
    if (granularity === 'months') {
      const labelFormat = periodSpansMultipleYears ? 'MMM YY' : 'MMMM'
      const dateMoment = moment(date, 'YYYY-MM-DD')
      return dateMoment.format(labelFormat)
    }
    const labelFormat = periodSpansMultipleYears ? 'D MMM YY' : 'D MMM'
    const dateMoment = moment(date, 'YYYY-MM-DD')
    return dateMoment.format(labelFormat)
  })
}

export const getDummyData = () => {
  return {
    dataArray: [505, 505, 509, 512, 515, 524, 525, 527, 532, 538, 541, 548, 552, 559, 566],
    periodLabels: Array(15).fill().map((_, i) => i.toString()),
    chartLimit: { max: 579, min: 500 },
  }
}
