import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/ResultsPageCopy'

import brandColors from '@/constants/brandColors'

const ResultsUnawareAudienceStats = ({ data, className }) => {
  const { engaged } = data
  return (
    <div
      className={[
        className,
      ].join(' ')}
    >
      <p className="font-bold text-xl text-left mr-auto sm:mr-0">New people</p>
      <MarkdownText
        markdown={copy.unawareAudienceDescription(engaged.growth.absolute)}
        className="mr-auto sm:mr-0 sm:text-center"
      />
      <p
        className="text-6xl font-bold hidden sm:block"
        style={{ color: brandColors.blue }}
      >
        <span style={{ color: brandColors.blue }}>+</span>
        {engaged.growth.absolute}
      </p>
    </div>
  )
}

ResultsUnawareAudienceStats.propTypes = {
  data: PropTypes.object.isRequired,
  className: PropTypes.string,
}

ResultsUnawareAudienceStats.defaultProps = {
  className: '',
}

export default ResultsUnawareAudienceStats
