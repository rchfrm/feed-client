import React from 'react'
import PropTypes from 'prop-types'

import TargetingPauseButton from '@/app/TargetingPauseButton'

const TargetingPausedWarning = ({ togglePauseCampaign, className }) => {
  return (
    <div
      className={[
        'p-4 sm:p-5',
        'border-solid border-2 border-red rounded-dialogue',
        className,
      ].join(' ')}
    >
      <h3 className={['h2 text-red font-body'].join(' ')}>Spending Paused</h3>
      <div className="text--block mb-10">
        <p>Spending is currently paused and no ads are running. You can still edit your settings.</p>
      </div>
      <TargetingPauseButton
        togglePauseCampaign={togglePauseCampaign}
        isPaused
        alignLeft
      />
    </div>
  )
}

TargetingPausedWarning.propTypes = {
  togglePauseCampaign: PropTypes.func.isRequired,
  className: PropTypes.string,
}

TargetingPausedWarning.defaultProps = {
  className: null,
}


export default TargetingPausedWarning
