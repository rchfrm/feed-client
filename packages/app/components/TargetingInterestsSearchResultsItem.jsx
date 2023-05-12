import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingInterestsSearchResultsItem = ({ item: interest, onClick: setInterest }) => {
  const [interestAlreadyExists, setInterestAlreadyExists] = React.useState(false)
  const { name } = interest

  const { targetingState, setTargetingState } = React.useContext(TargetingContext)

  const updateTargetingState = (interest) => {
    setTargetingState((targetingState) => {
      return produce(targetingState, (draftState) => {
        draftState.interests.push(interest)
      })
    })
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
    setInterest(interest)
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
