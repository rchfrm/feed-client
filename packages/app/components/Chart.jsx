// IMPORT PACKAGES
import React from 'react'
import PropTypes from 'prop-types'

import produce from 'immer'
import tinycolor from 'tinycolor2'
import moment from 'moment'
import MixedChart from 'react-chartjs-2'
// IMPORT COMPONENTS
import Spinner from '@/elements/Spinner'
import ChartOverlay from '@/app/ChartOverlay'
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
      id: 'A',
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
    titleFontSize: 15,
    bodyFontSize: 15,
    titleMarginBottom: 9,
    titleFontColor: brandColors.textColor,
    bodyFontColor: brandColors.textColor,
    bodySpacing: 5,
    xPadding: 15,
    yPadding: 15,
  },
}
const Chart = ({
  chartBarData,
  chartLineData,
  artistId,
  loading,
  artistCurrency,
  error,
  className,
  heightClasses,
}) => {
  // DEFINE STATES
  const [dateLabels, setDateLabels] = React.useState([])
  const [chartBarLimit, setChartBarLimit] = React.useState({ max: 0, min: 0 })
  const [chartLineLimit, setChartLineLimit] = React.useState({ max: 0, min: 0 })
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
    setChartBarLimit(chartLimit)
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
    const { source: currentDataSource, platform: currentPlatform } = chartBarData
    // Stop if no data source
    if (!chartBarData.source) return
    // Define relevant moments
    const earliestMoment = moment(chartBarData.earliest.date, 'YYYY-MM-DD')
    const latestMoment = moment(chartBarData.mostRecent.date, 'YYYY-MM-DD')
    // Calculate granularity
    const granularity = insightsHelpers.calcGranularity(earliestMoment, latestMoment)
    setGranularity(granularity)
    // Get period dates and values from the data, based on the granularity
    const [periodDates, periodValues] = insightsHelpers.getChartData(chartBarData, granularity)
    // Cycle through the dates and add the relevant labels
    const periodLabels = insightsHelpers.getPeriodLabels(periodDates, granularity)
    setDateLabels(periodLabels)

    // DEFINE THE DATASET(S) TO DISPLAY
    // Set the limits of the charts y axis
    const max = utils.maxArrayValue(periodValues)
    const min = utils.minArrayValue(periodValues)
    // Ensure range is even number
    const range = max - min
    const maxLimitModifier = (range % 2) > 0 ? 1 : 2
    const newChartBarLimit = {
      max: Math.round(max * 1.01) + maxLimitModifier,
      min: currentDataSource === 'facebook_ad_spend_feed' ? 0 : Math.max(0, Math.round(min * 0.99) - 1),
    }
    setChartBarLimit(newChartBarLimit)

    const increaseArr = periodValues.reduce((result, currentValue, index, source) => {
      if (index !== 0) {
        result.push(currentValue - source[index - 1])
      }
      return result
    }, [0])

    const carriedArr = periodValues.map((datum, index) => {
      return datum - increaseArr[index]
    })

    // DEFINE CHART DATA
    const { cumulative } = chartBarData
    const { bg: chartColor } = brandColors[currentPlatform]
    const lightColor = tinycolor(chartColor).lighten('12').toString()

    const chartData = [
      {
        ...baseBarConfig,
        type: 'bar',
        order: 1,
        yAxisID: 'A',
        label: currentDataSource,
        data: cumulative ? carriedArr : periodValues,
        backgroundColor: cumulative ? lightColor : chartColor,
      },
    ]

    if (chartLineData) {
      const [lineChartPeriodDates, periodValues] = insightsHelpers.getChartData(chartLineData, granularity)
      const startingIndex = lineChartPeriodDates.findIndex(date => date === periodDates[0])

      const data = {
        ...baseBarConfig,
        type: 'line',
        order: 0,
        yAxisID: 'B',
        borderColor: brandColors.black,
        backgroundColor: brandColors.black,
        fill: false,
        label: 'Spending',
        data: periodValues.slice(startingIndex),
        spanGaps: false,
        pointStyle: 'circle',
      }

      chartData.push(data)
    }

    // If data is cumulative, show increase
    if (cumulative) {
      const increaseData = {
        ...baseBarConfig,
        type: 'bar',
        order: 2,
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
      draftConfig.scales.yAxes[0].ticks.max = newChartBarLimit.max
      draftConfig.scales.yAxes[0].ticks.min = newChartBarLimit.min
      draftConfig.scales.yAxes[0].ticks.callback = (tickValue) => {
        const mid = (newChartBarLimit.max - newChartBarLimit.min) / 2
        if (
          tickValue === newChartBarLimit.min + mid
            || tickValue === newChartBarLimit.max
            || tickValue === newChartBarLimit.min
        ) {
          return tickValue
        }
      }
      if (chartLineData) {
        draftConfig.elements.point.backgroundColor = brandColors.black
        const [, periodValues] = insightsHelpers.getChartData(chartLineData, granularity)

        const max = utils.maxArrayValue(periodValues)

        const newChartLineLimit = {
          max: Math.round(max * 1.01) + maxLimitModifier,
          min: 0,
        }
        setChartLineLimit(newChartLineLimit)

        draftConfig.scales.yAxes.push({
          id: 'B',
          gridLines: {
            drawBorder: false,
            drawTicks: false,
            display: false,
          },
          ticks: {
            max: newChartLineLimit.max,
            min: newChartLineLimit.min,
            display: false,
          },
        })
      }
      // Edit aspect ratio
      if (heightClasses) {
        draftConfig.maintainAspectRatio = false
      }
      // Edit callbacks
      draftConfig.tooltips.callbacks = {
        title(tooltipItem, chart) {
          if (loading) return
          const { datasetIndex } = tooltipItem[0]
          if (chart.datasets[datasetIndex].type === 'bar') {
            const platform = utils.capitalise(currentPlatform)

            return `${platform} ${chartBarData.title}`
          }
          if (chart.datasets[datasetIndex].type === 'line') {
            let { title } = chartLineData
            if (chartLineData.source === 'facebook_ad_spend_feed') {
              title = 'Feed spend'
            }
            return `${utils.capitalise(title)}`
          }
        },
        label(tooltipItem, chart) {
          if (loading) return

          const dataIndex = tooltipItem.index
          const { datasetIndex } = tooltipItem
          const currentDate = chart.labels[dataIndex]

          if (chart.datasets[datasetIndex].type === 'bar') {
            // If the visible tooltip relates to value added since last period,
            // display the total value on the relevant date in 'beforeBody'
            const barData = chartData.filter((data) => data.type === 'bar')
            const total = sumPreviousAndNewValues(barData, dataIndex)
            const totalFormatted = chartBarData.currency ? utils.formatCurrency(total, artistCurrency) : utils.formatNumber(total)

            return ` ${currentDate}: ${totalFormatted}`
          }

          if (chart.datasets[datasetIndex].type === 'line') {
            return ` ${currentDate}: ${chartLineData.currency ? utils.formatCurrency(tooltipItem.value, artistCurrency) : utils.formatNumber(tooltipItem[0].value)}`
          }
        },
        afterBody(tooltipItem, chart) {
          if (loading) return

          const dataIndex = tooltipItem[0].index
          const { datasetIndex } = tooltipItem[0]

          if (chart.datasets[datasetIndex].type === 'bar') {
            const datasetName = chart.datasets[datasetIndex].label

            // If there is just one data source displayed, and the tooltip relates to value added since last period,
            // display the positive change in 'label'
            if (datasetName.indexOf('new_') > -1) {
              const previousDate = chart.labels[dataIndex - 1]
              return `(${utils.formatNumber(tooltipItem[0].value)} more than ${previousDate})`
            }
          }
        },
      }
    })
    setChartOptions(newChartOptions)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartBarData.source, artistId, loading, error])

  return (
    <div className={chartClasses.join(' ')}>
      {/* Loading spinner */}
      {loading && <Spinner className={styles.chartSpinner} />}
      {/* No data warning */}
      {error && <p className={styles.chartError}>Insufficient Data</p>}
      {/* CHART */}
      <div className={heightClasses || styles.chartContainer__inner}>
        <MixedChart
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
      <ChartOverlay
        chartBarMax={chartBarLimit.max}
        chartBarMin={chartBarLimit.min}
        chartBarCurrency={chartBarData.currency ? artistCurrency : ''}
        chartLineMax={chartLineLimit.max}
        chartLineMin={chartLineLimit.min}
        chartLineCurrency={chartLineData?.currency ? artistCurrency : ''}
        isMixedChart={Boolean(chartLineData)}
        labels={dateLabels}
        loading={loading}
        granularity={granularity}
      />
    </div>
  )
}

export default Chart

Chart.propTypes = {
  className: PropTypes.string,
  chartBarData: PropTypes.object,
  chartLineData: PropTypes.object,
  artistId: PropTypes.string,
  loading: PropTypes.bool,
  artistCurrency: PropTypes.string,
  error: PropTypes.bool,
  heightClasses: PropTypes.string,
}

Chart.defaultProps = {
  className: '',
  chartBarData: {},
  chartLineData: null,
  artistId: '',
  loading: false,
  artistCurrency: '',
  error: false,
  heightClasses: '',
}
