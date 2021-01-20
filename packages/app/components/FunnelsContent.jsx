import React from 'react'
// import PropTypes from 'prop-types'

import ResultsSummaryText from '@/app/ResultsSummaryText'
import FunnelsSelectionButtons from '@/app/FunnelsSelectionButtons'
import FunnelView from '@/app/FunnelView'

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

const funnelHeats = [
  {
    slug: 'cold',
  },
  {
    slug: 'cool',
  },
  {
    slug: 'warm',
  },
]

const FunnelsContent = () => {
  const [activeFunnelId, setActiveFunnelId] = React.useState(funnelOptions[0].id)
  return (
    <div>
      {/* INTRO */}
      <ResultsSummaryText
        className="mb-14"
        totalEngagements={3541}
        totalVisitors={1437}
        roasMultiplier={6}
      />
      {/* CONTENT */}
      <div className="grid grid-cols-12">
        {/* SELECT FUNNEL BUTTONS */}
        <FunnelsSelectionButtons
          className="col-span-4"
          options={funnelOptions}
          activeFunnelId={activeFunnelId}
          setActiveFunnelId={setActiveFunnelId}
        />
        <FunnelView
          className="col-span-8 ml-10"
          funnel={{}}
          funnelHeats={funnelHeats}
        />
      </div>
    </div>
  )
}

// FunnelsContent.propTypes = {

// }

export default FunnelsContent
