import React from 'react'

import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingBudgetDesktop from '@/app/TargetingBudgetDesktop'

import Button from '@/elements/Button'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSummary = () => {
  const {
    initialTargetingState,
    togglePauseCampaign,
    setCurrentView,
    budgetFormatted,
  } = React.useContext(TargetingContext)

  return (
    <div className="md:grid grid-cols-12 gap-10">
      <div className="col-span-6">
        <h3 className="h2">Settings</h3>
        {/* SUMMARY LIST */}
        <TargetingSummaryList
          targetingState={initialTargetingState}
          setCurrentView={setCurrentView}
          className="mb-6"
        />
      </div>
      <div className="col-span-6">
        <h3 className="h2">Budget</h3>
        <TargetingBudgetDesktop
          saveButtonText={`Set Budget to ${budgetFormatted}`}
          className="mb-10"
          isSummaryVersion
        />
        {/* PAUSE/RESUME BUTTON */}
        <div className="mb-6 flex justify-end">
          <Button
            version="red"
            // className="w-full"
            onClick={togglePauseCampaign}
          >
            {initialTargetingState.paused ? 'Resume' : 'Pause Spending'}
          </Button>
        </div>
      </div>
    </div>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
