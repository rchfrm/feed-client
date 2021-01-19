import React from 'react'
// import PropTypes from 'prop-types'

import ResultsSummaryText from '@/app/ResultsSummaryText'

const FunnelsContent = () => {
  return (
    <div>
      {/* INTRO */}
      <ResultsSummaryText
        totalEngagements={3541}
        totalVisitors={1437}
        roasMultiplier={6}
      />
    </div>
  )
}

// FunnelsContent.propTypes = {
  
// }

export default FunnelsContent
