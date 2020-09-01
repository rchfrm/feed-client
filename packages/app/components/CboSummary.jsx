import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import CboSummaryList from '@/app/CboSummaryList'
import CboCampaignReccs from '@/app/CboCampaignReccs'

import { CboContext } from '@/app/contexts/CboContext'

import { demoRecs } from '@/app/helpers/cboHelpers'

const CboSummary = ({
  cboState,
  toggleMobileBudget,
}) => {
  const {
    currency,
    saveCampaignSettings,
    setSelectedCampaignType,
  } = React.useContext(CboContext)
  // SELECTED RECCS
  const [selectedReccId, setSelectedReccId] = React.useState(null)

  return (
    <>
      {/* SUMMARY LIST */}
      <CboSummaryList cboState={cboState} currency={currency} />
      {/* RECCS */}
      <CboCampaignReccs
        reccs={demoRecs}
        selectedReccId={selectedReccId}
        setSelectedReccId={setSelectedReccId}
        setSelectedCampaignType={setSelectedCampaignType}
        currency={currency}
        saveCampaignSettings={saveCampaignSettings}
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
  cboState: PropTypes.object.isRequired,
  toggleMobileBudget: PropTypes.func.isRequired,
}

export default CboSummary
