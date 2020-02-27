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
import AccountPagePayments from '../AccountPagePayments'
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
  // END IMPORT USER STATE

  // Define function to toggle sidepanel
  const toggleSidePanel = (type) => {
    if (type === 'close') {
      setSitePanelOpen(false)
      setSidePanelContent(null)
      return
    }
    if (type === 'account') {
      setSidePanelContent(AccountPageDetailsNew)
      setSitePanelOpen(true)
      return
    }
    if (type === 'payment') {
      setSidePanelContent(<p>Payment</p>)
      setSitePanelOpen(true)
      return
    }
    if (type === 'connections') {
      setSidePanelContent(AccountPageIntegrations)
      setSitePanelOpen(true)
    }
  }

  // // FOR DEV
  // React.useEffect(() => {
  //   toggleSidePanel('account')
  // }, [])

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
        onClick={() => toggleSidePanel('account')}
      />

      <AccountPageSection
        title="Payment methods"
        type="payment"
        user={user}
        buttonText="Edit payment methods"
        onClick={() => toggleSidePanel('payment')}
      />

      <AccountPageSection
        title="Connections"
        type="connections"
        user={user}
        buttonText="Edit connections"
        onClick={() => toggleSidePanel('connections')}
      />

      <RelinkFacebook />

    </div>
  )
}

export default AccountPage
