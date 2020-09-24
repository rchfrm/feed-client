import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingPauseButton = ({ togglePauseCampaign, isPaused, alignLeft }) => {
  return (
    <div className={!alignLeft ? 'flex justify-end' : null}>
      <Button
        version="red small"
        onClick={togglePauseCampaign}
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
