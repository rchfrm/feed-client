import React from 'react'
// import PropTypes from 'prop-types'

import produce from 'immer'

import Button from '@/elements/Button'

import CboAgeSlider from '@/app/CboAgeSlider'
import CboBudgetSlider from '@/app/CboBudgetSlider'
import CboSummaryList from '@/app/CboSummaryList'
import CboCampaignReccs from '@/app/CboCampaignReccs'

import { CboContext } from '@/app/contexts/CboContext'

import { demoRecs } from '@/app/helpers/cboHelpers'

const CboSummary = () => {
  const {
    cboState,
    setCboState,
    currency,
    selectedCampaignRecc,
    setSelectedCampaignRecc,
    toggleMobileBudget,
  } = React.useContext(CboContext)
  // SELECTED RECCS
  const selectedReccId = React.useMemo(() => {
    if (!selectedCampaignRecc) return null
    const { id } = selectedCampaignRecc
    return id
  }, [selectedCampaignRecc])

  return (
    <>
      {/* SUMMARY LIST */}
      <CboSummaryList cboState={cboState} currency={currency} />
      {/* RECCS */}
      <CboCampaignReccs
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
        <CboAgeSlider
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
        <CboBudgetSlider
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

CboSummary.propTypes = {
}

export default CboSummary
