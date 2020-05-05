import React from 'react'
import PropTypes from 'prop-types'

import helper from './helpers/helper'

import brandColors from '../constants/brandColors'
import styles from './InsightsPage.module.css'

const combineDailyData = (dailyData) => {
  return Object.values(dailyData).reduce((total, value) => {
    return total + value
  }, 0)
}

const ChartNumber = ({ data, artistCurrency }) => {
  // DEFINE STATES
  const [displayData, setDisplayData] = React.useState('')
  const [dataColor, setDataColor] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [subtitle, setSubtitle] = React.useState('')
  // UPDATE ON DATA CHANGE
  React.useEffect(() => {
    const { source, platform, currency, dataType } = data
    if (!source) return
    const { mostRecent: { value: mostRecentValue }, dailyData } = data
    const calculatedValue = dataType === 'daily' ? combineDailyData(dailyData) : mostRecentValue
    const color = brandColors[platform]
    const valueFormatted = currency ? helper.formatCurrency(calculatedValue, artistCurrency) : helper.abbreviateNumber(calculatedValue)
    // Set data viz
    setDisplayData(valueFormatted)
    setDataColor(color)
    // Set titles
    const title = dataType === 'daily' ? `Total ${data.shortTitle}` : data.shortTitle
    const basicSubtitle = `(${data.subtitle || data.period})`
    const subtitle = dataType === 'daily' ? `${basicSubtitle} so far` : basicSubtitle
    setTitle(title)
    setSubtitle(subtitle)
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
        <span className={styles.title}>{title} </span>
        <span className={styles.subtitle}>{subtitle}</span>
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
