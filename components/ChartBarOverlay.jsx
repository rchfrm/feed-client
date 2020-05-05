// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT HELPERS
import helper from './helpers/helper'
// IMPORT STYLES
import styles from './InsightsPage.module.css'

const ChartBarOverlay = ({ max: maxValue, min: minValue, currency, labels }) => {
  const max = helper.abbreviateNumber(maxValue)
  const min = helper.abbreviateNumber(minValue)
  const mid = helper.abbreviateNumber(((maxValue - minValue) / 2) + minValue)
  const labelPrefix = currency ? helper.getCurrencySymbol(currency) : ''

  const labelList = []

  labels.forEach((label, index) => {
    if (
      index === 0
      || index === labels.length - 1
      || index === Math.round((labels.length - 1) / 2)
    ) {
      labelList.push(
        <li key={label}>{label}</li>,
      )
    }
  })

  return (
    <>
      <div className={styles.chartOverlay}>
        <div className={styles.chartMax}>{labelPrefix}{max}</div>
        <div className={styles.chartMid}>{labelPrefix}{mid}</div>
        <div className={styles.chartMin}>{labelPrefix}{min}</div>
        <ul className={styles.xAxisLabels}>{labelList}</ul>
      </div>
      <div className={styles.chartBackground}>
        <div className={styles.chartMidline} />
      </div>
    </>
  )
}

export default ChartBarOverlay
