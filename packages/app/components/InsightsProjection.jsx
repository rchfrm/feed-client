import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '@/helpers/utils'

import MarkdownText from '@/elements/MarkdownText'

import brandColors from '@/constants/brandColors'
import styles from '@/app/InsightsPage.module.css'

const buildSentence = (predicted, growth, { platform, shortTitle }) => {
  const predictedFormatted = utils.formatNumber(predicted)
  const growthType = growth >= 100 ? 'multiplier' : 'fraction'
  const growthAmount = growthType === 'multiplier' ? ((growth / 100) + 1) : growth
  const growthDecimals = growthType === 'multiplier' ? 1 : 0
  const growthFormatted = utils.formatNumber(growthAmount, { maximumFractionDigits: growthDecimals })
  // Now build the sentence
  let sentence = 'If this growth continues, in a year you will have '
  sentence += `**${predictedFormatted}** ${utils.capitalise(platform)} ${shortTitle}—that’s `
  if (growthType === 'multiplier') {
    sentence += `**${growthFormatted}x** the number today`
  } else {
    sentence += `**${growthFormatted}%** more than today.`
  }
  return sentence
}


const InsightsProjection = ({
  className,
  data,
  artistId,
  loading,
}) => {
  const [sentence, setSentence] = React.useState('')
  const [backgroundColor, setBackgroundColor] = React.useState('')
  const [textColor, setTextColor] = React.useState('')
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
    const { bg: bgColor, text: textColor } = brandColors[platform]
    setBackgroundColor(bgColor)
    setTextColor(textColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistId, data.source])

  if (loading || !sentence) return null

  return (
    <div className={[className, styles.projectionContainer].join(' ')}>
      <MarkdownText
        className={styles.projectionText}
        markdown={sentence}
        style={{ backgroundColor, color: textColor }}
      />
    </div>
  )
}

InsightsProjection.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  artistId: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

InsightsProjection.defaultProps = {
  className: '',
  loading: false,
}


export default InsightsProjection
