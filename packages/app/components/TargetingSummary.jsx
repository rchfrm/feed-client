import React from 'react'

import TargetingSummaryList from '@/app/TargetingSummaryList'

import Button from '@/elements/Button'

import { TargetingContext } from '@/app/contexts/TargetingContext'

const TargetingSummary = () => {
  const {
    initialTargetingState,
    togglePauseCampaign,
    setCurrentView,
  } = React.useContext(TargetingContext)

  return (
    <div>
      <h2>Current Settings</h2>
      {/* SUMMARY LIST */}
      <TargetingSummaryList
        targetingState={initialTargetingState}
        setCurrentView={setCurrentView}
        className="mb-8"
      />
      {/* PAUSE/RESUME BUTTON */}
      <Button
        version="red"
        className="w-full"
        onClick={togglePauseCampaign}
      >
        {initialTargetingState.paused ? 'Resume' : 'Pause'} Campaign
      </Button>
    </div>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
