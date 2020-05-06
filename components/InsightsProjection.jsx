import React from 'react'
import PropTypes from 'prop-types'

import tinycolor from 'tinycolor2'

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
    const { platform, shortTitle, projection, source } = data
    console.log('source', source)
    console.log('projection', projection)
    if (!projection) {
      setSentence('')
      return
    }
    const { annualized: { change, growth } } = projection
    if (growth <= 0) {
      setSentence('')
      return
    }
    const newSentence = `If you keep up your recent trend, in a year you’ll add **+${change}** ${platform} ${shortTitle}—that’s **+${growth}%**. Nice one!`
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
