import React from 'react'
import PropTypes from 'prop-types'

import DataDetails from '@/admin/elements/DataDetails'

const propsToDisplay = [
  'id',
  'object_type',
  'call_to_action_type',
  'effective_instagram_story_id',
]

const TournamentAdCreative = ({ adCreative }) => {
  return (
    <DataDetails propsToDisplay={propsToDisplay} data={adCreative} header="Ad Creative" />
  )
}

TournamentAdCreative.propTypes = {
  adCreative: PropTypes.object.isRequired,
}

export default TournamentAdCreative
