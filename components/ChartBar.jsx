// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'
import tinycolor from 'tinycolor2'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'
// IMPORT COMPONENTS
import Spinner from './elements/Spinner'
import ChartBarOverlay from './ChartBarOverlay'
// IMPORT HELPERS
import helper from './helpers/helper'
import * as chartHelpers from './helpers/chartHelpers'
import brandColors from '../constants/brandColors'
// IMPORT STYLES
import styles from './InsightsPage.module.css'

// Set first day of week to Monday
moment.updateLocale('en', {
  week: {
    dow: 1,
  },
})

// DEFINE BASE CHART CONFIG
const baseBarConfig = {
  barPercentage: 0.8,
  categoryPercentage: 1,
  barThickness: 'flex',
}

const baseChartConfig = {
  maintainAspectRatio: true,
  responsive: true,
  backgroundColor: 'transparent',
  layout: {
    padding: 0,
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      stacked: true,
      gridLines: {
        drawBorder: false,
        drawTicks: false,
        display: false,
      },
      ticks: {
        maxRotation: 0,
        display: false,
      },
    }],
    yAxes: [{
      stacked: true,
      gridLines: {
        drawBorder: false,
        drawTicks: false,
        display: false,
      },
      dataset: {
        barPercentage: 0.8,
        categoryPercentage: 1,
        barThickness: 'flex',
      },
      ticks: {
        beginAtZero: false,
        display: false,
        stepSize: 1,
        padding: 5,
      },
    }],
  },
  tooltips: {
    backgroundColor: helper.hexToRGBA(brandColors.bgColor, 0.9),
    titleFontFamily: "'Inter', 'sans-serif'",
    bodyFontFamily: "'Inter', 'sans-serif'",
    titleFontSize: 18,
    bodyFontSize: 15,
    titleMarginBottom: 9,
    titleFontColor: brandColors.textColor,
    bodyFontColor: brandColors.textColor,
    bodySpacing: 5,
    xPadding: 15,
    yPadding: 15,
  },
}
function ChartBar({
  data,
  earliestDataPoint,
  latestDataPoint,
  loading,
  artistCurrency,
  error,
}) {
  // DEFINE STATES
  const [currentPlatform, setCurrentPlaform] = React.useState(data.platform)
  const [currentDataSource, setCurrentDataSource] = React.useState(data.source)
  const [dateLabels, setDateLabels] = React.useState([])
  const [chartLimit, setChartLimit] = React.useState({
    max: undefined,
    min: undefined,
  })
  const [chartDataSets, setChartDataSets] = React.useState([])
  const [chartOptions, setChartOptions] = React.useState({})
  // PLACEHOLDER CHART BUILDER
  const showPlaceholder = (loading) => {
    const buildDummyChart = !loading || !chartDataSets.length
    // Get dummy data
    const {
      dataArray,
      periodLabels,
      chartLimit,
    } = chartHelpers.getDummyData()
    // Setup chart
    setDateLabels(periodLabels)
    setChartLimit(chartLimit)
    // DEFINE DATA SET
    // If loading, use previous. If error show dummy
    const dataSet = !buildDummyChart ? chartDataSets[0] : {
      ...baseBarConfig,
      label: 'loading',
      data: dataArray,
    }
    // Set chart data
    setChartDataSets([{
      ...dataSet,
      backgroundColor: brandColors.grey,
    }])
    // Configure chart
    if (buildDummyChart) {
      setChartOptions(baseChartConfig)
    }
  }

  // UPDATE DATA SOURCE
  React.useEffect(() => {
    const { source, platform } = data
    if (!data) return
    setCurrentDataSource(source)
    setCurrentPlaform(platform)
  }, [data.source])

  // UPDATE CHART CLASSES BASED ON STATE
  const [chartClasses, setChartClasses] = React.useState([])
  React.useEffect(() => {
    if (loading || error) {
      setChartClasses([styles.chartContainer__bar, styles._loading])
      return
    }
    setChartClasses([styles.chartContainer__bar])
  }, [loading, error])

  // UPDATE CHART BASED ON STATE
  React.useEffect(() => {
    // Handle loading
    if (loading || error) {
      showPlaceholder(loading)
      return
    }
    // Stop if no data source
    if (!currentDataSource) return
    // Define relevant moments
    const earliestMoment = moment(earliestDataPoint, 'YYYY-MM-DD')
    const latestMoment = moment(latestDataPoint, 'YYYY-MM-DD')
    // Calculate granularity
    const granularity = chartHelpers.calcGranularity(earliestMoment, latestMoment)
    // Depending on granularity, determine start and end moments
    const [start, end] = chartHelpers.calcStartAndEnd(granularity, earliestMoment, latestMoment)
    // Cycle through from start to end dates, adding
    // each period to the labels and dates array
    const periodDates = chartHelpers.getPeriodDates(granularity, start, end)
    // Cycle through the dates and add the relevant labels
    const periodLabels = chartHelpers.getPeriodLabels(granularity, periodDates)
    setDateLabels(periodLabels)

    // DEFINE THE DATASET(S) TO DISPLAY
    const dataArray = chartHelpers.createDataArray(periodDates, currentDataSource, data)
    // Set the limits of the charts y axis
    const max = helper.maxArrayValue(dataArray)
    const min = helper.minArrayValue(dataArray)
    // Ensure range is even number
    const range = max - min
    const maxLimitModifier = (range % 2) > 0 ? 1 : 0
    const newChartLimit = {
      max: Math.round(max * 1.01) + maxLimitModifier,
      min: currentDataSource === 'facebook_ad_spend_feed' ? 0 : Math.round(min * 0.99),
    }
    setChartLimit(newChartLimit)
    const increaseArr = dataArray.map((datum, index) => {
      const value = datum - dataArray[index - 1]
      if (index === 0 || value < 0) {
        return 0
      }
      return value
    })

    const carriedArr = dataArray.map((datum, index) => {
      return datum - increaseArr[index]
    })

    // DEFINE CHART DATA
    const { cumulative } = data
    const chartColor = brandColors[currentPlatform]
    const lightColor = tinycolor(chartColor).lighten('12').toString()

    const chartData = [
      {
        ...baseBarConfig,
        label: currentDataSource,
        data: cumulative ? carriedArr : dataArray,
        backgroundColor: cumulative ? lightColor : chartColor,
      },
    ]

    // If data is cumulative, show increase
    if (cumulative) {
      const increaseData = {
        ...baseBarConfig,
        label: `new_${currentDataSource}`,
        data: increaseArr,
        backgroundColor: chartColor,
      }
      chartData.push(increaseData)
    }
    // Set the datasets to display on the chart
    setChartDataSets(chartData)

    // DEFINE CHART OPTIONS
    const sumPreviousAndNewValues = (chartData, index) => {
      let total = 0
      chartData.forEach(dataset => {
        total += dataset.data[index]
      })
      return total
    }

    const newChartOptions = produce(baseChartConfig, draftConfig => {
      // Edit Y axes
      draftConfig.scales.yAxes[0].ticks.max = newChartLimit.max
      draftConfig.scales.yAxes[0].ticks.min = newChartLimit.min
      draftConfig.scales.yAxes[0].ticks.callback = (tickValue) => {
        const mid = (newChartLimit.max - newChartLimit.min) / 2
        if (
          tickValue === newChartLimit.min + mid
            || tickValue === newChartLimit.max
            || tickValue === newChartLimit.min
        ) {
          return tickValue
        }
      }
      // Edit callbacks
      draftConfig.tooltips.callbacks = {
        beforeBody(tooltipItem, chart) {
          if (loading) return
          const dataIndex = tooltipItem[0].index
          const { datasetIndex } = tooltipItem[0]
          const datasetName = chart.datasets[datasetIndex].label
          // If the visible tooltip relates to value added since last period,
          // display the total value on the relevant date in 'beforeBody'
          if (datasetName.indexOf('new_') > -1) {
            const total = sumPreviousAndNewValues(chartData, dataIndex)
            const totalFormatted = data.currency ? helper.formatCurrency(total, artistCurrency) : helper.formatNumber(total)
            const platform = helper.capitalise(currentPlatform)
            return `${totalFormatted}: ${platform} ${data.title}`
          }
        },
        label(tooltipItem, chart) {
          if (loading) return
          const { datasetIndex } = tooltipItem
          const datasetName = chart.datasets[datasetIndex].label
          // If there is just one data source displayed, and the tooltip relates to value added since last period,
          // display the positive change in 'label'
          const dataIndex = tooltipItem.index
          if (datasetName.indexOf('new_') > -1) {
            const previousDate = chart.labels[dataIndex - 1]
            return ` ${helper.formatNumber(tooltipItem.value)} more than ${previousDate}`
          }
          const total = sumPreviousAndNewValues(chartData, dataIndex)
          const totalFormatted = data.currency ? helper.formatCurrency(total, artistCurrency) : helper.formatNumber(total)
          const platform = helper.capitalise(currentPlatform)
          return ` ${totalFormatted}: ${platform} ${data.title}`
        },
      }
    })
    setChartOptions(newChartOptions)
  }, [currentDataSource, earliestDataPoint, latestDataPoint, loading, error])

  return (
    <div className={chartClasses.join(' ')}>
      {/* Loading spinner */}
      {loading && <Spinner className={styles.chartSpinner} />}
      {/* No data warning */}
      {error && <p className={styles.chartError}>Insufficent Data</p>}
      {/* CHART */}
      <div className={styles.chartContainer__inner}>
        <Bar
          data={{
            labels: dateLabels,
            datasets: chartDataSets,
          }}
          options={chartOptions}
          width={75}
          height={50}
        />
      </div>
      {/* THE OVERLAY */}
      <ChartBarOverlay
        max={chartLimit.max}
        min={chartLimit.min}
        currency={data.currency ? artistCurrency : ''}
        labels={dateLabels}
        loading={loading}
      />
    </div>
  )
}

export default ChartBar

ChartBar.propTypes = {
  data: PropTypes.object,
  earliestDataPoint: PropTypes.string,
  latestDataPoint: PropTypes.string,
  loading: PropTypes.bool,
  artistCurrency: PropTypes.string.isRequired,
  error: PropTypes.bool,
}

ChartBar.defaultProps = {
  data: {},
  earliestDataPoint: '',
  latestDataPoint: '',
  loading: false,
  error: false,
}
