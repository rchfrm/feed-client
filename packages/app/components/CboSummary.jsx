import React from 'react'
import PropTypes from 'prop-types'

import Button from '@/elements/Button'

import CboSummaryList from '@/app/CboSummaryList'
import CboCampaignReccs from '@/app/CboCampaignReccs'

import { ArtistContext } from '@/contexts/ArtistContext'

import { demoRecs } from '@/app/helpers/cboHelpers'

const CboSummary = ({ cboState, saveCboState }) => {
  const { artistCurrency } = React.useContext(ArtistContext)
  // SELECTED RECCS
  const [selectedReccId, setSelectedReccId] = React.useState(null)

  return (
    <>
      {/* SUMMARY LIST */}
      <CboSummaryList cboState={cboState} artistCurrency={artistCurrency} />
      {/* RECCS */}
      <CboCampaignReccs
        reccs={demoRecs}
        selectedReccId={selectedReccId}
        setSelectedReccId={setSelectedReccId}
        artistCurrency={artistCurrency}
        saveCboState={saveCboState}
      />
      {/* BUTTONS */}
      <div className="">
        Buttons
      </div>
    </>
  )
}

CboSummary.propTypes = {
  cboState: PropTypes.object.isRequired,
  saveCboState: PropTypes.func.isRequired,
}

export default CboSummary
