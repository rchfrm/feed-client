import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import 'chartjs-adapter-moment'
import { Line } from 'react-chartjs-2'
import brandColors from '@/constants/brandColors'
import { getProjection, makeLabel } from '@/app/helpers/resultsHelpers'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  Filler,
)

const ChartLine = ({
  data,
  currency,
}) => {
  const minValues = []
  const maxValues = []
  const projectionDataSets = []

  data.forEach((x) => {
    const primaryValues = Object.values(x.primaryData)
    minValues.push(Math.min(...primaryValues))
    maxValues.push(Math.max(...primaryValues))

    if (x.projections.length > 0) {
      const projection = getProjection(x.projections)

      projectionDataSets.push(...projection)
    }
  })

  const minValue = Math.min(...minValues)
  const maxValue = Math.max(...maxValues)
  const buffer = Math.round((maxValue - minValue) / 10)

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 10,
        backgroundColor: brandColors.black,
        displayColors: false,
        yAlign: 'bottom',
        callbacks: {
          title: () => null,
          label: (context) => {
            if (context.datasetIndex === 0) {
              return makeLabel(context, data[0], currency)
            }
            
            return makeLabel(context, context.dataset.title === 'projection' ? data[0] : data[1], currency)
          },
        },
      },
    },
    elements: {
      point: {
        pointStyle: 'circle',
        backgroundColor: brandColors.white,
        borderColor: brandColors.black,
        hitRadius: 3,
        hoverBorderWidth: 2,
        pointRadius: 0,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          color: brandColors.black,
          precision: 0,
          callback: (value) => {
            return [moment(value).format('D MMM'), moment(value).format('YY')]
          },
        },
        type: 'time',
      },
      y: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          padding: 10,
          color: brandColors.black,
          precision: 0,
        },
        suggestedMin: minValue - buffer,
        suggestedMax: maxValue + buffer,
      },
    },
  }

  const mainDataSets = data.map(({ primaryData, secondaryData, color}) => {
    return {
      data: primaryData,
      segment: {
        borderColor: (context) => secondaryData ? Object.values(secondaryData)[context.p0DataIndex] ? color.primary : color.secondary : color.primary,
      },
    }
  })

  const dataSets = [
    ...mainDataSets,
    ...projectionDataSets,
  ]

  return (
    <Line
      data={{
        datasets: dataSets,
      }}
      options={options}
    />
  )
}

ChartLine.propTypes = {
  data: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
}

export default ChartLine
