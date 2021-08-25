import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import brandColors from '@/constants/brandColors'

const ResultsOnPlatformAudienceSizeStats = ({ data, className }) => {
  const { on_platform: { audience_size: audienceSize } } = data
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">New people</p>
      <MarkdownText
        markdown={copy.audienceSizeDescription(audienceSize.growth.percentage * 100)}
        className="mr-auto sm:mr-0 sm:text-center"
      />
      <p
        className="text-6xl font-bold hidden sm:block"
        style={{ color: brandColors.blue }}
      >
        <span style={{ color: brandColors.blue }}>+</span>
        {audienceSize.growth.absolute}
      </p>
    </div>
  )
}

ResultsOnPlatformAudienceSizeStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsOnPlatformAudienceSizeStats.defaultProps = {
  className: '',
}

export default ResultsOnPlatformAudienceSizeStats
