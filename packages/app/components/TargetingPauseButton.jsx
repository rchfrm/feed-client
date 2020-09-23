import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingPauseButton = ({ togglePauseCampaign, isPaused }) => {
  return (
    <div className="flex justify-end">
      <Button
        version="red small"
        onClick={togglePauseCampaign}
      >
        {isPaused ? 'Resume' : 'Pause Spending'}
      </Button>
    </div>
  )
}

TargetingPauseButton.propTypes = {
  togglePauseCampaign: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
}

export default TargetingPauseButton
