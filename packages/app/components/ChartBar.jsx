// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'
import tinycolor from 'tinycolor2'
import moment from 'moment'
import Chart from 'react-chartjs-2'
// IMPORT COMPONENTS
import Spinner from '@/elements/Spinner'
import ChartBarOverlay from '@/app/ChartBarOverlay'
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
import * as insightsHelpers from '@/app/helpers/insightsHelpers'
import brandColors from '@/constants/brandColors'
// IMPORT STYLES
import styles from '@/app/InsightsPage.module.css'

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
  backgroundColor: 'transparent',
  layout: {
    padding: 0,
  },
  legend: {
    display: false,
  },
  elements: {
    point: {
      pointStyle: 'line',
    },
    line: {
      tension: 0,
    },
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
    backgroundColor: utils.hexToRGBA(brandColors.bgColor, 0.9),
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
  className,
  data,
  lineData,
  artistId,
  loading,
  artistCurrency,
  error,
  heightClasses,
}) {
  // DEFINE STATES
  const [dateLabels, setDateLabels] = React.useState([])
  const [chartLimit, setChartLimit] = React.useState({
    max: '',
    min: '',
  })
  const [chartDataSets, setChartDataSets] = React.useState([])
  const [chartOptions, setChartOptions] = React.useState({})
  const [granularity, setGranularity] = React.useState('')
  // PLACEHOLDER CHART BUILDER
  const showPlaceholder = (loading) => {
    const buildDummyChart = !loading || !chartDataSets.length
    // Get dummy data
    const {
      dataArray,
      periodLabels,
      chartLimit,
    } = insightsHelpers.getDummyData()
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

  // UPDATE CHART CLASSES BASED ON STATE
  const [chartClasses, setChartClasses] = React.useState([className])
  React.useEffect(() => {
    if (loading || error) {
      setChartClasses([className, styles.chartContainer__bar, styles._loading])
      return
    }
    setChartClasses([className, styles.chartContainer__bar])
  }, [loading, error, className])

  // UPDATE CHART BASED ON STATE
  React.useEffect(() => {
    // Handle loading
    if (loading || error) {
      showPlaceholder(loading)
      return
    }
    const { source: currentDataSource, platform: currentPlatform } = data
    // Stop if no data source
    if (!data.source) return
    // Define relevant moments
    const earliestMoment = moment(data.earliest.date, 'YYYY-MM-DD')
    const latestMoment = moment(data.mostRecent.date, 'YYYY-MM-DD')
    // Calculate granularity
    const granularity = insightsHelpers.calcGranularity(earliestMoment, latestMoment)
    setGranularity(granularity)
    // Get period dates and values from the data, based on the granularity
    const [periodDates, periodValues] = insightsHelpers.getChartData(data, granularity)
    // Cycle through the dates and add the relevant labels
    const periodLabels = insightsHelpers.getPeriodLabels(periodDates)
    setDateLabels(periodLabels)

    // DEFINE THE DATASET(S) TO DISPLAY
    // Set the limits of the charts y axis
    const max = utils.maxArrayValue(periodValues)
    const min = utils.minArrayValue(periodValues)
    // Ensure range is even number
    const range = max - min
    const maxLimitModifier = (range % 2) > 0 ? 1 : 2
    const newChartLimit = {
      max: Math.round(max * 1.01) + maxLimitModifier,
      min: currentDataSource === 'facebook_ad_spend_feed' ? 0 : Math.max(0, Math.round(min * 0.99) - 1),
    }
    setChartLimit(newChartLimit)
    const increaseArr = periodValues.map((datum, index) => {
      if (index === 0) return 0
      // Get previous value, skipping gaps
      let previousValue = null
      let i = 1
      while (typeof previousValue !== 'number') {
        previousValue = periodValues[index - i]
        i += 1
      }
      const value = datum - previousValue
      if (value < 0) return 0
      return value
    })

    const carriedArr = periodValues.map((datum, index) => {
      return datum - increaseArr[index]
    })

    // DEFINE CHART DATA
    const { cumulative } = data
    const { bg: chartColor } = brandColors[currentPlatform]
    const lightColor = tinycolor(chartColor).lighten('12').toString()

    const chartData = [
      {
        ...baseBarConfig,
        type: 'bar',
        label: currentDataSource,
        data: cumulative ? carriedArr : periodValues,
        backgroundColor: cumulative ? lightColor : chartColor,
      },
    ]

    if (lineData) {
      const lineChartData = {
        ...baseBarConfig,
        type: 'line',
        borderColor: 'black',
        backgroundColor: 'transparent',
        label: 'Spending',
        data: periodValues,
      }

      chartData.unshift(lineChartData)
    }

    // If data is cumulative, show increase
    if (cumulative) {
      const increaseData = {
        ...baseBarConfig,
        type: 'bar',
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
      // Edit aspect ratio
      if (heightClasses) {
        draftConfig.maintainAspectRatio = false
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
            const totalFormatted = data.currency ? utils.formatCurrency(total, artistCurrency) : utils.formatNumber(total)
            const platform = utils.capitalise(currentPlatform)
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
            return ` ${utils.formatNumber(tooltipItem.value)} more than ${previousDate}`
          }
          const total = sumPreviousAndNewValues(chartData, dataIndex)
          const totalFormatted = data.currency ? utils.formatCurrency(total, artistCurrency) : utils.formatNumber(total)
          const platform = utils.capitalise(currentPlatform)
          return ` ${totalFormatted}: ${platform} ${data.title}`
        },
      }
    })
    setChartOptions(newChartOptions)
  }, [data.source, artistId, loading, error])

  return (
    <div className={chartClasses.join(' ')}>
      {/* Loading spinner */}
      {loading && <Spinner className={styles.chartSpinner} />}
      {/* No data warning */}
      {error && <p className={styles.chartError}>Insufficent Data</p>}
      {/* CHART */}
      <div className={heightClasses || styles.chartContainer__inner}>
        <Chart
          data={{
            labels: dateLabels,
            datasets: chartDataSets,
          }}
          options={chartOptions}
          width={75}
          height={error ? 25 : 50}
        />
      </div>
      {/* THE OVERLAY */}
      <ChartBarOverlay
        max={chartLimit.max}
        min={chartLimit.min}
        currency={data.currency ? artistCurrency : ''}
        labels={dateLabels}
        loading={loading}
        granularity={granularity}
      />
    </div>
  )
}

export default ChartBar

ChartBar.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  lineData: PropTypes.object,
  artistId: PropTypes.string,
  loading: PropTypes.bool,
  artistCurrency: PropTypes.string,
  error: PropTypes.bool,
  heightClasses: PropTypes.string,
}

ChartBar.defaultProps = {
  className: '',
  data: {},
  lineData: null,
  artistId: '',
  loading: false,
  artistCurrency: '',
  error: false,
  heightClasses: '',
}
