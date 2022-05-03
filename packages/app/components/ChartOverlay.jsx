import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '@/helpers/utils'

import styles from '@/app/InsightsPage.module.css'

const ChartOverlay = ({
  chartBarMax: chartBarMaxValue,
  chartBarMin: chartBarMinValue,
  chartBarCurrency,
  chartLineMax: chartLineMaxValue,
  chartLineMin: chartLineMinValue,
  chartLineCurrency,
  isMixedChart,
  labels,
  granularity,
}) => {
  const leftMidValue = ((chartBarMaxValue - chartBarMinValue) / 2) + chartBarMinValue
  const rightMidValue = ((chartLineMaxValue - chartLineMinValue) / 2) + chartLineMinValue

  const chartBarMax = chartBarCurrency
    ? utils.formatCurrency(Math.round(chartBarMaxValue), chartBarCurrency).replace('.00', '')
    : utils.abbreviateNumber(chartBarMaxValue)
  const chartBarMin = chartBarCurrency
    ? utils.formatCurrency(Math.round(chartBarMinValue), chartBarCurrency).replace('.00', '')
    : utils.abbreviateNumber(chartBarMinValue)
  const chartBarMid = chartBarCurrency
    ? utils.formatCurrency(Math.round(leftMidValue), chartBarCurrency).replace('.00', '')
    : utils.abbreviateNumber(leftMidValue)

  const chartLineMax = chartLineCurrency
    ? utils.formatCurrency(Math.round(chartLineMaxValue), chartLineCurrency).replace('.00', '')
    : utils.abbreviateNumber(chartLineMaxValue)
  const chartLineMin = chartLineCurrency
    ? utils.formatCurrency(Math.round(chartLineMinValue), chartLineCurrency).replace('.00', '')
    : utils.abbreviateNumber(chartLineMinValue)
  const chartLineMid = chartLineCurrency
    ? utils.formatCurrency(Math.round(rightMidValue), chartLineCurrency).replace('.00', '')
    : utils.abbreviateNumber(rightMidValue)

  const labelList = []

  labels.forEach((label, index) => {
    if (
      index === 0
      || index === labels.length - 1
      || index === Math.round((labels.length - 1) / 2)
    ) {
      const [day, month] = label.split(' ')
      const labelString = granularity === 'months' ? month : `${day} ${month}`
      labelList.push(
        <li key={label}>{labelString}</li>,
      )
    }
  })

  return (
    <>
      <div className={styles.chartOverlay}>
        <div className={styles.chartLeftMax}>{chartBarMax}</div>
        <div className={styles.chartLeftMid}>{chartBarMid}</div>
        <div className={styles.chartLeftMin}>{chartBarMin}</div>
        <ul className={styles.xAxisLabels}>{labelList}</ul>
        {isMixedChart && (
          <>
            <div className={styles.chartRightMax}>{chartLineMax}</div>
            <div className={styles.chartRightMid}>{chartLineMid}</div>
            <div className={styles.chartRightMin}>{chartLineMin}</div>
          </>
        )}
      </div>
      <div className={styles.chartBackground}>
        <div className={styles.chartMidline} />
      </div>
    </>
  )
}

ChartOverlay.propTypes = {
  chartBarMax: PropTypes.number.isRequired,
  chartBarMin: PropTypes.number.isRequired,
  chartBarCurrency: PropTypes.string.isRequired,
  chartLineMax: PropTypes.number,
  chartLineMin: PropTypes.number,
  chartLineCurrency: PropTypes.string,
  isMixedChart: PropTypes.bool,
  labels: PropTypes.array.isRequired,
  granularity: PropTypes.string.isRequired,
}

ChartOverlay.defaultProps = {
  chartLineMax: '',
  chartLineMin: '',
  chartLineCurrency: '',
  isMixedChart: false,
}

export default ChartOverlay
