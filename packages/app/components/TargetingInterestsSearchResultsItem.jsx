import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import { formatInterestSearchResponse } from '@/app/helpers/targetingHelpers'

const TargetingInterestsSearchResultsItem = ({ item: interest, onClick: setInterest }) => {
  const [interestAlreadyExists, setInterestAlreadyExists] = React.useState(false)
  const { name } = interest
  const platform = 'meta'

  const { targetingState, setTargetingState } = React.useContext(TargetingContext)

  const updateTargetingState = (interest) => {
    const formattedInterest = formatInterestSearchResponse(interest, platform)

    setTargetingState((targetingState) => {
      return produce(targetingState, (draftState) => {
        draftState.interests.push(formattedInterest)
      })
    })

    setInterest(formattedInterest)
  }

  const checkIfInterestAlreadyExists = (interest) => {
    return targetingState.interests.some(({ id }) => id === interest.id)
  }

  const saveInterest = () => {
    const interestExists = checkIfInterestAlreadyExists(interest)

    if (interestExists) {
      setInterestAlreadyExists(true)
      return
    }

    updateTargetingState(interest)
  }

  return (
    <li className="mb-3 pl-12">
      <button onClick={saveInterest} className="flex items-center text-left">
        <span className="font-bold underline">{name}</span>
        {interestAlreadyExists && <span className="ml-3 text-xs text-green">Already exists!</span>}
      </button>
    </li>
  )
}

TargetingInterestsSearchResultsItem.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TargetingInterestsSearchResultsItem
