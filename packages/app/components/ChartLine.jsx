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
)

const ChartLine = ({
  data,
  currency,
}) => {
  const primaryData = data[0]
  const secondaryData = Object.values(data[1])

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
            const label = [`Followers: ${context.formattedValue}`]
            const adSpend = secondaryData[context.dataIndex]

            if (adSpend) {
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
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          color: brandColors.black,
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
        },
      },
    },
  }

  const dataSets = [{
    data: primaryData,
    segment: {
      borderColor: (context) => (secondaryData[context.p0DataIndex] ? brandColors.green : brandColors.red),
    },
    maintainAspectRatio: true,
    pointRadius: 0,
  }]

  return (
    <Line
      data={{
        datasets: dataSets,
      }}
      options={options}
      className="mb-10"
    />
  )
}

ChartLine.propTypes = {
  data: PropTypes.array.isRequired,
  currency: PropTypes.string.isRequired,
}

export default ChartLine
