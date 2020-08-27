import React from 'react'
import PropTypes from 'prop-types'

import CboSummaryList from '@/app/CboSummaryList'
import CboCampaignRecs from '@/app/CboCampaignRecs'

const CboSummary = ({ cboState }) => {
  return (
    <>
      <CboSummaryList cboState={cboState} />
      <CboCampaignRecs />
    </>
  )
}

CboSummary.propTypes = {
  cboState: PropTypes.object.isRequired,
}

export default CboSummary
