import React from 'react'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import TargetingInterestsListItem from '@/app/TargetingInterestsListItem'

const TargetingInterestsList = () => {
  const { targetingState } = React.useContext(TargetingContext)

  const interests = targetingState.interests || []

  if (interests.length === 0) {
    return <p className="mb-8 font-bold italic">No interests added yet.</p>
  }

  return (
    <ul className="flex flex-wrap">
      {interests.map(({ name, platformId, isActive }, index) => {
        if (! isActive) {
          return null
        }
        return (
          <TargetingInterestsListItem
            key={platformId}
            name={name}
            index={index}
          />
        )
      })}
    </ul>
  )
}

export default TargetingInterestsList
