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
import * as insightsHelpers from '@/app/helpers/insightsHelpers'
import brandColors from '@/constants/brandColors'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
)

const ChartLine = ({
  data,
  adSpend,
  currency,
}) => {
  const baseConfig = {
    maintainAspectRatio: true,
    pointRadius: 0,
  }

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
            return formatCurrency(adSpend[context.dataIndex], currency)
          }
        }
      },
    },
    elements: {
      point: {
        pointStyle: 'circle',
        backgroundColor: brandColors.white,
        borderColor: brandColors.black,
        hitRadius: 3,
        hoverBorderWidth: 2,
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 0,
          color: brandColors.black,
        },
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'D MMM YY'
        }
        },
      },
      y: {
        grid: {
          drawTicks: false,
        },
        ticks: {
          padding: 10,
          color: brandColors.black,
        }
      },
    },
  }

  const dataSets = [{
    ...baseConfig,
    data: data.dailyData,
    segment: {
      borderColor: (context) => adSpend[context.p0DataIndex] ? brandColors.green : brandColors.red,
    },

  }]

  return (
    <Line
      data={{
        datasets: dataSets,
      }}
      options={options}
    />
  )
}

export default ChartLine

ChartLine.propTypes = {
  data: PropTypes.array.isRequired,
}
