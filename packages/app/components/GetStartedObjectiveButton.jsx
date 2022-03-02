import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'
import ArrowAltIcon from '@/icons/ArrowAltIcon'

const GetStartedObjectiveButton = ({ objective, setSelectedObjective }) => {
  const { title, value, color } = objective

  return (
    <Button
      key={value}
      version={color}
      onClick={() => setSelectedObjective(value)}
      className="w-full xs:w-1/3 mx-0 mb-4 xs:mx-4 xs:mb-0"
      trackComponentName="GetStartedObjectiveButton"
    >
      {title}
      <ArrowAltIcon
        className="ml-3"
        direction="right"
        fill="white"
      />
    </Button>
  )
}

GetStartedObjectiveButton.propTypes = {
  objective: PropTypes.object.isRequired,
  setSelectedObjective: PropTypes.func.isRequired,
}

GetStartedObjectiveButton.defaultProps = {
}

export default GetStartedObjectiveButton
