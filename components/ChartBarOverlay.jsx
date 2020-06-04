// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT HELPERS
import * as utils from '@/helpers/utils'
// IMPORT STYLES
import styles from '@/InsightsPage.module.css'

const ChartBarOverlay = ({ max: maxValue, min: minValue, currency, labels }) => {
  const midValue = ((maxValue - minValue) / 2) + minValue
  const max = currency
    ? utils.formatCurrency(Math.round(maxValue), currency).replace('.00', '')
    : utils.abbreviateNumber(maxValue)
  const min = currency
    ? utils.formatCurrency(Math.round(minValue), currency).replace('.00', '')
    : utils.abbreviateNumber(minValue)
  const mid = currency
    ? utils.formatCurrency(Math.round(midValue), currency).replace('.00', '')
    : utils.abbreviateNumber(midValue)

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
        <div className={styles.chartMax}>{max}</div>
        <div className={styles.chartMid}>{mid}</div>
        <div className={styles.chartMin}>{min}</div>
        <ul className={styles.xAxisLabels}>{labelList}</ul>
      </div>
      <div className={styles.chartBackground}>
        <div className={styles.chartMidline} />
      </div>
    </>
  )
}

export default ChartBarOverlay
