import React from 'react'
import PropTypes from 'prop-types'

import PromotePostsButton from './PromotePostsButton'
import MarkdownText from './elements/MarkdownText'
import copy from '../copy/ResultsPageCopy'

const ResultsNoResults = ({ dailyBudget }) => {
  if (dailyBudget > 0) {
    return (
      <div
        className="fill-height ninety-wide"
        style={{ justifyContent: 'initial' }}
      >
        <MarkdownText className="h4--text" markdown={copy.noResultsWithBudget} />
      </div>
    )
  }

  return (
    <div
      className="fill-height"
      style={{ justifyContent: 'space-between' }}
    >
      <MarkdownText className="ninety-wide" markdown={copy.noResultsNoBudget} />
      <PromotePostsButton dailyBudget={dailyBudget} />
    </div>
  )
}

ResultsNoResults.propTypes = {
  dailyBudget: PropTypes.number,
}

ResultsNoResults.defaultProps = {
  dailyBudget: 0,
}


export default ResultsNoResults
