import React from 'react'
import PropTypes from 'prop-types'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import TargetingInterestsListItem from '@/app/TargetingInterestsListItem'

const TargetingInterestsList = ({ platform }) => {
  const { targetingState } = React.useContext(TargetingContext)
  const interests = targetingState.interests.filter((interest) => interest.isActive && interest.platform === platform) || []

  if (interests.length === 0) {
    return <p className="mb-8 font-bold italic">No interests added yet.</p>
  }

  return (
    <ul className="flex flex-wrap">
      {interests.map(({ name, platformId }) => {
        return (
          <TargetingInterestsListItem
            key={platformId}
            name={name}
            id={platformId}
          />
        )
      })}
    </ul>
  )
}

TargetingInterestsList.propTypes = {
  platform: PropTypes.string.isRequired,
}

export default TargetingInterestsList
