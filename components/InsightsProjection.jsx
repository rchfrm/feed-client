import React from 'react'
import PropTypes from 'prop-types'

import tinycolor from 'tinycolor2'

import helper from './helpers/helper'

import MarkdownText from './elements/MarkdownText'

import brandColors from '../constants/brandColors'
import styles from './InsightsPage.module.css'

const buildSentence = (predicted, growth, { platform, shortTitle }) => {
  const predictedFormatted = helper.formatNumber(predicted)
  const growthType = growth >= 100 ? 'multiplier' : 'fraction'
  const growthAmount = growthType === 'multiplier' ? ((growth / 100) + 1) : growth
  const growthDecimals = growthType === 'multiplier' ? 1 : 0
  const growthFormatted = helper.formatNumber(growthAmount, { maximumFractionDigits: growthDecimals })
  // Now build the sentence
  let sentence = 'If this growth continues, in a year you will have '
  sentence += `**${predictedFormatted}** ${platform} ${shortTitle}—that’s `
  if (growthType === 'multiplier') {
    sentence += `**${growthFormatted}x** the size it is now`
  } else {
    sentence += `**${growthFormatted}%** more than today`
  }
  return sentence
}


const InsightsProjection = ({
  data,
  artistId,
  loading,
}) => {
  const [sentence, setSentence] = React.useState('')
  const [backgroundColor, setBackgroundColor] = React.useState('')
  React.useEffect(() => {
    const { projection, cumulative, platform } = data
    // If no projection or not cumulative, stop here
    if (!projection || !cumulative) return setSentence('')
    const { annualized: { predicted, growth } } = projection
    // Stop here if negative growth
    if (growth <= 0) return setSentence('')
    // Build and set sentence
    const newSentence = buildSentence(predicted, growth, data)
    setSentence(newSentence)
    // Set color
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
