import React from 'react'
// import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import CboSummaryList from '@/app/CboSummaryList'
import CboCampaignReccs from '@/app/CboCampaignReccs'

import { CboContext } from '@/app/contexts/CboContext'

import { demoRecs } from '@/app/helpers/cboHelpers'

const CboSummary = () => {
  const {
    cboState,
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
      </div>
    </>
  )
}

CboSummary.propTypes = {
}

export default CboSummary
