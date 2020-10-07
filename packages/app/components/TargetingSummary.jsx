import React from 'react'

import TargetingNoBudget from '@/app/TargetingNoBudget'
import TargetingPausedWarning from '@/app/TargetingPausedWarning'
import TargetingSuccessMessage from '@/app/TargetingSuccessMessage'
import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingBudgetBox from '@/app/TargetingBudgetBox'
import TargetingSummaryButtons from '@/app/TargetingSummaryButtons'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSummary = () => {
  const {
    targetingState,
    initialTargetingState,
    saveTargetingSettings,
    togglePauseCampaign,
    setCurrentView,
    settingsSaved,
    disableSaving,
  } = React.useContext(TargetingContext)

  // HANDLE NO BUDGET SET
  const { budget: initialBudget } = initialTargetingState
  if (!initialBudget) {
    return (
      <TargetingNoBudget setCurrentView={setCurrentView} />
    )
  }

  return (
    <div className="md:grid grid-cols-12 gap-10 grid-flow-col-dense">
      {/* SUCCESS MESSAGE */}
      {settingsSaved && (
        <TargetingSuccessMessage
          className="col-span-12 col-start-1 mb-8 md:mb-0"
          togglePauseCampaign={togglePauseCampaign}
        />
      )}
      {/* PAUSED WARNING */}
      {!initialTargetingState.status && (
        <TargetingPausedWarning
          className="col-span-12 col-start-1 mb-8 md:mb-0"
          togglePauseCampaign={togglePauseCampaign}
        />
      )}
      {/* BUDGET */}
      <div className="col-span-6 col-start-7">
        <h3 className="h2">Budget</h3>
        <TargetingBudgetBox
          className="mb-8"
          isSummaryVersion
        />
        {/* SAVE BUDGET & PAUSE/RESUME BUTTON */}
        <div className="mb-10 md:mb-0">
          <TargetingSummaryButtons
            targetingState={targetingState}
            initialTargetingState={initialTargetingState}
            saveTargetingSettings={saveTargetingSettings}
            togglePauseCampaign={togglePauseCampaign}
            disableSaving={disableSaving}
          />
        </div>
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
      </div>
    </div>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
