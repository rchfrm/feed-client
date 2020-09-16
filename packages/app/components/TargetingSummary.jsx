import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingCampaignReccs from '@/app/TargetingCampaignReccs'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { demoRecs } from '@/app/helpers/targetingHelpers'

const TargetingSummary = () => {
  const {
    targetingState,
    currency,
    selectedCampaignRecc,
    setSelectedCampaignRecc,
    toggleMobileBudget,
    isDesktopLayout,
  } = React.useContext(TargetingContext)
  // SELECTED RECCS
  const selectedReccId = React.useMemo(() => {
    if (!selectedCampaignRecc) return null
    const { id } = selectedCampaignRecc
    return id
  }, [selectedCampaignRecc])

  const [initialTargetingState] = React.useState(targetingState)

  return (
    <div>
      {/* SUMMARY LIST */}
      <TargetingSummaryList targetingState={initialTargetingState} currency={currency} />
      {/* RECCS */}
      <TargetingCampaignReccs
        reccs={demoRecs}
        selectedReccId={selectedReccId}
        setSelectedCampaignRecc={setSelectedCampaignRecc}
        currency={currency}
      />
      {/* BUTTONS */}
      <div className="pt-10 pb-5">
        {/* BUDGET BUTTON */}
        <Button
          className="w-full mb-5 md:hidden"
          onClick={toggleMobileBudget}
        >
          Edit Budget
        </Button>
        {/* PAUSE BUTTON */}
        <Button
          version="red"
          className="w-full"
        >
          Pause Campaign
        </Button>
      </div>
    </div>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
