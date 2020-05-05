import React from 'react'
import PropTypes from 'prop-types'

import helper from './helpers/helper'

import brandColors from '../constants/brandColors'
import styles from './InsightsPage.module.css'

const ChartNumber = ({ data, artistCurrency }) => {
  // DEFINE STATES
  const [displayData, setDisplayData] = React.useState('')
  const [dataColor, setDataColor] = React.useState('')
  // UPDATE ON DATA CHANGE
  React.useEffect(() => {
    console.log('data', data)
    const { source, platform, currency } = data
    if (!source) return
    const { mostRecent: { value } } = data
    const color = brandColors[platform]
    const valueFormatted = currency ? helper.formatCurrency(value, artistCurrency) : helper.abbreviateNumber(value)
    setDisplayData(valueFormatted)
    setDataColor(color)
  }, [data.source])
  return (
    <div className={styles.chartNumber__container}>
      <p
        className={styles.chartNumber__number}
        style={{ color: dataColor }}
      >
        {displayData}
      </p>
      <p className={styles.chartNumber__title}>
        <span className={styles.title}>{data.shortTitle}</span>
        <span className={styles.subtitle}> ({data.subtitle || data.period})</span>
      </p>
    </div>
  )
}

ChartNumber.propTypes = {
  data: PropTypes.object,
  artistCurrency: PropTypes.string.isRequired,
}

ChartNumber.defaultProps = {
  data: {},
}


export default ChartNumber
