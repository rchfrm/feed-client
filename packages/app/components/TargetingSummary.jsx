import React from 'react'
// import PropTypes from 'prop-types'

import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingSummaryButtons from '@/app/TargetingSummaryButtons'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSummary = () => {
  const {
    initialTargetingState,
    togglePauseCampaign,
    toggleMobileBudget,
    isDesktopLayout,
    setCurrentView,
  } = React.useContext(TargetingContext)

  return (
    <div>
      <h2>Current Settings</h2>
      {/* SUMMARY LIST */}
      <TargetingSummaryList
        targetingState={initialTargetingState}
        setCurrentView={setCurrentView}
      />
      {/* BUTTONS */}
      <TargetingSummaryButtons
        campaignPaused={initialTargetingState.paused}
        togglePauseCampaign={togglePauseCampaign}
        toggleMobileBudget={toggleMobileBudget}
        setCurrentView={setCurrentView}
        isDesktopLayout={isDesktopLayout}
        className="pt-10 md:pt-8 pb-5"
      />
    </div>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
