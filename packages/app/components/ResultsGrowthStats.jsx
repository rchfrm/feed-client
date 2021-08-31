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
      <MarkdownText
        markdown={copy.audienceSizeDescription(audienceSize.growth.percentage * 100)}
        className="sm:px-2 mr-auto sm:mr-0 sm:text-center"
      />
      <p
        className="text-6xl font-bold hidden sm:block"
        style={{ color: brandColors.blue }}
      >
        <span style={{ color: brandColors.facebook.bg }}>+</span>
        {abbreviateNumber(audienceSize.growth.absolute)}
      </p>
      <ResultsGrowthStatsChart audienceSize={audienceSize} />
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
