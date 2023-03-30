import React from 'react'
import PropTypes from 'prop-types'
import MarkdownText from '@/elements/MarkdownText'

const ResultsChartHeader = ({ description }) => {
  return (
    <div className="w-full rounded-dialogue mb-4 p-5 bg-green-bg-light">
      <MarkdownText markdown={description} className="text-xl mb-2" />
      <p className="mb-0 text-xs text-green-dark">Based on Feed campaign from 14 October to 10 December 2022</p>
    </div>
  )
}

ResultsChartHeader.propTypes = {
  description: PropTypes.string.isRequired,
}

export default ResultsChartHeader
