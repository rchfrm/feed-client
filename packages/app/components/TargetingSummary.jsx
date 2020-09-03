import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import Button from '@/elements/Button'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingCampaignReccs from '@/app/TargetingCampaignReccs'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { demoRecs } from '@/app/helpers/targetingHelpers'

const TargetingSummary = () => {
  const {
    targetingState,
    setTargetingState,
    currency,
    selectedCampaignRecc,
    setSelectedCampaignRecc,
    toggleMobileBudget,
  } = React.useContext(TargetingContext)
  // SELECTED RECCS
  const selectedReccId = React.useMemo(() => {
    if (!selectedCampaignRecc) return null
    const { id } = selectedCampaignRecc
    return id
  }, [selectedCampaignRecc])

  return (
    <>
      {/* SUMMARY LIST */}
      <TargetingSummaryList targetingState={targetingState} currency={currency} />
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
          className="w-full mb-5"
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
        <TargetingAgeSlider
          minAge={targetingState.minAge}
          maxAge={targetingState.maxAge}
          onChange={([minAge, maxAge]) => {
            setTargetingState((targetingState) => {
              return produce(targetingState, draftState => {
                draftState.minAge = minAge
                draftState.maxAge = maxAge
              })
            })
          }}
        />
      </div>
    </>
  )
}

TargetingSummary.propTypes = {
}

export default TargetingSummary
