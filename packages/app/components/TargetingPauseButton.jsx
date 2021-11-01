import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingPauseButton = ({
  togglePauseCampaign,
  isPaused,
  alignLeft,
  className,
  buttonClass,
}) => {
  const { targetingState } = React.useContext(TargetingContext)
  // GOT TOGGLE FUNCTION
  const togglePause = useSaveTargeting({ spendingPaused: isPaused, togglePauseCampaign, targetingState })
  return (
    <div
      className={[
        !alignLeft ? 'flex justify-end' : null,
        className,
      ].join(' ')}
    >
      <Button
        version="red small"
        onClick={togglePause}
        className={buttonClass}
        trackComponentName="TargetingPauseButton"
      >
        {isPaused ? 'Resume Spending' : 'Pause Spending'}
      </Button>
    </div>
  )
}

TargetingPauseButton.propTypes = {
  togglePauseCampaign: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  alignLeft: PropTypes.bool,
  className: PropTypes.string,
  buttonClass: PropTypes.string,
}

TargetingPauseButton.defaultProps = {
  alignLeft: false,
  className: null,
  buttonClass: null,
}


export default TargetingPauseButton
