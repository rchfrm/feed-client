import React from 'react'
import PropTypes from 'prop-types'

import CboSummaryList from '@/app/CboSummaryList'
import CboCampaignRecs from '@/app/CboCampaignRecs'

import { ArtistContext } from '@/contexts/ArtistContext'

const CboSummary = ({ cboState }) => {
  const { artistCurrency } = React.useContext(ArtistContext)
  return (
    <>
      <CboSummaryList cboState={cboState} artistCurrency={artistCurrency} />
      <CboCampaignRecs artistCurrency={artistCurrency} />
    </>
  )
}

CboSummary.propTypes = {
  cboState: PropTypes.object.isRequired,
}

export default CboSummary
