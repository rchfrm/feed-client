// IMPORT PACKAGES
import React from 'react'
// IMPORT COMPONENTS
import Spinner from '../elements/Spinner'
// IMPORT CONTEXTS

import { NavigationContext } from '../contexts/Navigation'
import { UserContext } from '../contexts/User'
import { BillingContextProvider } from '../contexts/BillingContext'
import { SidePanelContextProvider } from '../contexts/SidePanelContext'

// IMPORT STYLES
import AccountPageContent from '../AccountPageContent'


function AccountPage() {
  // IMPORT USER STATE
  const { user, userLoading } = React.useContext(UserContext)
  // SHOW / HIDE NAVIGATION
  const { navState, navDispatch } = React.useContext(NavigationContext)
  const className = navState.visible ? 'hidden' : ''
  React.useEffect(() => {
    navDispatch({ type: 'hide' })
  }, [navDispatch])

  // While loading
  if (userLoading) {
    return <Spinner width={50} />
  }

  return (
    <BillingContextProvider user={user}>
      <SidePanelContextProvider>
        <AccountPageContent
          user={user}
          className={className}
        />
      </SidePanelContextProvider>
    </BillingContextProvider>
  )
}

export default AccountPage
