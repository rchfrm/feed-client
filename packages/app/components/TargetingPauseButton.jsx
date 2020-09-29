import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import useSaveTargeting from '@/app/hooks/useSaveTargeting'

const TargetingPauseButton = ({ togglePauseCampaign, isPaused, alignLeft }) => {
  // GOT TOGGLE FUNCTION
  const togglePause = useSaveTargeting({ spendingPaused: isPaused, togglePauseCampaign })
  return (
    <div className={!alignLeft ? 'flex justify-end' : null}>
      <Button
        version="red small"
        onClick={togglePause}
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
}

TargetingPauseButton.defaultProps = {
  alignLeft: false,
}


export default TargetingPauseButton
