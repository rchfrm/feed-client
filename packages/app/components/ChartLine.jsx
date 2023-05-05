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
import { formatCurrency } from '@/helpers/utils'
import brandColors from '@/constants/brandColors'

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
  primaryData,
  secondaryData,
  projections,
  currency,
}) => {
  const primaryDataValues = Object.values(primaryData)
  const secondaryDataValues = Object.values(secondaryData)
  const minValue = Math.min(...primaryDataValues)
  const maxValue = Math.max(...primaryDataValues)
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
            const label = [
              `Date: ${moment(context.label).format('DD MMM YYYY')}`,
              `Followers: ${context.formattedValue}`,
            ]
            const adSpend = secondaryDataValues[context.dataIndex]

            if (adSpend && context.dataset.title !== 'projection') {
              label.push(`Ad spend: ${formatCurrency(adSpend, currency)}`)
            }

            return label
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

  const projectionDataSets = projections.filter((p) => p !== undefined)
    .map((projection) => {
      const dailyProjections = {
        minProjection: projection.minProjection,
      }
      if (projection.maxProjection) {
        dailyProjections.maxProjection = projection.maxProjection
      }
      return Object.entries(dailyProjections).map(([key, value], index, projection) => {
        const isOneProjection = projection.length === 1
        return {
          data: value,
          title: 'projection',
          showLine: isOneProjection,
          ...(key === 'minProjection' && {
            fill: '+1',
            backgroundColor: 'rgba(250, 84, 80, 0.4)',
          }),
          ...(isOneProjection && {
            borderColor: brandColors.red,
            borderDash: [5, 2],
            borderWidth: 2,
          }),
        }
      })
    }).flat()

  const dataSets = [
    {
      data: primaryData,
      segment: {
        borderColor: (context) => (secondaryDataValues[context.p0DataIndex] ? brandColors.green : brandColors.red),
      },
    },
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
  primaryData: PropTypes.object.isRequired,
  secondaryData: PropTypes.object.isRequired,
  projections: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
}

export default ChartLine
