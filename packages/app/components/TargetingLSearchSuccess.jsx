import React from 'react'
import PropTypes from 'prop-types'
import TickCircleIcon from '@/icons/TickCircleIcon'
import brandColors from '@/constants/brandColors'

const TargetingSearchSuccess = ({ name, type, setValue }) => {
  const resetSavedLocation = () => {
    setValue(null)
  }

  return (
    <div className="flex items-center">
      <TickCircleIcon
        fill={brandColors.green}
        className="mr-2"
      />
      <button onClick={resetSavedLocation} className="text-left">{name} added!
        <span className="ml-1 underline">Add another {type}?</span>
      </button>
    </div>
  )
}

TargetingSearchSuccess.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
}

export default TargetingSearchSuccess
