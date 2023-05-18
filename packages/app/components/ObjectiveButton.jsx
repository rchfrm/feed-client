import React from 'react'
import PropTypes from 'prop-types'
import Button from '@/elements/Button'
import PlatformIcon from '@/icons/PlatformIcon'
import ArrowIcon from '@/icons/ArrowIcon'

const ObjectiveButton = ({
  optimization,
  setOptimization,
  isActive,
  isLoading,
  isDisabled,
  className,
}) => {
  const {
    name,
    platform,
  } = optimization

  return (
    <div
      className={[
        '[&>button]:border-green',
        className,
      ].join(' ')}
    >
      <Button
        version={isActive ? 'tertiary' : 'secondary'}
        onClick={() => setOptimization(optimization)}
        trackComponentName="ObjectiveButton"
        className={[
          isActive ? 'pointer-events-none' : null,
          'w-full',
        ].join(' ')}
        isLoading={isLoading}
        isDisabled={isDisabled}
      >
        <PlatformIcon
          platform={platform}
          className="w-5 h-auto mr-2"
          title={name}
        />
        {name}
        {! isActive && (
        <ArrowIcon
          className="w-7 h-auto ml-1"
          direction="right"
        />
        )}
      </Button>
    </div>
  )
}

ObjectiveButton.propTypes = {
  optimization: PropTypes.shape({
    name: PropTypes.string.isRequired,
    objective: PropTypes.string.isRequired,
    platform: PropTypes.string.isRequired,
  }).isRequired,
  setOptimization: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}

ObjectiveButton.defaultProps = {
  isActive: false,
  isLoading: false,
  isDisabled: false,
  className: null,
}

export default ObjectiveButton
