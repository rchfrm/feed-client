import React from 'react'

import { BillingContext } from './contexts/BillingContext'
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
import SidePanel from './SidePanel'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColours from '../constants/brandColours'

const AccountPageContent = ({ user, className }) => {
  const [sidePanelOpen, setSitePanelOpen] = React.useState(false)
  const [sidePanelContent, setSidePanelContent] = React.useState(null)

  // IMPORT BILLING STATE
  const { billingLoading } = React.useContext(BillingContext)

  // Define function to toggle sidepanel
  const toggleSidePanel = (type) => {
    console.log('toggleSidePanel', type)
    if (type === 'close') {
      setSidePanelContent(null)
      setSitePanelOpen(false)
      return
    }
    if (type === 'account') {
      setSidePanelContent(<AccountPageDetailsNew user={user} closePanel={() => toggleSidePanel('close')} />)
      setSitePanelOpen(true)
      return
    }
    if (type === 'add-payment') {
      setSidePanelContent(<PaymentAdd user={user} closePanel={() => toggleSidePanel('close')} />)
      setSitePanelOpen(true)
      return
    }
    if (type === 'payment') {
      setSidePanelContent(<AccountPagePayments user={user} closePanel={() => toggleSidePanel('close')} />)
      setSitePanelOpen(true)
      return
    }
    if (type === 'connections') {
      setSidePanelContent(AccountPageIntegrations)
      setSitePanelOpen(true)
    }
  }

  // FOR DEV
  React.useEffect(() => {
    if (billingLoading) return
    toggleSidePanel('payment')
  }, [billingLoading])

  // While loading
  if (billingLoading) {
    return <Spinner width={50} colour={brandColours.green.hex} />
  }
  // The content
  return (
    <div className={`page-container ${className}`}>
      {/* The side panel (if open) */}
      {sidePanelOpen && (
        <SidePanel close={() => toggleSidePanel('close')}>
          {sidePanelContent}
        </SidePanel>
      )}

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
