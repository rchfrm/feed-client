import React from 'react'
import PropTypes from 'prop-types'

import CboSummaryList from '@/app/CboSummaryList'
import CboCampaignReccs from '@/app/CboCampaignReccs'

import { ArtistContext } from '@/contexts/ArtistContext'

import { demoRecs } from '@/app/helpers/cboHelpers'

const CboSummary = ({ cboState }) => {
  const { artistCurrency } = React.useContext(ArtistContext)
  // SELECTED RECCS
  const [selectedReccId, setSelectedReccId] = React.useState(null)
  return (
    <>
      <CboSummaryList cboState={cboState} artistCurrency={artistCurrency} />
      <CboCampaignReccs
        reccs={demoRecs}
        selectedReccId={selectedReccId}
        setSelectedReccId={setSelectedReccId}
        artistCurrency={artistCurrency}
      />
    </>
  )
}

CboSummary.propTypes = {
  cboState: PropTypes.object.isRequired,
}

export default CboSummary
