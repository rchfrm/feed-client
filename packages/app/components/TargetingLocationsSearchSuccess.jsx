import React from 'react'
import PropTypes from 'prop-types'

import TickCircleIcon from '@/icons/TickCircleIcon'

import brandColors from '@/constants/brandColors'

const TargetingLocationsSearchSuccess = ({ name, setLocation }) => {
  const resetSavedLocation = () => {
    setLocation(null)
  }

  return (
    <div className="flex items-center">
      <TickCircleIcon
        fill={brandColors.green}
        className="mr-2"
      />
      <button onClick={resetSavedLocation} className="text-left">{name} added!<span className="ml-1 underline">Add another location?</span></button>
    </div>
  )
}

TargetingLocationsSearchSuccess.propTypes = {
  name: PropTypes.string.isRequired,
  setLocation: PropTypes.func.isRequired,
}

TargetingLocationsSearchSuccess.defaultProps = {
}

export default TargetingLocationsSearchSuccess
