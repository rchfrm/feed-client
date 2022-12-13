import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '@/helpers/utils'

import Spinner from '@/elements/Spinner'

import brandColors from '@/constants/brandColors'
import styles from '@/app/InsightsPage.module.css'

const combineDailyData = (dailyData) => {
  return Object.values(dailyData).reduce((total, value) => {
    return total + value
  }, 0)
}

const ChartNumber = ({
  data,
  artistId,
  artistCurrency,
  loading,
}) => {
  // DEFINE STATES
  const [displayData, setDisplayData] = React.useState('')
  const [dataColor, setDataColor] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [subtitle, setSubtitle] = React.useState('')
  // UPDATE ON DATA CHANGE
  React.useEffect(() => {
    if (loading) {
      if (title) return
      setDisplayData('***')
      setTitle('loading')
      setSubtitle('')
      return
    }
    const { source, platform, currency, dataType } = data
    if (! source) return
    const { mostRecent: { value: mostRecentValue }, dailyData } = data
    const calculatedValue = dataType === 'daily' ? combineDailyData(dailyData) : mostRecentValue
    const { bg: color } = brandColors[platform]
    const valueFormatted = currency ? utils.formatCurrency(calculatedValue, artistCurrency) : utils.abbreviateNumber(calculatedValue)
    // Set data viz
    setDisplayData(valueFormatted)
    setDataColor(color)
    // Set titles
    const newTitle = dataType === 'daily' ? `Total ${data.shortTitle}` : data.shortTitle
    const basicSubtitle = `(${data.subtitle || data.period})`
    const newSubtitle = dataType === 'daily' ? `${basicSubtitle} so far` : basicSubtitle
    setTitle(newTitle)
    setSubtitle(newSubtitle)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.source, artistId])

  const classes = [styles.chartNumber__container]
  if (loading) {
    classes.push(styles._loading)
  }
  return (
    <div className={classes.join(' ')}>
      {loading && <Spinner className={styles.chartNumber__spinner} />}
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
  artistId: PropTypes.string.isRequired,
  artistCurrency: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

ChartNumber.defaultProps = {
  data: {},
  loading: false,
}


export default ChartNumber
