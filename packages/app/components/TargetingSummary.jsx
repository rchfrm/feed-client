import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingCampaignReccs from '@/app/TargetingCampaignReccs'
import TargetingSummaryButtons from '@/app/TargetingSummaryButtons'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { demoRecs } from '@/app/helpers/targetingHelpers'

const TargetingSummary = () => {
  const {
    initialTargetingState,
    currency,
    selectedCampaignRecc,
    setSelectedCampaignRecc,
    togglePauseCampaign,
    toggleMobileBudget,
    isDesktopLayout,
    setCurrentView,
  } = React.useContext(TargetingContext)
  // SELECTED RECCS
  const selectedReccId = React.useMemo(() => {
    if (!selectedCampaignRecc) return null
    const { id } = selectedCampaignRecc
    return id
  }, [selectedCampaignRecc])

  return (
    <div>
      {/* SUMMARY LIST */}
      <TargetingSummaryList
        targetingState={initialTargetingState}
        currency={currency}
      />
      {/* RECCS */}
      {/* <TargetingCampaignReccs
        reccs={demoRecs}
        selectedReccId={selectedReccId}
        setSelectedCampaignRecc={setSelectedCampaignRecc}
        currency={currency}
      /> */}
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
