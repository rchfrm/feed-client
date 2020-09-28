import React from 'react'
import PropTypes from 'prop-types'

import TargetingPauseButton from '@/app/TargetingPauseButton'
import MarkdownText from '@/elements/MarkdownText'

import copy from '@/app/copy/targetingPageCopy'

const TargetingPausedWarning = ({ togglePauseCampaign, hideButton, className }) => {
  return (
    <div
      className={[
        'p-4 sm:p-5',
        'border-solid border-2 border-red rounded-dialogue',
        className,
      ].join(' ')}
    >
      <h3 className={['h2 text-red font-body'].join(' ')}>Spending Paused</h3>
      <MarkdownText
        className={[
          !hideButton ? 'mb-10' : 'mb-0',
        ].join(' ')}
        markdown={copy.pausedWarning}
      />
      {!hideButton && (
        <TargetingPauseButton
          togglePauseCampaign={togglePauseCampaign}
          isPaused
          alignLeft
        />
      )}
    </div>
  )
}

TargetingPausedWarning.propTypes = {
  togglePauseCampaign: PropTypes.func,
  hideButton: PropTypes.bool,
  className: PropTypes.string,
}

TargetingPausedWarning.defaultProps = {
  togglePauseCampaign: () => {},
  hideButton: false,
  className: null,
}


export default TargetingPausedWarning
