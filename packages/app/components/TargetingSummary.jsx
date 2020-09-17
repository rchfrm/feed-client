import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingCampaignReccs from '@/app/TargetingCampaignReccs'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { demoRecs } from '@/app/helpers/targetingHelpers'

const TargetingSummary = () => {
  const {
    initialTargetingState,
    currency,
    selectedCampaignRecc,
    setSelectedCampaignRecc,
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
      <TargetingCampaignReccs
        reccs={demoRecs}
        selectedReccId={selectedReccId}
        setSelectedCampaignRecc={setSelectedCampaignRecc}
        currency={currency}
      />
      {/* BUTTONS */}
      <section className="pt-10 md:pt-8 pb-5">
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
          Custom Settings
        </Button>
        {/* PAUSE BUTTON */}
        <Button
          version="red"
          className="w-full"
        >
          Pause Campaign
        </Button>
      </section>
    </div>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
