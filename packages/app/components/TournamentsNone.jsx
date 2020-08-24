import React from 'react'
import PropTypes from 'prop-types'

import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/tournamentsCopy'

const TournamentsNone = ({ tournamentType }) => {
  const markdown = copy.noTournaments(tournamentType)
  return (
    <div className={[].join(' ')}>
      <MarkdownText
        className={[
          'h4--text',
          'mt-10',
          'bg-grey-1', 'rounded-dialogue', 'p-5 pt-4',
        ].join(' ')}
        markdown={markdown}
      />
    </div>
  )
}

TournamentsNone.propTypes = {
  tournamentType: PropTypes.string.isRequired,
}

export default TournamentsNone
