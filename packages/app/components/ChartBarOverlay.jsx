// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
// IMPORT STYLES
import styles from '@/app/InsightsPage.module.css'

const ChartBarOverlay = ({
  leftMax: leftMaxValue,
  leftMin: leftMinValue,
  leftCurrency,
  rightMax: rightMaxValue,
  rightMin: rightMinValue,
  rightCurrency,
  isMixedChart,
  labels,
  granularity,
}) => {
  const leftMidValue = ((leftMaxValue - leftMinValue) / 2) + leftMinValue
  const rightMidValue = ((rightMaxValue - rightMinValue) / 2) + rightMinValue

  const leftMax = leftCurrency
    ? utils.formatCurrency(Math.round(leftMaxValue), leftCurrency).replace('.00', '')
    : utils.abbreviateNumber(leftMaxValue)
  const leftMin = leftCurrency
    ? utils.formatCurrency(Math.round(leftMinValue), leftCurrency).replace('.00', '')
    : utils.abbreviateNumber(leftMinValue)
  const leftMid = leftCurrency
    ? utils.formatCurrency(Math.round(leftMidValue), leftCurrency).replace('.00', '')
    : utils.abbreviateNumber(leftMidValue)

  const rightMax = rightCurrency
    ? utils.formatCurrency(Math.round(rightMaxValue), rightCurrency).replace('.00', '')
    : utils.abbreviateNumber(rightMaxValue)
  const rightMin = rightCurrency
    ? utils.formatCurrency(Math.round(rightMinValue), rightCurrency).replace('.00', '')
    : utils.abbreviateNumber(rightMinValue)
  const rightMid = rightCurrency
    ? utils.formatCurrency(Math.round(rightMidValue), rightCurrency).replace('.00', '')
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
        <div className={styles.chartLeftMax}>{leftMax}</div>
        <div className={styles.chartLeftMid}>{leftMid}</div>
        <div className={styles.chartLeftMin}>{leftMin}</div>
        <ul className={styles.xAxisLabels}>{labelList}</ul>
        {isMixedChart && (
          <>
            <div className={styles.chartRightMax}>{rightMax}</div>
            <div className={styles.chartRightMid}>{rightMid}</div>
            <div className={styles.chartRightMin}>{rightMin}</div>
          </>
        )}
      </div>
      <div className={styles.chartBackground}>
        <div className={styles.chartMidline} />
      </div>
    </>
  )
}

export default ChartBarOverlay
