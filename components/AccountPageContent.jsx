import React from 'react'

import { BillingContext } from './contexts/BillingContext'
import { SidePanelContext } from './contexts/SidePanelContext'
// IMPORT ELEMENTS
import PageHeader from './PageHeader'
import Spinner from './elements/Spinner'
// IMPORT COMPONENTS
import AccountPageDetailsNew from './AccountPageDetailsNew'
import AccountPageIntegrations from './AccountPageIntegrations'
import AccountPagePayments from './AccountPagePayments'
import PaymentAdd from './PaymentAdd'
import RelinkFacebook from './RelinkFacebook'
import AccountPageSection from './AccountPageSection'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColours from '../constants/brandColours'

const AccountPageContent = ({ user, className }) => {
  // IMPORT BILLING STATE
  const { billingLoading } = React.useContext(BillingContext)
  // IMPORT SIDE PANEL STATE AND SETTERS
  const { setSidePanelContent, toggleSidePanel } = React.useContext(SidePanelContext)

  // Define function to toggle sidepanel
  const setSidePanel = (type) => {
    if (type === 'close') {
      setSidePanelContent(null)
      toggleSidePanel(false)
      return
    }
    if (type === 'account') {
      setSidePanelContent(<AccountPageDetailsNew user={user} closePanel={() => toggleSidePanel(false)} />)
      toggleSidePanel(true)
      return
    }
    if (type === 'add-payment') {
      setSidePanelContent(<PaymentAdd closePanel={() => toggleSidePanel(false)} />)
      toggleSidePanel(true)
      return
    }
    if (type === 'payment') {
      setSidePanelContent(<AccountPagePayments user={user} closePanel={() => toggleSidePanel(false)} />)
      toggleSidePanel(true)
      return
    }
    if (type === 'connections') {
      setSidePanelContent(AccountPageIntegrations)
      toggleSidePanel(true)
    }
  }

  // FOR DEV
  React.useEffect(() => {
    if (billingLoading) return
    setSidePanel('account')
  }, [billingLoading])

  // While loading
  if (billingLoading) {
    return <Spinner width={50} colour={brandColours.green.hex} />
  }
  // The content
  return (
    <div className={`page-container ${className}`}>

      <PageHeader heading="Account" />

      <AccountPageSection
        title="Account details"
        type="account"
        user={user}
        buttonText="Edit account details"
        toggleSidePanel={toggleSidePanel}
      />

      <AccountPageSection
        title="Payment methods"
        type="payment"
        user={user}
        buttonText="Edit payment methods"
        toggleSidePanel={toggleSidePanel}
      />

      <AccountPageSection
        title="Connections"
        type="connections"
        user={user}
        buttonText="Edit connections"
        toggleSidePanel={toggleSidePanel}
      />

      <RelinkFacebook />

    </div>
  )
}

AccountPageContent.propTypes = {

}

export default AccountPageContent
