import moment from 'moment'

// CONFIGURE MOMENT
// Set first day of week to Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

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
export const getPeriodDates = (granularity, start, end) => {
  const periodDates = []
  let periodToAdd = start
  while (periodToAdd.isBefore(end, 'day')) {
    periodDates.push(periodToAdd.format('YYYY-MM-DD'))
    periodToAdd = periodToAdd.add(1, granularity).endOf(granularity)
  }
  // Add the final period to the array
  periodDates.push(end.format('YYYY-MM-DD'))
  return periodDates
}

// CREATE ARRAY OF PERIOD LABELS
export const getPeriodLabels = (granularity, periodDates) => {
  return periodDates.map((date) => {
    const labelFormat = granularity === 'months' ? 'MMM' : 'DD MMM'
    const dateMoment = moment(date, 'YYYY-MM-DD')
    return dateMoment.format(labelFormat)
  })
}

// CREATE DATA ARRAY
export const createDataArray = (datePeriods, dataSource, data) => {
  const dataArray = []
  datePeriods.forEach((date, index) => {
    const { dailyData, dataType } = data
    // If there is a value for the date, return it
    if (dailyData[date]) {
      dataArray.push(dailyData[date])
      return
    }

    // If the data type is not cumulative, return 0
    if (dataType !== 'cumulative') {
      dataArray.push(0)
      return
    }

    // Check if there are earlier data points available for the data source
    const dateMoment = moment(date, 'YYYY-MM-DD')
    const firstDate = Object.keys(dailyData)[0]
    const firstDateMoment = moment(firstDate, 'YYYY-MM-DD')
    let daysBetween = dateMoment.diff(firstDateMoment, 'days')

    // If there are earlier data values available, return the most recent
    if (daysBetween > 0) {
      let value
      let lastDateChecked = date

      while (daysBetween > 0 && !value) {
        const newMomentToCheck = moment(lastDateChecked, 'YYYY-MM-DD').subtract(1, 'days')
        const newDateToCheck = newMomentToCheck.format('YYYY-MM-DD')

        if (dailyData[newDateToCheck]) {
          value = dailyData[newDateToCheck]
        } else {
          lastDateChecked = newDateToCheck
          daysBetween -= 1
        }
      }

      if (value) {
        dataArray.push(value)
        return
      }
    }

    // If there was a value returned by the previous date, return that
    if (dataArray[index - 1]) {
      dataArray.push(dataArray[index - 1])
      return
    }

    // And if there is still nothing, return 0
    dataArray.push(0)
  })
  return dataArray
}
