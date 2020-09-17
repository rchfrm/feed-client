import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

const TargetingSummaryButtons = ({
  campaignPaused,
  togglePauseCampaign,
  toggleMobileBudget,
  setCurrentView,
  isDesktopLayout,
  className,
}) => {
  return (
    <section className={[className].join(' ')}>
      <h3 className="h2">Edit Campaign</h3>
      {/* BUDGET BUTTON (for mobile) */}
      {!isDesktopLayout && (
        <Button
          className="w-full mb-5"
          onClick={toggleMobileBudget}
        >
          Edit Budget
        </Button>
      )}
      {/* CUSTOM SETTINGS BUTTON */}
      <Button
        className="w-full mb-5"
        onClick={() => {
          setCurrentView('customise')
        }}
      >
        Customise Settings
      </Button>
      {/* PAUSE/RESUME BUTTON */}
      <Button
        version="red"
        className="w-full"
        onClick={togglePauseCampaign}
      >
        {campaignPaused ? 'Resume' : 'Pause'} Campaign
      </Button>
    </section>
  )
}

TargetingSummaryButtons.propTypes = {
  campaignPaused: PropTypes.bool.isRequired,
  togglePauseCampaign: PropTypes.func.isRequired,
  toggleMobileBudget: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired,
  isDesktopLayout: PropTypes.bool.isRequired,
  className: PropTypes.string,
}

TargetingSummaryButtons.defaultProps = {
  className: null,
}


export default TargetingSummaryButtons
