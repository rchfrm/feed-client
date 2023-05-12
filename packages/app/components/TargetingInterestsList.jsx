import React from 'react'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import TargetingInterestsListItem from '@/app/TargetingInterestsListItem'

const TargetingInterestsList = () => {
  const { targetingState: { interests } } = React.useContext(TargetingContext)

  return (
    <ul className="flex flex-wrap">
      {interests.map(({ name, id }) => {
        return (
          <TargetingInterestsListItem
            key={id}
            name={name}
            id={id}
          />
        )
      })}
    </ul>
  )
}

export default TargetingInterestsList
