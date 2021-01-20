import React from 'react'
// import PropTypes from 'prop-types'

import ResultsSummaryText from '@/app/ResultsSummaryText'
import FunnelsSelectionButtons from '@/app/FunnelsSelectionButtons'

const funnelOptions = [
  {
    title: 'Posts',
    id: 'posts',
  },
  {
    title: 'Stories',
    id: 'storie',
  },
]

const FunnelsContent = () => {
  const [activeFunnelId, setActiveFunnelId] = React.useState(funnelOptions[0].id)
  return (
    <div>
      {/* INTRO */}
      <ResultsSummaryText
        totalEngagements={3541}
        totalVisitors={1437}
        roasMultiplier={6}
      />
      {/* SELECT FUNNEL BUTTONS */}
      <FunnelsSelectionButtons
        options={funnelOptions}
        activeFunnelId={activeFunnelId}
        setActiveFunnelId={setActiveFunnelId}
        className=""
      />
    </div>
  )
}

// FunnelsContent.propTypes = {
  
// }

export default FunnelsContent
