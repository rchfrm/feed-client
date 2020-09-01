import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import Button from '@/elements/Button'

import TargetingAgeSlider from '@/app/TargetingAgeSlider'
import TargetingBudgetSlider from '@/app/TargetingBudgetSlider'
import TargetingSummaryList from '@/app/TargetingSummaryList'
import TargetingCampaignReccs from '@/app/TargetingCampaignReccs'

import { TargetingContext } from '@/app/contexts/TargetingContext'

import { demoRecs } from '@/app/helpers/cboHelpers'

const TargetingSummary = () => {
  const {
    cboState,
    setCboState,
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
      <TargetingSummaryList cboState={cboState} currency={currency} />
      {/* RECCS */}
      <TargetingCampaignReccs
        reccs={demoRecs}
        selectedReccId={selectedReccId}
        setSelectedCampaignRecc={setSelectedCampaignRecc}
        currency={currency}
      />
      {/* BUTTONS */}
      <div className="pt-10 pb-5">
        {/* CUSTOMISE BUTTON */}
        <Button
          className="w-full mb-5"
        >
          Customise Campaign
        </Button>
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
          minAge={cboState.minAge}
          maxAge={cboState.maxAge}
          onChange={([minAge, maxAge]) => {
            setCboState((cboState) => {
              return produce(cboState, draftState => {
                draftState.minAge = minAge
                draftState.maxAge = maxAge
              })
            })
          }}
        />
        {/* BUDGET SLIDER */}
        <TargetingBudgetSlider
          budget={cboState.budget}
          minBudget={cboState.minBudget}
          onChange={(budget) => {
            setCboState((cboState) => {
              return produce(cboState, draftState => {
                draftState.budget = budget
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
