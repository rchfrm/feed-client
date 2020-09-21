import React from 'react'
// import PropTypes from 'prop-types'

import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingSummaryButtons from '@/app/TargetingSummaryButtons'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSummary = () => {
  const {
    initialTargetingState,
    currency,
    togglePauseCampaign,
    toggleMobileBudget,
    isDesktopLayout,
    setCurrentView,
  } = React.useContext(TargetingContext)

  return (
    <div>
      {/* SUMMARY LIST */}
      <TargetingSummaryList
        targetingState={initialTargetingState}
        currency={currency}
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
