import React from 'react'
import PropTypes from 'prop-types'

import PromotePostsButton from '@/PromotePostsButton'
import MarkdownText from '@/elements/MarkdownText'
import copy from '@/copy/ResultsPageCopy'

const ResultsNoResults = ({ artist }) => {
  if (artist.daily_budget > 0) {
    return (
      <div className="fill-height">
        <MarkdownText className="h4--text" markdown={copy.noResultsWithBudget} />
      </div>
    )
  }

  return (
    <div className="fill-height">
      <MarkdownText className="h4--text" markdown={copy.noResultsNoBudget} />
      <PromotePostsButton
        artist={artist}
        artistId={artist.id}
      />
    </div>
  )
}

ResultsNoResults.propTypes = {
  artist: PropTypes.object,
}

ResultsNoResults.defaultProps = {
  artist: {},
}

export default ResultsNoResults
