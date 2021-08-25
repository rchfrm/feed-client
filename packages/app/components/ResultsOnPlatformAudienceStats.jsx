import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import brandColors from '@/constants/brandColors'

const ResultsOnPlatformAudienceStats = ({ data, className }) => {
  const { ads_reach: adsReach, organic_reach: organicReach } = data
  const adsReachProportion = adsReach.proportion * 100
  const organicReachProportion = organicReach.proportion * 100
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">Existing audiences</p>
      <MarkdownText
        markdown={copy.onPlatformAudienceDescription(adsReachProportion, organicReachProportion)}
        className="mr-auto sm:mr-0 sm:text-center"
      />
      <p
        className="text-6xl font-bold hidden sm:block"
        style={{ color: brandColors.green }}
      >
        {adsReachProportion}%
      </p>
    </div>
  )
}

ResultsOnPlatformAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsOnPlatformAudienceStats.defaultProps = {
  className: '',
}

export default ResultsOnPlatformAudienceStats
