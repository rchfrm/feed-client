import React from 'react'
// IMPORT CONTEXTS
import { UserContext } from '@/contexts/User'
import { BillingContextProvider } from '@/contexts/BillingContext'
// IMPORT COMPONENTS
import AccountPageContent from '@/AccountPageContent'

function AccountPageLoader() {
  // IMPORT USER STATE
  const { user } = React.useContext(UserContext)

  return (
    <BillingContextProvider user={user}>
      <AccountPageContent user={user} />
    </BillingContextProvider>
  )
}

export default AccountPageLoader
