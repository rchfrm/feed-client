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
  console.log('user', user)
  // END IMPORT USER STATE

  // Define function to toggle sidepanel
  const toggleSidePanel = (type) => {
    console.log('togglesidepanel', type)
    if (type === 'close') {
      setSitePanelOpen(false)
      setSidePanelContent(null)
      return
    }
    if (type === 'account') {
      setSidePanelContent(AccountPageDetailsNew)
    } else if (type === 'payment') {
      setSidePanelContent(<p>Payment</p>)
    } else {
      setSidePanelContent(<p>Integration</p>)
    }
    setSitePanelOpen(true)
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

      {/* <AccountPageDetails />

      <RelinkFacebook />

      <AccountPagePayments />

      <AccountPageIntegrations /> */}

    </div>
  )
}

export default AccountPage
