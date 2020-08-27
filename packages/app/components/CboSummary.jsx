import React from 'react'
import PropTypes from 'prop-types'

import CboSummaryList from '@/app/CboSummaryList'

const CboSummary = ({ cboState }) => {
  return (
    <>
      <CboSummaryList cboState={cboState} />
    </>
  )
}

CboSummary.propTypes = {
  cboState: PropTypes.object.isRequired,
}

export default CboSummary
