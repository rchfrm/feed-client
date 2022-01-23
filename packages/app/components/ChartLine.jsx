import React from 'react'
import PropTypes from 'prop-types'

import { Line } from 'react-chartjs-2'

import * as utils from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

const baseLineConfig = {
  backgroundColor: 'transparent',
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
      },
    }],
  },
  tooltips: {
    backgroundColor: utils.hexToRGBA(brandColors.bgColor, 0.9),
    titleFontFamily: "'Inter', 'sans-serif'",
    bodyFontFamily: "'Inter', 'sans-serif'",
    titleFontSize: 16,
    bodyFontSize: 15,
    titleMarginBottom: 9,
    titleFontColor: brandColors.textColor,
    bodyFontColor: brandColors.textColor,
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

const ChartLine = ({ labels, data }) => {
  const [chartDataSets, setChartDataSets] = React.useState([])
  const [dateLabels, setDateLabels] = React.useState([])

  React.useEffect(() => {
    const chartData = Object.entries(data).map(([key, value]) => {
      return {
        ...baseLineConfig,
        label: value.text,
        borderColor: brandColors[key].bg,
        data: value.values,
      }
    })

    setChartDataSets(chartData)
    setDateLabels(labels)
  }, [labels, data])

  return (
    <Line
      data={{
        labels: dateLabels,
        datasets: chartDataSets,
      }}
      options={baseChartConfig}
    />
  )
}

export default ChartLine

ChartLine.propTypes = {
  labels: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
}

ChartLine.defaultProps = {
}
