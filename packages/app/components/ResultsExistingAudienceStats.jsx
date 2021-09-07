import React from 'react'
import PropTypes from 'prop-types'

import ResultsExistingAudienceChart from '@/app/ResultsExistingAudienceChart'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import brandColors from '@/constants/brandColors'

const ResultsExistingAudienceStats = ({ data, className }) => {
  const { ads_reach: adsReach, organic_reach: organicReach } = data
  const adsReachProportion = +(adsReach.proportion * 100).toFixed(2)
  const organicReachProportion = +(organicReach.proportion * 100).toFixed(2)
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">Existing audiences</p>
      {data ? (
        <>
          <div className="flex items-center" style={{ minHeight: '88px' }}>
            <MarkdownText
              markdown={copy.existingAudienceDescription(adsReachProportion, organicReachProportion)}
              className="sm:px-1 mr-auto sm:mr-0 mb-6 sm:mb-0 sm:text-center"
            />
          </div>
          <p
            className="text-6xl font-bold hidden sm:block"
            style={{ color: brandColors.green }}
          >
            {adsReachProportion}%
          </p>
          <ResultsExistingAudienceChart adsReachProportion={adsReachProportion} organicReachProportion={organicReachProportion} />
        </>
      ) : <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-green" />}
    </div>
  )
}

ResultsExistingAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsExistingAudienceStats.defaultProps = {
  className: '',
}

export default ResultsExistingAudienceStats
