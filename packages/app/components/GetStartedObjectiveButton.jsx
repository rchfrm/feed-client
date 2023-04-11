import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import PlatformIcon from '@/icons/PlatformIcon'
import ArrowIcon from '@/icons/ArrowIcon'

const GetStartedObjectiveButton = ({ platform, setSelectedPlatform }) => {
  const { name, value } = platform

  return (
    <Button
      className="first:mr-12"
      version="secondary"
      onClick={() => setSelectedPlatform(value)}
      trackComponentName="GetStartedObjectiveButton"
    >
      <PlatformIcon
        platform={value}
        className="w-5 h-auto mr-2"
        title={value}
      />
      {name} growth
      <ArrowIcon
        className="w-7 h-auto ml-1"
        direction="right"
      />
    </Button>
  )
}

GetStartedObjectiveButton.propTypes = {
  platform: PropTypes.object.isRequired,
  setSelectedPlatform: PropTypes.func.isRequired,
}

export default GetStartedObjectiveButton
