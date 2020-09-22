import React from 'react'

import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import TargetingPauseButton from '@/app/TargetingPauseButton'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSummary = () => {
  const {
    isDesktopLayout,
    initialTargetingState,
    togglePauseCampaign,
    setCurrentView,
    budgetFormatted,
  } = React.useContext(TargetingContext)

  return (
    <div className="md:grid grid-cols-12 gap-10 grid-flow-col-dense">
      {/* BUDGET */}
      <div className="col-span-6 col-start-7">
        <h3 className="h2">Budget</h3>
        <TargetingBudgetBox
          saveButtonText={`Set Budget to ${budgetFormatted}`}
          className="mb-10"
          isSummaryVersion
        />
        {/* PAUSE/RESUME BUTTON (desktop) */}
        {isDesktopLayout && (
          <div className="mb-6 flex justify-end">
            <TargetingPauseButton
              togglePauseCampaign={togglePauseCampaign}
              isPaused={initialTargetingState.paused}
            />
          </div>
        )}
      </div>
      {/* SETTINGS */}
      <div className="col-span-6 col-start-1">
        <h3 className="h2">Settings</h3>
        {/* SUMMARY LIST */}
        <TargetingSummaryList
          targetingState={initialTargetingState}
          setCurrentView={setCurrentView}
          className="mb-6"
        />
        {/* PAUSE/RESUME BUTTON (mobile) */}
        {!isDesktopLayout && (
          <div className="mb-6 flex justify-end">
            <TargetingPauseButton
              togglePauseCampaign={togglePauseCampaign}
              isPaused={initialTargetingState.paused}
            />
          </div>
        )}
      </div>
    </div>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
