import React from 'react'
import PropTypes from 'prop-types'
import produce from 'immer'
import { TargetingContext } from '@/app/contexts/TargetingContext'
import TrashIcon from '@/icons/TrashIcon'

const TargetingInterestsListItem = ({ name, id, index }) => {
  const { setTargetingState } = React.useContext(TargetingContext)

  const remove = () => {
    setTargetingState((targetingState) => {
      return produce(targetingState, (draftState) => {
        draftState.interests[index].isActive = false
      })
    })
  }

  return (
    <li
      key={id}
      className="flex items-center mr-2 mb-2 py-1 px-3 bg-yellow text-sm rounded-full font-bold"
    >
      {name}
      <button onClick={() => remove(id)} className="ml-2">
        <TrashIcon className="w-4 h-auto" />
      </button>
    </li>
  )
}

TargetingInterestsListItem.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}

export default TargetingInterestsListItem
