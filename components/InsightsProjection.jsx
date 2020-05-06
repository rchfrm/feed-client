import React from 'react'
import PropTypes from 'prop-types'

import tinycolor from 'tinycolor2'

import helper from './helpers/helper'

import MarkdownText from './elements/MarkdownText'

import brandColors from '../constants/brandColors'
import styles from './InsightsPage.module.css'


const InsightsProjection = ({
  data,
  artistId,
  loading,
}) => {
  const [sentence, setSentence] = React.useState('')
  const [backgroundColor, setBackgroundColor] = React.useState('')
  React.useEffect(() => {
    const { projection, cumulative, platform, shortTitle } = data
    // If no projection or not cumulative, stop here
    if (!projection || !cumulative) return setSentence('')
    const { annualized: { change, growth }, data: projectionData } = projection
    // Stop here if negative growth
    if (growth <= 0) return setSentence('')
    const { value: currentValue } = Object.values(projectionData)[0]
    const futureValue = currentValue + change
    const futureValueFormatted = helper.formatNumber(futureValue)
    const percentageChange = helper.formatNumber(
      (((futureValue - currentValue) / currentValue) * 100),
      { maximumFractionDigits: 0 },
    )
    const newSentence = `If you keep growing at this rate, in a year you will have **${futureValueFormatted}** ${platform} ${shortTitle}—that’s **+${percentageChange}%**`
    setSentence(newSentence)
    const color = brandColors[platform]
    const lightColor = tinycolor(color).lighten('20').toString()
    setBackgroundColor(lightColor)
  }, [artistId, data.source])

  if (loading || !sentence) return null

  return (
    <div className={['ninety-wide', styles.projectionContainer].join(' ')}>
      <MarkdownText
        className={['h3--text', styles.projectionText].join(' ')}
        markdown={sentence}
        style={{ backgroundColor }}
      />
    </div>
  )
}

InsightsProjection.propTypes = {
  data: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

InsightsProjection.defaultProps = {
  loading: false,
}


export default InsightsProjection
