import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import PlatformIcon from '@/icons/PlatformIcon'
import ArrowIcon from '@/icons/ArrowIcon'

const ObjectiveButton = ({
  platform,
  setPlatform,
  isActive,
  className,
}) => {
  const { name, value } = platform

  return (
    <Button
      version="secondary"
      onClick={() => setPlatform(value)}
      trackComponentName="ObjectiveButton"
      className={[
        className,
        isActive ? 'bg-green-bg-light pointer-events-none' : null,
      ].join(' ')}
    >
      <PlatformIcon
        platform={value}
        className="w-5 h-auto mr-2"
        title={value}
      />
      {name} growth
      {! isActive && (
        <ArrowIcon
          className="w-7 h-auto ml-1"
          direction="right"
        />
      )}
    </Button>
  )
}

ObjectiveButton.propTypes = {
  platform: PropTypes.object.isRequired,
  setPlatform: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  className: PropTypes.string,
}

ObjectiveButton.defaultProps = {
  isActive: false,
  className: null,
}

export default ObjectiveButton
