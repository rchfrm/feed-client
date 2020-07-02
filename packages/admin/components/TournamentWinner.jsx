import React from 'react'
import PropTypes from 'prop-types'

import DataDetail from '@/admin/elements/DataDetail'
import DataDetails from '@/admin/elements/DataDetails'

const propsToDisplay = [
  'engagement_score',
  'spend_adjusted_engagement_score',
  'streak',
]

const summaryProps = [
  'spend',
  'outbound_clicks.outbound_click',
  'video_thruplay_watched_actions.video_view',
]

const summaryActionProps = [
  'link_click',
  'page_engagement',
  'post_engagement',
  'video_view',
]

const TournamentWinner = ({ winner, winningAdId, className }) => {
  return (
    <div className={[className].join(' ')}>
      <h4>
        <span className="text-green">☆</span>
        <strong> Tournament Winner </strong>
        <span className="text-green">☆</span>
      </h4>
      <DataDetail name="Winning Ad ID" value={winningAdId} />
      <DataDetails propsToDisplay={propsToDisplay} data={winner} />
      {winner.summary && (
        <DataDetails propsToDisplay={summaryProps} data={winner.summary} />
      )}
      {winner.summary && winner.summary.actions && (
        <DataDetails propsToDisplay={summaryActionProps} data={winner.summary.actions} />
      )}
    </div>
  )
}

TournamentWinner.propTypes = {
  winner: PropTypes.object.isRequired,
  winningAdId: PropTypes.string,
  className: PropTypes.string,
}

TournamentWinner.defaultProps = {
  winningAdId: '',
  className: '',
}


export default TournamentWinner
