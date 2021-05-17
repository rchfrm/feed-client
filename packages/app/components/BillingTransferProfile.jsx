import React from 'react'
import PropTypes from 'prop-types'

import useAsyncEffect from 'use-async-effect'

const BillingTransferProfile = ({
  setSidePanelLoading,
}) => {
  // START SIDEPANEL LOADING
  React.useEffect(() => {
    setSidePanelLoading(true)
  }, [setSidePanelLoading])

  // LOAD PROFILES
  React.useEffect(() => {
    setSidePanelLoading(true)
  }, [setSidePanelLoading])
  // LOAD INVOICES
  useAsyncEffect(async (isMounted) => {
    if (!isMounted()) return
    setSidePanelLoading(false)
  }, [])

  return <></>
}

BillingTransferProfile.propTypes = {
  setSidePanelLoading: PropTypes.func.isRequired,
}

BillingTransferProfile.defaultProps = {

}

export default React.memo(BillingTransferProfile)
