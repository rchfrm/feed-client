// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
// IMPORT CONTEXTS

import { NavigationContext } from '../contexts/Navigation'
import { UserContext } from '../contexts/User'
// IMPORT ELEMENTS
import PageHeader from '../PageHeader'
import Spinner from '../elements/Spinner'
// IMPORT COMPONENTS
import AccountPageDetailsNew from '../AccountPageDetailsNew'
import AccountPageIntegrations from '../AccountPageIntegrations'
import AccountPagePaymentsNew from '../AccountPagePaymentsNew'
import PaymentAdd from '../PaymentAdd'
import RelinkFacebook from '../RelinkFacebook'
import AccountPageSection from '../AccountPageSection'
import SidePanel from '../SidePanel'
// IMPORT ASSETS
// IMPORT CONSTANTS
import brandColours from '../../constants/brandColours'
// IMPORT HELPERS
// IMPORT STYLES


function AccountPage() {
// SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  const [sidePanelOpen, setSitePanelOpen] = React.useState(false)
  const [sidePanelContent, setSidePanelContent] = React.useState(null)
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])
  // END SHOW / HIDE NAVIGATION

  // IMPORT USER STATE
  const { user, userLoading } = React.useContext(UserContext)

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
      setSidePanelContent(<AccountPagePaymentsNew user={user} closePanel={() => toggleSidePanel('close')} />)
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
    if (userLoading) return
    toggleSidePanel('add-payment')
  }, [userLoading])

  // While loading
  if (userLoading) {
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

export default AccountPage
