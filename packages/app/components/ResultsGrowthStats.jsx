import React from 'react'
import PropTypes from 'prop-types'

import ResultsGrowthStatsChart from '@/app/ResultsGrowthStatsChart'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import { abbreviateNumber } from '@/helpers/utils'

import brandColors from '@/constants/brandColors'

const ResultsGrowthStats = ({ data, className }) => {
  const { on_platform: { audience_size: audienceSize } } = data
  return (
    <div
      className={[
        className,
        'mb-10',
      ].join(' ')}
    >
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">New people</p>
      {data ? (
        <>
          <div className="flex items-center" style={{ minHeight: '88px' }}>
            <MarkdownText
              markdown={copy.audienceSizeDescription(audienceSize.growth.percentage * 100)}
              className="sm:px-1 mr-auto sm:mr-0 mb-0 sm:text-center"
            />
          </div>
          <p
            className="text-6xl font-bold hidden sm:block"
            style={{ color: brandColors.blue }}
          >
            <span style={{ color: brandColors.facebook.bg }}>+</span>
            {abbreviateNumber(audienceSize.growth.absolute)}
          </p>
          <ResultsGrowthStatsChart audienceSize={audienceSize} />
        </>
      ) : <MarkdownText markdown={copy.statsNoData} className="mt-10 px-16 text-center text-xl text-blue" />}
    </div>
  )
}

ResultsGrowthStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsGrowthStats.defaultProps = {
  className: '',
}

export default ResultsGrowthStats
