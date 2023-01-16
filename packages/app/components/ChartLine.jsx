import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import produce from 'immer'

import { Line } from 'react-chartjs-2'

import * as utils from '@/helpers/utils'
import * as insightsHelpers from '@/app/helpers/insightsHelpers'

import brandColors from '@/constants/brandColors'

const baseLineConfig = {
  backgroundColor: 'transparent',
  spanGaps: true,
}

const baseChartConfig = {
  maintainAspectRatio: true,
  responsive: true,
  backgroundColor: 'transparent',
  elements: {
    point: {
      pointStyle: 'line',
    },
    line: {
      tension: 0,
    },
  },
  legend: {
    display: false,
  },
  scales: {
    xAxes: [{
      gridLines: {
        display: false,
      },
      ticks: {
        maxTicksLimit: 3,
        maxRotation: 0,
        minRotation: 0,
      },
    }],
    yAxes: [{
      gridLines: {
        drawBorder: false,
      },
      ticks: {
        padding: 5,
        callback: (value) => {
          return utils.abbreviateNumber(value)
        },
        maxTicksLimit: 3,
      },
    }],
  },
  tooltips: {
    backgroundColor: utils.hexToRGBA(brandColors.offwhite, 0.9),
    titleFontFamily: "'Inter', 'sans-serif'",
    bodyFontFamily: "'Inter', 'sans-serif'",
    titleFontSize: 16,
    bodyFontSize: 15,
    titleMarginBottom: 9,
    titleFontColor: brandColors.black,
    bodyFontColor: brandColors.black,
    bodySpacing: 5,
    xPadding: 15,
    yPadding: 15,
    callbacks: {
      label(tooltipItem, chart) {
        const { value, datasetIndex } = tooltipItem
        const datasetName = chart.datasets[datasetIndex].label

        return ` ${datasetName}: ${value}`
      },
    },
  },
}

const ChartLine = ({ data, maintainAspectRatio }) => {
  const [dateLabels, setDateLabels] = React.useState([])
  const [chartDataSets, setChartDataSets] = React.useState([])
  const [chartOptions, setChartOptions] = React.useState({})

  const createChartData = (data) => {
    const { source: currentDataSource, platform: currentPlatform } = data

    // Stop if no data source
    if (! data.source) return

    // Define relevant moments
    const earliestMoment = moment(data.earliest.date, 'YYYY-MM-DD')
    const latestMoment = moment(data.mostRecent.date, 'YYYY-MM-DD')

    // Calculate granularity
    const granularity = insightsHelpers.calcGranularity(earliestMoment, latestMoment)

    // Get period dates and values from the data, based on the granularity
    const [periodDates, periodValues] = insightsHelpers.getChartData(data, granularity)

    // Cycle through the dates and add the relevant labels
    const periodLabels = insightsHelpers.getPeriodLabels(periodDates)
    setDateLabels(periodLabels)

    return {
      ...baseLineConfig,
      borderColor: brandColors[currentPlatform].bg,
      label: currentDataSource,
      data: periodValues,
    }
  }

  React.useEffect(() => {
    const chartData = data.map((dataSource) => {
      return createChartData(dataSource)
    })

    const newChartOptions = produce(baseChartConfig, (draftConfig) => {
      // Edit aspect ratio
      if (! maintainAspectRatio) {
        draftConfig.maintainAspectRatio = false
      }
    })
    setChartOptions(newChartOptions)

    setChartDataSets(chartData)
  }, [data, maintainAspectRatio])

  return (
    <Line
      data={{
        labels: dateLabels,
        datasets: chartDataSets,
      }}
      options={chartOptions}
    />
  )
}

export default ChartLine

ChartLine.propTypes = {
  data: PropTypes.array.isRequired,
  maintainAspectRatio: PropTypes.bool,
}

ChartLine.defaultProps = {
  maintainAspectRatio: false,
}
