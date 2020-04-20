import React from 'react'
// IMPORT CONTEXTS
import { UserContext } from './contexts/User'
import { BillingContextProvider } from './contexts/BillingContext'
import { SidePanelContextProvider } from './contexts/SidePanelContext'
// IMPORT COMPONENTS
import AccountPageContent from './AccountPageContent'

function AccountPageLoader() {
  // IMPORT USER STATE
  const { user } = React.useContext(UserContext)

  return (
    <BillingContextProvider user={user}>
      <SidePanelContextProvider>
        <AccountPageContent user={user} />
      </SidePanelContextProvider>
    </BillingContextProvider>
  )
}

export default AccountPageLoader
