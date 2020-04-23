import React from 'react'

import { useRouter } from 'next/router'

import { BillingContext } from './contexts/BillingContext'
import { SidePanelContext } from './contexts/SidePanelContext'
// IMPORT ELEMENTS
import Spinner from './elements/Spinner'
// IMPORT COMPONENTS
import AccountPageDetails from './AccountPageDetails'
import AccountPagePayments from './AccountPagePayments'
import PaymentAdd from './PaymentAdd'
import RelinkFacebook from './RelinkFacebook'
import AccountPageSection from './AccountPageSection'
// IMPORT ASSETS
// IMPORT CONSTANTS

const AccountPageContent = ({ user }) => {
  // Get ROUTE info
  const { query } = useRouter()
  const [pageQuery] = Object.keys(query)
  // IMPORT BILLING STATE
  const { billingLoading } = React.useContext(BillingContext)
  // IMPORT SIDE PANEL STATE AND SETTERS
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)

  // Define function to toggle sidepanel
  const setSidePanel = (type) => {
    if (!type) {
      toggleSidePanel(false)
      return
    }
    if (type === 'details') {
      setSidePanelContent(<AccountPageDetails user={user} />)
      toggleSidePanel(true)
      return
    }
    if (type === 'add-payment') {
      setSidePanelContent(<PaymentAdd />)
      toggleSidePanel(true)
      return
    }
    if (type === 'payment') {
      setSidePanelContent(<AccountPagePayments user={user} />)
      toggleSidePanel(true)
    }
  }

  // SET INITIAL SIDE PANEL (if any)
  React.useEffect(() => {
    if (billingLoading) return
    setSidePanel(pageQuery)
  }, [billingLoading, pageQuery])

  // While loading
  if (billingLoading) {
    return <Spinner />
  }

  // The content
  return (
    <>

      <AccountPageSection
        title="Account details"
        type="details"
        user={user}
        buttonText="Edit account details"
        setSidePanel={setSidePanel}
      />

      <AccountPageSection
        title="Payment methods"
        type="payment"
        user={user}
        buttonText="Edit payment methods"
        setSidePanel={setSidePanel}
      />

      <RelinkFacebook />

    </>
  )
}

AccountPageContent.propTypes = {

}

export default AccountPageContent
